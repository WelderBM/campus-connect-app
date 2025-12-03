import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  type Auth,
} from "firebase/auth";
import {
  getFirestore,
  Firestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  setLogLevel,
} from "firebase/firestore";
import { isWithinRadius, isWithinPolygon } from "@/utils/geoUtils";
import type { Course, User } from "@/types";
import type { Coordinates, HUD, University } from "@/types";

declare const __app_id: string;
declare const __firebase_config: string;
declare const __initial_auth_token: string;

type FilterLevel = "GLOBAL" | "NATIONAL" | "INSTITUTION";
type LocationStatus = "OUTSIDE" | "VIRTUAL" | "PRESENCIAL";

let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;
let appInstance: FirebaseApp | null = null;

interface AppContextType {
  currentUser: User | null;
  isAuthReady: boolean;
  filterLevel: FilterLevel;
  setFilterLevel: (level: FilterLevel) => void;
  hudsList: HUD[];
  universityData: University | null;
  actualPosition: Coordinates | null;
  currentUniversityId: string | null;
  currentHubId: string | null;
  locationStatus: LocationStatus;
  updateUserPosition: (position: Coordinates) => void;
  signInMockUser: (role: "STUDENT" | "ADVENTURER") => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initializeFirebase = () => {
  try {
    const firebaseConfig = JSON.parse(
      typeof __firebase_config !== "undefined" ? __firebase_config : "{}"
    );
    if (!appInstance) {
      appInstance = initializeApp(firebaseConfig);
      dbInstance = getFirestore(appInstance);
      authInstance = getAuth(appInstance);
      setLogLevel("debug");
    }
  } catch (error) {
    console.error("Falha ao inicializar o Firebase.", error);
  }
};

const getPath = (collectionName: string, docId?: string) => {
  const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
  let path = `artifacts/${appId}/public/data/${collectionName}`;
  if (docId) {
    path += `/${docId}`;
  }
  return path;
};

const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    name: "Direito",
    shortName: "DIREITO",
    colorHex: "#E63946",
    universityId: "uni-1",
  },
  {
    id: "course-2",
    name: "Engenharia Civil",
    shortName: "ENGENHARIA",
    colorHex: "#457B9D",
    universityId: "uni-1",
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  initializeFirebase();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [filterLevel, setFilterLevelState] = useState<FilterLevel>(
    () =>
      (localStorage.getItem("appFilterLevel") as FilterLevel) || "INSTITUTION"
  );

  const [hudsList, setHudsList] = useState<HUD[]>([]);
  const [universityData, setUniversityData] = useState<University | null>(null);

  const [actualPosition, setActualPosition] = useState<Coordinates | null>(
    null
  );
  const [currentUniversityId, setCurrentUniversityId] = useState<string | null>(
    null
  );
  const [currentHubId, setCurrentHubId] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] =
    useState<LocationStatus>("OUTSIDE");

  const setFilterLevel = useCallback((level: FilterLevel) => {
    setFilterLevelState(level);
    localStorage.setItem("appFilterLevel", level);
  }, []);

  const fetchOrCreateUserProfile = useCallback(async (uid: string) => {
    if (!dbInstance) return null;

    const userRef = doc(dbInstance, `artifacts/${uid}/profile/data`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as User;
    } else {
      const newUserProfile: User = {
        id: uid,
        name: "Novo Estudante",
        role: "STUDENT",
        universityId: "uni-1",
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

  const fetchStaticData = useCallback(async () => {
    if (!dbInstance) return;

    const hudsRef = collection(dbInstance, getPath("huds"));
    const hudsSnapshot = await getDocs(hudsRef);
    const huds = hudsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as HUD)
    );
    setHudsList(huds);

    const uniRef = doc(dbInstance, getPath("universities"), "uni-1");
    const uniSnapshot = await getDoc(uniRef);
    if (uniSnapshot.exists()) {
      setUniversityData({
        id: uniSnapshot.id,
        ...uniSnapshot.data(),
      } as University);
    } else {
      console.error(
        "Dados da Universidade 'uni-1' não encontrados no Firestore."
      );
    }
  }, []);

  useEffect(() => {
    if (!authInstance) return;

    fetchStaticData();

    const unsubscribe = onAuthStateChanged(
      authInstance,
      async (firebaseUser) => {
        if (firebaseUser) {
          const profile = await fetchOrCreateUserProfile(firebaseUser.uid);
          setCurrentUser(profile);
        } else {
          setCurrentUser(null);
        }
        setIsAuthReady(true);
      }
    );

    const initializeAuth = async () => {
      try {
        if (
          authInstance &&
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
          await signInWithCustomToken(authInstance, __initial_auth_token);
        } else if (authInstance) {
          await signInAnonymously(authInstance);
        }
      } catch (error) {
        await signInAnonymously(authInstance!);
      }
    };

    initializeAuth();
    return () => unsubscribe();
  }, [fetchOrCreateUserProfile, fetchStaticData]);

  const updateUserPosition = useCallback(
    (position: Coordinates) => {
      setActualPosition(position);

      if (!universityData) {
        return;
      }

      const uniRadius = universityData.proximityRadiusKm;
      const uniCenter = universityData.centerCoordinates;

      const isPresential = isWithinRadius(position, uniCenter, uniRadius);

      if (isPresential) {
        setCurrentUniversityId(universityData.id);
        setLocationStatus("PRESENCIAL");

        const activeHub = hudsList.find((hud) =>
          isWithinPolygon(position, hud.polygonCoordinates)
        );
        setCurrentHubId(activeHub?.id || null);
      } else {
        setCurrentUniversityId(null);
        setCurrentHubId(null);
        setLocationStatus("OUTSIDE");
      }
    },
    [universityData, hudsList]
  );

  const signInMockUser = useCallback(
    async (role: "STUDENT" | "ADVENTURER") => {
      if (authInstance) {
        const tempUser = authInstance.currentUser;
        if (tempUser) {
          const profile = await fetchOrCreateUserProfile(tempUser.uid);
          if (profile) {
            setCurrentUser({ ...profile, role: role });
          }
        }
      }
    },
    [fetchOrCreateUserProfile]
  );

  const value = {
    currentUser,
    isAuthReady,
    filterLevel,
    setFilterLevel,
    hudsList,
    universityData,
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
