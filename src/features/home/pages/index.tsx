import React, { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { StudentHub } from "./StudentHub";
import { AdventurerLanding } from "./AdventurerLanding";
import type { Coordinates } from "@/types/geo";

export const InstitutionalHubPage: React.FC = () => {
  const { currentUser, isAuthReady, signInMockUser, updateUserPosition } =
    useAppContext();

  useEffect(() => {
    if (!isAuthReady) return;

    if (currentUser?.role !== "ADVENTURER") {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords: Coordinates = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          updateUserPosition(coords);
        },
        (error) => {
          console.warn("Erro ao obter geolocalização. Usando mock:", error);
          updateUserPosition([2.833, -60.693]);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isAuthReady, currentUser, updateUserPosition]);

  if (!isAuthReady) {
    return (
      <div className="p-10 text-center text-xl font-bold text-gray-500 min-h-screen flex items-center justify-center">
        Carregando Campus Connect...
      </div>
    );
  }

  if (currentUser?.role === "ADVENTURER" || !currentUser) {
    return <AdventurerLanding signInMockUser={signInMockUser} />;
  }

  return <StudentHub />;
};
