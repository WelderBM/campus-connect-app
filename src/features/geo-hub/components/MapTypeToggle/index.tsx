import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";

interface MapScaleToggleProps {}

export const MapScaleToggle: React.FC<MapScaleToggleProps> = () => {
  const { filterLevel, setFilterLevel } = useAppContext();
  const [isGlobal, setIsGlobal] = useState(
    filterLevel === "GLOBAL" || filterLevel === "NATIONAL"
  );

  const handleToggle = () => {
    const newScale = isGlobal ? "INSTITUTION" : "NATIONAL";
    setIsGlobal(!isGlobal);
    setFilterLevel(newScale);
  };

  useEffect(() => {
    setIsGlobal(filterLevel === "GLOBAL" || filterLevel === "NATIONAL");
  }, [filterLevel]);

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-12 ml-1 flex items-center w-16 h-9 p-1 rounded-full bg-blue-200 shadow-inner overflow-hidden transition-all duration-300 mb-24 "
      aria-pressed={!isGlobal}
    >
      <span
        className={`absolute w-7 h-6 rounded-full bg-white border border-blue-600 shadow-md transition-transform duration-300 transform ${
          isGlobal ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <span
        className={`absolute left-2 text-lg transition-opacity duration-300 ${
          isGlobal ? "opacity-50 text-white" : "opacity-100 text-blue-900"
        }`}
      >
        🏛️
      </span>

      <span
        className={`absolute right-1 text-lg transition-opacity duration-300 ${
          isGlobal ? "opacity-100 text-blue-900" : "opacity-50 text-white"
        }`}
      >
        🌍
      </span>
    </button>
  );
};
