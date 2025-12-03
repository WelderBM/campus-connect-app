import React from "react";
import { ActionButton } from "@/global/components/ActionButton";
import { getThemeClasses } from "@/utils/themeHelpers";
import type { Proposal } from "@/types";
import { CardContainer } from "@/global/components/CardContainer";

interface ProposalCardProps {
  proposal: Proposal;
}

const getExpirationText = (expiresAt: string) => {
  const diff = new Date(expiresAt).getTime() - Date.now();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 0) return `Votação expira em ${days} dia(s)`;
  if (diff > 0) return "Expirando hoje";
  return "Expirada";
};

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const theme = getThemeClasses(proposal.targetCategory || "GENERAL");
  const expirationText = getExpirationText(proposal.expiresAt);
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const supportPercentage =
    totalVotes > 0 ? Math.round((proposal.votesFor / totalVotes) * 100) : 0;

  const proposalTypeLabel =
    proposal.type === "NEW_HUD" ? "Novo Local (HUD)" : "Nova Regra";

  return (
    <CardContainer padding="large" className="space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-900 leading-snug">
          {proposal.title}
        </h3>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${theme.tagBg} ${theme.text}`}
        >
          {proposal.targetCategory.toUpperCase()}
        </span>
      </div>

      <div className="text-sm text-gray-600">
        <p className="mb-2">{proposal.description}</p>
        <p className="font-semibold">{proposalTypeLabel}</p>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <p
            className={`text-xs font-bold ${
              expirationText === "Expirada" ? "text-red-600" : "text-orange-600"
            }`}
          >
            {expirationText}
          </p>
          <p className="text-sm font-semibold text-gray-700">
            {supportPercentage}% Sim
          </p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${supportPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between space-x-3">
          <ActionButton
            onClick={() => console.log(`Votou Sim na proposta ${proposal.id}`)}
            text={`Aprovar (${proposal.votesFor})`}
            variant="success"
            className="flex-1 py-2 text-sm"
          />
          <ActionButton
            onClick={() => console.log(`Votou Não na proposta ${proposal.id}`)}
            text={`Rejeitar (${proposal.votesAgainst})`}
            variant="danger"
            className="flex-1 py-2 text-sm"
          />
        </div>
      </div>
    </CardContainer>
  );
};
