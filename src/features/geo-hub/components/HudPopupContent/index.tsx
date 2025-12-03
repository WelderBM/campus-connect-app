import React from "react";
import { Link } from "react-router-dom";
import type { HUD } from "@/types";

interface HudPopupContentProps {
  hud: HUD;
  isMyUniversity: boolean;
}

export const HudPopupContent: React.FC<HudPopupContentProps> = ({
  hud,
  isMyUniversity,
}) => {
  const buttonClass = isMyUniversity
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-gray-700 hover:bg-gray-800";

  return (
    <div className="text-center min-w-[150px] p-1">
      <span className="text-3xl block mb-1">{hud.emoji}</span>
      <strong className="text-gray-900 block text-lg font-bold">
        {hud.nickname}
      </strong>
      <p className="text-xs text-gray-500 mb-3">{hud.formalName}</p>

      <div
        className={`text-sm font-semibold mb-3 py-1 rounded-full ${
          isMyUniversity
            ? "bg-green-100/70 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {isMyUniversity
          ? `🟢 ${hud.usersCount} Pessoas Agora`
          : `🗺️ ${hud.universityId} - ${hud.usersCount} Ativos`}
      </div>

      <Link
        to={
          isMyUniversity ? `/hud/${hud.id}` : `/university/${hud.universityId}`
        }
        className={`block w-full text-white text-sm font-bold py-2 px-4 rounded-full transition-colors no-underline shadow-md ${buttonClass}`}
      >
        {isMyUniversity ? "Entrar no Espaço" : "Ver Página da Universidade"}
      </Link>

      {!isMyUniversity && (
        <p className="mt-2 text-[10px] text-gray-400">Conteúdo Nacional</p>
      )}
    </div>
  );
};
