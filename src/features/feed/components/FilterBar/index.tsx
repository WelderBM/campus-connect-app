import React from "react";
import { useAppContext } from "@/context/AppContext";

export const FilterBar: React.FC = () => {
  const { filterLevel, setFilterLevel } = useAppContext();

  const getButtonClass = (level: string) => {
    return filterLevel === level
      ? "bg-blue-600 text-white shadow-md"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300";
  };

  return (
    <div className="flex space-x-2 p-1 bg-gray-100 rounded-xl">
      <button
        onClick={() => setFilterLevel("GLOBAL")}
        className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-colors ${getButtonClass(
          "GLOBAL"
        )}`}
      >
        Mundo 🌍
      </button>
      <button
        onClick={() => setFilterLevel("NATIONAL")}
        className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-colors ${getButtonClass(
          "NATIONAL"
        )}`}
      >
        Nacional 🇧🇷
      </button>
      <button
        onClick={() => setFilterLevel("INSTITUTION")}
        className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-colors ${getButtonClass(
          "INSTITUTION"
        )}`}
      >
        Campus 🏫
      </button>
    </div>
  );
};
