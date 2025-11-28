import React from "react";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom"; // Necessário para a navegação do botão Global
import { universityFlag } from "@/globals/components/universityFlag";
import type { JSX } from "react";

export default function FilterBar() {
  const { filterLevel, setFilterLevel, currentUser } = useAppContext();
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const filters: {
    level: "GLOBAL" | "NATIONAL" | "INSTITUTION";
    icon: JSX.Element | string;
    label: string;
  }[] = [
    { level: "GLOBAL", label: "Global", icon: "🌎" },
    { level: "NATIONAL", label: "Nacional", icon: universityFlag },
    { level: "INSTITUTION", label: "Minha Instituição", icon: "🏛️" },
  ];

  const handleFilterClick = (level: "GLOBAL" | "NATIONAL" | "INSTITUTION") => {
    if (currentUser?.role === "ADVENTURER" && level !== "GLOBAL") {
      alert(
        "Acesso restrito. Conteúdo Nacional/Institucional disponível apenas para Universitários verificados."
      );
      return;
    }
    setFilterLevel(level);
  };

  return (
    <div className="flex justify-start px-1 mb-4">
      <div className="flex gap-2 p-1 bg-gray-100 rounded-full shadow-inner">
        {filters.map((filter) => (
          <button
            key={filter.level}
            onClick={() => handleFilterClick(filter.level)}
            className={`
              // Adicionado items-center para alinhamento vertical
              flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 shrink-0
              ${
                filterLevel === filter.level
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {/* Wrapper para Icon/Emoji/Componente: Garante altura e alinhamento central */}
            <span className="flex items-center justify-center h-5 w-5 text-xl shrink-0">
              {filter.icon}
            </span>

            <span className="shrink-0">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
