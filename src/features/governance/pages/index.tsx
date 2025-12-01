// src/features/governance/pages/GovernancePage.tsx
import React, { useEffect, useState } from "react";
import { api } from "@/services/mockData";
import type { Proposal } from "@/types";
import { ProposalCard } from "../components/ProposalCard";

export const GovernancePage: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    api.getProposals().then(setProposals);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Governança</h1>
        <p className="text-gray-500 text-sm mt-1">
          Vote para moldar o mapa da universidade e ganhe pontos.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          Votações Ativas ({proposals.length})
        </h2>

        {proposals.map((prop) => (
          <ProposalCard key={prop.id} proposal={prop} />
        ))}

        {/* Botão Flutuante de Criar (Simulado) */}
        <button
          className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition active:scale-90 z-40 flex items-center justify-center w-14 h-14"
          title="Criar Nova Proposta"
          onClick={() => alert("O Módulo de Desenho de Polígono abriria aqui!")}
        >
          <span className="text-2xl">➕</span>
        </button>
      </div>
    </div>
  );
};
