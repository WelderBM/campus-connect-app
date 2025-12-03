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

// Importações Mockadas remanescentes (mantidas apenas para tipos ou dados de usuário)
import { MOCK_USERS_LIST, MOCK_COURSES } from "@/services/mocks/identity";
// Removendo MOCK_UNIVERSITY e MOCK_HUDS.
// Tipos
import type { User, University, Course, HUD, UserRole } from "@/types";

declare const __app_id: string;
declare const __firebase_config: string;
declare const __initial_auth_token: string;

// Definição de uma Universidade de Fallback VAZIA para Tipagem
const EMPTY_UNIVERSITY: University = {
  id: "empty",
  name: "Carregando Universidades...",
  shortName: "CARREGANDO",
  countryFlag: <span>🌍</span>,
  continentColor: "#AAAAAA",
  state: "",
  centerCoordinates: [0, 0],
  proximityRadiusKm: 0,
};

interface AppContextType {
  currentUser: User | null;
  currentHubId: string | null;
  locationStatus: "PRESENCIAL" | "FORA_DO_CAMPUS";
  isAuthReady: boolean;
  universityData: University;
  courseData: Course[];
  hudsList: HUD[];
  allUniversitiesList: University[];
  filterLevel: "GLOBAL" | "NATIONAL" | "INSTITUTION";
  setFilterLevel: (level: "GLOBAL" | "NATIONAL" | "INSTITUTION") => void;
  setAppContextUniversity: (university: University) => void;
  signInMockUser: (role: UserRole) => Promise<void>;
  db: Firestore | null;
  auth: Auth | null;
}

const defaultContext: AppContextType = {
  currentUser: null,
  currentHubId: null, // Mudado para null
  locationStatus: "FORA_DO_CAMPUS",
  isAuthReady: false,
  universityData: EMPTY_UNIVERSITY, // Usando fallback vazio
  courseData: MOCK_COURSES,
  hudsList: [], // Mudado para vazio
  allUniversitiesList: [],
  filterLevel: "GLOBAL", // Começamos sempre em GLOBAL agora
  setFilterLevel: () => {},
  setAppContextUniversity: () => {},
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
  >("GLOBAL"); // Inicia em GLOBAL

  // Estados de dados que virão do Firebase
  const [allUniversities, setAllUniversities] = useState<University[]>([]);
  const [allHuds, setAllHuds] = useState<HUD[]>([]);

  // Estado da Universidade Ativa (fallback vazio)
  const [activeUniversity, setActiveUniversity] =
    useState<University>(EMPTY_UNIVERSITY);
  // Lista de HUDs da Universidade Ativa
  const [activeHuds, setActiveHuds] = useState<HUD[]>([]);

  // --- FUNÇÃO CENTRAL PARA MUDANÇA DE CONTEXTO ---
  const setAppContextUniversity = (university: University) => {
    // 1. Mudar a Universidade Ativa e a lista de HUDs
    setActiveUniversity(university);
    // Filtra os HUDs da lista completa de HUDs carregada do Firebase
    const newHuds = allHuds.filter((h) => h.universityId === university.id);
    setActiveHuds(newHuds);

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
          setCurrentUser({ ...mockUser, id: user.uid });
        } else {
          setCurrentUser(null);
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

  // 2. Carregar Universidades e HUDs do Firebase (em tempo real)
  useEffect(() => {
    if (!dbInstance) return;

    const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

    // Listener para todas as Universidades
    const uniCollectionRef = collection(
      dbInstance,
      `artifacts/${appId}/public/data/universities`
    );
    const unsubscribeUni = onSnapshot(
      uniCollectionRef,
      (snapshot) => {
        const universitiesData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as University)
        );
        setAllUniversities(universitiesData);

        // Define a universidade ativa inicial se for a primeira carga ou se o estado for o EMPTY
        if (
          universitiesData.length > 0 &&
          activeUniversity.id === EMPTY_UNIVERSITY.id
        ) {
          // Usa a primeira universidade carregada como padrão para usuários anônimos/deslogados
          setActiveUniversity(universitiesData[0]);
          // Como a universidade ativa mudou, o próximo useEffect para HUDs será disparado
        }
      },
      (e) => {
        console.error("Erro ao carregar Universidades:", e);
        // Se falhar, permanece no estado de carregamento/vazio
      }
    );

    // Listener para todos os HUDs
    const hudsCollectionRef = collection(
      dbInstance,
      `artifacts/${appId}/public/data/huds`
    );
    const unsubscribeHuds = onSnapshot(
      hudsCollectionRef,
      (snapshot) => {
        const hudsData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as HUD)
        );
        setAllHuds(hudsData);

        // A lista de HUDs ativos (activeHuds) é atualizada no próximo useEffect
        // que depende de allHuds e activeUniversity
      },
      (e) => {
        console.error("Erro ao carregar HUDs:", e);
      }
    );

    return () => {
      unsubscribeUni();
      unsubscribeHuds();
    };
  }, [dbInstance]); // Apenas dbInstance, para garantir que os listeners sejam configurados uma vez.

  // 3. Atualiza HUDs Ativos sempre que activeUniversity ou allHuds mudar
  useEffect(() => {
    // Se a universidade ativa não for a EMPTY e houver HUDs carregados, filtre.
    if (activeUniversity.id !== EMPTY_UNIVERSITY.id && allHuds.length > 0) {
      const newHuds = allHuds.filter(
        (h) => h.universityId === activeUniversity.id
      );
      setActiveHuds(newHuds);
    } else {
      setActiveHuds([]); // Limpa se a universidade for a EMPTY ou se não houver HUDs
    }
  }, [activeUniversity, allHuds]);

  // 4. Mock de login para o AdventurerLanding (mantido para simulação de login/role)
  const signInMockUser = async (role: UserRole) => {
    if (authInstance) {
      // Cria um usuário temporário no mock list se for estudante
      const mockUser =
        role === "STUDENT" ? MOCK_USERS_LIST[0] : MOCK_USERS_LIST[1];
      setCurrentUser((prev) => {
        // Preserva o ID do Firebase/Anon se existir, mas muda o role
        const id = prev?.id || mockUser.id;
        return { ...mockUser, id, role };
      });
      setLocationStatus(role === "STUDENT" ? "PRESENCIAL" : "FORA_DO_CAMPUS");
      // Define o filterLevel para INSTITUTION ao simular login de Estudante/Aventureiro
      setFilterLevel("INSTITUTION");
    }
  };

  // 5. Simulação de mudança de HUD baseado na localização (opcional)
  useEffect(() => {
    // Esta lógica é para estudantes que estão 'PRESENCIAL' na sua uni
    if (locationStatus === "PRESENCIAL" && activeHuds.length > 0) {
      setCurrentHubId(activeHuds[0].id);
    } else {
      setCurrentHubId(null);
    }
  }, [locationStatus, activeHuds]);

  // 6. Exposição do Contexto
  const contextValue = useMemo(
    () => ({
      currentUser,
      currentHubId,
      locationStatus,
      isAuthReady,
      universityData: activeUniversity,
      courseData: MOCK_COURSES, // Mantido mock, se necessário
      hudsList: activeHuds,
      allUniversitiesList: allUniversities,
      filterLevel,
      setFilterLevel,
      setAppContextUniversity,
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
      activeUniversity,
      activeHuds,
      allUniversities,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
