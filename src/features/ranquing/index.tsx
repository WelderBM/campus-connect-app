// src/features/profile/pages/RankingPage.tsx
import React, { useEffect, useState } from "react";
import { api, MOCK_USERS_LIST } from "@/services/mockData";
import type { User } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { RankingCard } from "../profile/components/RankingCard";
import { Link } from "react-router-dom";

export const RankingPage: React.FC = () => {
  const { currentUser } = useAppContext();
  const [ranking, setRanking] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getRanking().then((data) => {
      setRanking(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !currentUser) {
    return <div className="p-10 text-center">Carregando Ranking...</div>;
  }

  const userRankIndex = ranking.findIndex((u) => u.id === currentUser.id);
  const userRank =
    userRankIndex !== -1 ? userRankIndex + 1 : MOCK_USERS_LIST.length + 1;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm mb-6">
        <Link
          to="/profile"
          className="text-sm text-gray-500 mb-2 block hover:underline"
        >
          ← Voltar ao Perfil
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          🏆 Ranking Semestral
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Veja quem está liderando o engajamento na UFRR.
        </p>
      </div>

      <div className="px-4 space-y-3">
        <div className="bg-blue-100/70 p-4 rounded-xl shadow-lg border-2 border-blue-400 text-center mb-6">
          <p className="text-sm font-semibold text-blue-800">
            Sua Posição Atual:
          </p>
          <p className="text-4xl font-extrabold text-blue-900 mt-1">
            {userRank}° Lugar
          </p>
          <p className="text-sm text-blue-700 mt-2">
            Próximo Nível em {2000 - currentUser.points} XP.
          </p>
        </div>

        {ranking.map((user, index) => (
          <RankingCard
            key={user.id}
            user={user}
            rank={index + 1}
            isCurrentUser={user.id === currentUser.id}
          />
        ))}
      </div>
    </div>
  );
};
