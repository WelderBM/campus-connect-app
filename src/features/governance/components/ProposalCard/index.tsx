import React, { useState } from "react";
import type { Proposal } from "@/types";
import { getThemeClasses } from "@/utils/themeHelpers";

interface ProposalCardProps {
  proposal: Proposal;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const theme = getThemeClasses(proposal.targetCategory);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (type: "FOR" | "AGAINST") => {
    // Aqui chamaria a API real
    setHasVoted(true);
    alert(
      `Voto ${type === "FOR" ? "A FAVOR" : "CONTRA"} registrado! +50 Pontos`
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4 relative overflow-hidden">
      {/* Faixa lateral colorida indicando a categoria proposta */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.tagBg}`} />

      <div className="pl-3">
        {/* Cabeçalho */}
        <div className="flex justify-between items-start mb-2">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider ${theme.text} bg-gray-50 px-2 py-1 rounded`}
          >
            Proposta de Novo Local
          </span>
          <span className="text-xs text-gray-400">Expira em 2 dias</span>
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-1">
          {proposal.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {proposal.description}
        </p>

        {/* Barra de Progresso Visual */}
        <div className="w-full bg-gray-100 h-2 rounded-full mb-4 overflow-hidden flex">
          <div
            className="bg-green-500 h-full"
            style={{
              width: `${
                (proposal.votesFor /
                  (proposal.votesFor + proposal.votesAgainst)) *
                100
              }%`,
            }}
          />
        </div>

        {/* Botões de Ação */}
        {!hasVoted ? (
          <div className="flex gap-3">
            <button
              onClick={() => handleVote("FOR")}
              className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition shadow-md active:scale-95"
            >
              ✅ Aprovar
            </button>
            <button
              onClick={() => handleVote("AGAINST")}
              className="flex-1 bg-white border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition active:scale-95"
            >
              ❌ Rejeitar
            </button>
          </div>
        ) : (
          <div className="text-center py-2 bg-green-50 text-green-700 font-bold rounded-lg text-sm border border-green-100">
            🎉 Voto Computado!
          </div>
        )}
      </div>
    </div>
  );
};
