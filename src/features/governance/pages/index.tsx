import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProposalCard } from "../components/ProposalCard";
import { CardContainer } from "@/global/components/cardContainer";
import { ActionButton } from "@/global/components/ActionButton";
import type { Proposal } from "@/types/identity";

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: "prop-1",
    authorId: "user-3",
    type: "NEW_HUD",
    title: "Proposta: Novo Hub de Estudos na Biblioteca Central",
    description:
      "Criação de uma área silenciosa e tecnológica com carregadores USB e monitores grandes no segundo andar da biblioteca.",
    targetCategory: "ACADEMIC",
    votesFor: 150,
    votesAgainst: 20,
    expiresAt: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdAt: Date.now() - 86400000,
  },
  {
    id: "prop-2",
    authorId: "user-1",
    type: "NEW_RULE",
    title: "Regra: Horário Estendido para Laboratórios de Engenharia",
    description:
      "Permitir o uso dos laboratórios de Engenharia até as 23h, mediante agendamento e supervisão de moderador.",
    targetCategory: "ACADEMIC",
    votesFor: 80,
    votesAgainst: 5,
    expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
    createdAt: Date.now() - 86400000 * 2,
  },
];

export const GovernancePage: React.FC = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // NOTE: Em produção, isso seria um listener onSnapshot do Firestore
    // Collection: artifacts/{appId}/public/data/proposals
    setProposals(MOCK_PROPOSALS);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 font-bold">
        Carregando Propostas...
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Governança DAO do Campus
      </h1>
      <p className="text-gray-600">
        Vote nas propostas para moldar o ambiente físico e digital da sua
        universidade.
      </p>

      <ActionButton
        onClick={() => navigate("/governance/new")}
        text="Propor Novo HUD ou Regra"
        emoji="📝"
        variant="primary"
        isFullWidth={true}
      />

      <CardContainer padding="large">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Propostas Ativas ({proposals.length})
        </h2>
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </CardContainer>
    </div>
  );
};
