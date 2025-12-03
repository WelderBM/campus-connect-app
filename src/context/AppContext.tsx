import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { isWithinRadius, isWithinPolygon } from "@/utils/geoUtils";
import type { User } from "@/types/identity";
import type { Coordinates } from "@/types/geo";
import { MOCK_HUDS, MOCK_UNIVERSITY } from "@/services/geo";
import { MOCK_COURSES } from "@/services/identity";

// --- Variáveis Globais (Fornecidas pelo Ambiente Canvas) ---
declare const __app_id: string;
declare const __firebase_config: string;
declare const __initial_auth_token: string;

type FilterLevel = "GLOBAL" | "NATIONAL" | "INSTITUTION";
type LocationStatus = "OUTSIDE" | "VIRTUAL" | "PRESENCIAL";

// --- Estrutura do Contexto ---
interface AppContextType {
  currentUser: User | null;
  isAuthReady: boolean;
  filterLevel: FilterLevel;
  setFilterLevel: (level: FilterLevel) => void;

  // Estados de Geolocalização
  actualPosition: Coordinates | null;
  currentUniversityId: string | null;
  currentHubId: string | null;
  locationStatus: LocationStatus;

  // Funções de Ação
  updateUserPosition: (position: Coordinates) => void;
  signInMockUser: (role: "STUDENT" | "ADVENTURER") => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// --- Inicialização do Firebase ---
const firebaseConfig = JSON.parse(
  typeof __firebase_config !== "undefined" ? __firebase_config : "{}"
);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

// Função auxiliar para obter o caminho do documento do usuário
const getUserDocRef = (userId: string) =>
  doc(db, `artifacts/${appId}/users/${userId}/profile`, "data");

// --- Provider Principal ---
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [filterLevel, setFilterLevelState] = useState<FilterLevel>(
    () =>
      (localStorage.getItem("appFilterLevel") as FilterLevel) || "INSTITUTION"
  );

  // Estados de Geolocalização
  const [actualPosition, setActualPosition] = useState<Coordinates | null>(
    null
  );
  const [currentUniversityId, setCurrentUniversityId] = useState<string | null>(
    null
  );
  const [currentHubId, setCurrentHubId] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] =
    useState<LocationStatus>("OUTSIDE");

  // 1. Persistência e Setter de Filtro
  const setFilterLevel = useCallback((level: FilterLevel) => {
    setFilterLevelState(level);
    localStorage.setItem("appFilterLevel", level);
  }, []);

  // 2. FUNÇÃO CRÍTICA: Busca e Cria o Perfil do Usuário no Firestore
  const fetchOrCreateUserProfile = useCallback(async (uid: string) => {
    const userRef = getUserDocRef(uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as User;
    } else {
      const newUserProfile: User = {
        id: uid,
        name: "Novo Estudante",
        role: "STUDENT",
        universityId: MOCK_UNIVERSITY.id,
        courseId: MOCK_COURSES[1].id,
        isModerator: false,
        points: 100,
        avatarUrl: `https://placehold.co/100x100/A8DADC/1D3557?text=${uid.slice(
          0,
          4
        )}`,
      };
      await setDoc(userRef, newUserProfile, { merge: true });
      return newUserProfile;
    }
  }, []);

  // 3. Autenticação e Sincronização (Firebase Auth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await fetchOrCreateUserProfile(firebaseUser.uid);
        setCurrentUser(profile);
      } else {
        setCurrentUser(null);
      }
      setIsAuthReady(true);
    });

    const initializeAuth = async () => {
      try {
        if (
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        await signInAnonymously(auth);
      }
    };

    initializeAuth();
    return () => unsubscribe();
  }, [fetchOrCreateUserProfile]);

  // 4. MOCK DE LOGIN PARA A LANDING PAGE (ADVENTURER/STUDENT)
  const signInMockUser = useCallback(
    async (role: "STUDENT" | "ADVENTURER") => {
      if (auth.currentUser) {
        if (role === "ADVENTURER") {
          setCurrentUser({
            id: auth.currentUser.uid,
            name: "Visitante",
            role: "ADVENTURER",
            universityId: MOCK_UNIVERSITY.id,
            isModerator: false,
            points: 0,
            avatarUrl: "https://placehold.co/100x100/000000/FFFFFF?text=ADV",
          } as User);
        } else {
          const profile = await fetchOrCreateUserProfile(auth.currentUser.uid);
          setCurrentUser(profile);
        }
      }
    },
    [fetchOrCreateUserProfile]
  );

  // 5. Lógica de Geofencing (Atualiza HUB/UNI)
  const updateUserPosition = useCallback((position: Coordinates) => {
    setActualPosition(position);

    const uniRadius = MOCK_UNIVERSITY.proximityRadiusKm;
    const uniCenter = MOCK_UNIVERSITY.centerCoordinates;

    const isPresential = isWithinRadius(position, uniCenter, uniRadius);

    if (isPresential) {
      setCurrentUniversityId(MOCK_UNIVERSITY.id);
      setLocationStatus("PRESENCIAL");

      // Verifica HUD específico (Polígono)
      const activeHub = MOCK_HUDS.find((hud) =>
        isWithinPolygon(position, hud.polygonCoordinates)
      );
      setCurrentHubId(activeHub?.id || null);
    } else {
      setCurrentUniversityId(null);
      setCurrentHubId(null);
      setLocationStatus("OUTSIDE");
    }
  }, []);

  const value = {
    currentUser,
    isAuthReady,
    filterLevel,
    setFilterLevel,
    actualPosition,
    currentUniversityId,
    currentHubId,
    locationStatus,
    updateUserPosition,
    signInMockUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
