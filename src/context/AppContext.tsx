import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithCustomToken,
  signInAnonymously,
  onAuthStateChanged,
  type User as FirebaseUser,
  type Auth,
} from "firebase/auth";
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
  where,
  Firestore,
} from "firebase/firestore";

// Importações Mockadas
import {
  MOCK_USERS_LIST,
  MOCK_UNIVERSITY,
  MOCK_COURSES,
} from "@/services/mocks/identity";
import { MOCK_HUDS } from "@/services/mocks/geo";
// Tipos
import type { User, University, Course, HUD, UserRole } from "@/types";

declare const __app_id: string;
declare const __firebase_config: string;
declare const __initial_auth_token: string;

interface AppContextType {
  currentUser: User | null;
  currentHubId: string | null;
  locationStatus: "PRESENCIAL" | "FORA_DO_CAMPUS";
  isAuthReady: boolean;
  universityData: University;
  courseData: Course[];
  hudsList: HUD[];
  filterLevel: "GLOBAL" | "NATIONAL" | "INSTITUTION";
  setFilterLevel: (level: "GLOBAL" | "NATIONAL" | "INSTITUTION") => void;
  // Nova função para mudar o contexto da Universidade
  setAppContextUniversity: (university: University) => void;
  signInMockUser: (role: UserRole) => Promise<void>;
  db: Firestore | null;
  auth: Auth | null;
}

const defaultContext: AppContextType = {
  currentUser: null,
  currentHubId: "hud-1",
  locationStatus: "FORA_DO_CAMPUS",
  isAuthReady: false,
  universityData: MOCK_UNIVERSITY,
  courseData: MOCK_COURSES,
  hudsList: MOCK_HUDS,
  filterLevel: "INSTITUTION",
  setFilterLevel: () => {},
  setAppContextUniversity: () => {}, // Default vazio
  signInMockUser: async () => {},
  db: null,
  auth: null,
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
  const [authInstance, setAuthInstance] = useState<Auth | null>(null);
  const [dbInstance, setDbInstance] = useState<Firestore | null>(null);

  // Dados globais e contexto de visualização
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [currentHubId, setCurrentHubId] = useState<string | null>(
    defaultContext.currentHubId
  );
  const [locationStatus, setLocationStatus] = useState<
    "PRESENCIAL" | "FORA_DO_CAMPUS"
  >("FORA_DO_CAMPUS");
  const [filterLevel, setFilterLevel] = useState<
    "GLOBAL" | "NATIONAL" | "INSTITUTION"
  >("INSTITUTION");

  // Estado da Universidade Ativa (pode ser diferente da universidade do usuário logado)
  const [activeUniversity, setActiveUniversity] =
    useState<University>(MOCK_UNIVERSITY);
  // Lista de HUDs da Universidade Ativa
  const [activeHuds, setActiveHuds] = useState<HUD[]>(MOCK_HUDS);

  // --- FUNÇÃO CENTRAL PARA MUDANÇA DE CONTEXTO ---
  const setAppContextUniversity = (university: University) => {
    // 1. Mudar a Universidade Ativa e a lista de HUDs
    setActiveUniversity(university);
    // Simulação: buscar HUDs correspondentes a essa universidade (usando mock por agora)
    const newHuds = MOCK_HUDS.filter((h) => h.universityId === university.id);
    setActiveHuds(newHuds.length > 0 ? newHuds : MOCK_HUDS); // Garante que não fique vazio

    // 2. Determinar a nova Role do Usuário Ativo
    if (currentUser) {
      let newRole: UserRole;

      if (currentUser.universityId === university.id) {
        // Se a universidade clicada é a do usuário: Modo Estudante
        newRole = "STUDENT";
        setLocationStatus("PRESENCIAL");
      } else {
        // Se a universidade clicada é outra: Modo Aventureiro
        newRole = "ADVENTURER";
        setLocationStatus("FORA_DO_CAMPUS");
      }

      // Atualiza o currentUser com a nova role no contexto
      setCurrentUser((prev) => (prev ? { ...prev, role: newRole } : null));
    } else {
      // Se não há usuário logado, garante o modo Aventureiro na universidade.
      setLocationStatus("FORA_DO_CAMPUS");
      // Neste cenário, o usuário é anônimo/aventureiro, mas o app está focado na 'activeUniversity'
    }

    // 3. Voltar para a visualização Institucional (2D Map)
    setFilterLevel("INSTITUTION");
  };
  // ---------------------------------------------

  // 1. Inicialização do Firebase e Autenticação
  useEffect(() => {
    try {
      const firebaseConfig = JSON.parse(
        typeof __firebase_config !== "undefined" ? __firebase_config : "{}"
      );
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore(app);

      setFirebaseApp(app);
      setAuthInstance(auth);
      setDbInstance(db);

      const handleAuth = async (user: FirebaseUser | null) => {
        if (user) {
          // Em um app real, buscaríamos os dados do usuário no Firestore/RealtimeDB
          const mockUser =
            MOCK_USERS_LIST.find((u) => u.id === user.uid) ||
            MOCK_USERS_LIST[0];
          // NOTA: A role inicial é a do mock, que pode ser sobrescrita por setAppContextUniversity
          setCurrentUser({ ...mockUser, id: user.uid });

          // Define a universidade inicial como a do usuário logado
          const initialUni = MOCK_UNIVERSITY;
          setActiveUniversity(initialUni);
          setActiveHuds(
            MOCK_HUDS.filter((h) => h.universityId === initialUni.id)
          );
        } else {
          setCurrentUser(null);
          // Permanece na universidade mockada como padrão para usuários anônimos
        }
        setIsAuthReady(true);
      };

      const unsubscribeAuth = onAuthStateChanged(auth, handleAuth);

      const attemptSignIn = async () => {
        if (
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      };

      attemptSignIn();

      return () => unsubscribeAuth();
    } catch (e) {
      console.error("Erro na inicialização ou autenticação do Firebase:", e);
      setIsAuthReady(true);
    }
  }, []);

  // 2. Mock de login para o AdventurerLanding
  const signInMockUser = async (role: UserRole) => {
    if (authInstance) {
      // Cria um usuário temporário no mock list se for estudante
      const mockUser =
        role === "STUDENT" ? MOCK_USERS_LIST[0] : MOCK_USERS_LIST[1];
      setCurrentUser({ ...mockUser, role });
      setLocationStatus(role === "STUDENT" ? "PRESENCIAL" : "FORA_DO_CAMPUS");
    }
  };

  // 3. Simulação de mudança de HUD baseado na localização (opcional)
  useEffect(() => {
    if (locationStatus === "PRESENCIAL" && activeHuds.length > 0) {
      setCurrentHubId(activeHuds[0].id); // Entrou no primeiro HUD
    } else {
      setCurrentHubId(null); // Saiu de qualquer HUD específico
    }
  }, [locationStatus, activeHuds]);

  // 4. Exposição do Contexto
  const contextValue = useMemo(
    () => ({
      currentUser,
      currentHubId,
      locationStatus,
      isAuthReady,
      universityData: activeUniversity, // Usa a universidade ativa
      courseData: defaultContext.courseData,
      hudsList: activeHuds, // Usa a lista de HUDs ativa
      filterLevel,
      setFilterLevel,
      setAppContextUniversity, // Nova função
      signInMockUser,
      db: dbInstance,
      auth: authInstance,
    }),
    [
      currentUser,
      currentHubId,
      locationStatus,
      isAuthReady,
      filterLevel,
      dbInstance,
      authInstance,
      activeUniversity, // Adicionado
      activeHuds, // Adicionado
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
