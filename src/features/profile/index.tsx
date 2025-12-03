import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { api } from "@/services/dataApi";
import type { User } from "@/types";
import { RankingCard } from "./components/RankingCard";
import { CardContainer } from "@/global/components/CardContainer";

export const ProfilePage: React.FC = () => {
  const { currentUser, isAuthReady, universityData, locationStatus } =
    useAppContext();
  const [rankingPosition, setRankingPosition] = useState<number | null>(null);
  const [loadingRanking, setLoadingRanking] = useState(true);

  useEffect(() => {
    if (!isAuthReady || !currentUser) return;

    api.getRanking().then((allUsers) => {
      const position = allUsers.findIndex((u) => u.id === currentUser.id) + 1;
      setRankingPosition(position);
      setLoadingRanking(false);
    });
  }, [isAuthReady, currentUser]);

  if (!isAuthReady || !currentUser) {
    return (
      <div className="p-10 text-center text-gray-500 font-bold">
        Carregando Perfil...
      </div>
    );
  }

  const user = currentUser as User;

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Perfil do Estudante
      </h1>

      <CardContainer padding="large" className="flex items-center space-x-4">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm font-semibold text-blue-600 mt-1">
            {user.courseId} @ {universityData?.shortName}
          </p>
          <p className="text-xs text-gray-500 mt-2">ID: {user.id}</p>
        </div>
      </CardContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RankingCard
          title="Pontuação Total"
          value={`${user.points} XP`}
          icon="✨"
          isLoading={false}
        />
        <RankingCard
          title="Posição no Ranking"
          value={loadingRanking ? "Carregando..." : `#${rankingPosition}`}
          icon="🏆"
          isLoading={loadingRanking}
        />
      </div>

      <CardContainer padding="large">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Status de Presença
        </h3>
        <p
          className={`text-lg font-semibold ${
            locationStatus === "PRESENCIAL" ? "text-green-600" : "text-red-600"
          }`}
        >
          {locationStatus}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Localização:{" "}
          {locationStatus === "PRESENCIAL"
            ? "Dentro do Campus"
            : "Fora da Área de Proximidade"}
        </p>
      </CardContainer>

      <CardContainer padding="large">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Funções e Moderação
        </h3>
        <p className="text-md text-gray-800">
          Função:{" "}
          <span className="font-semibold text-purple-600">{user.role}</span>
        </p>
        <p className="text-md text-gray-800 mt-2">
          Moderador:{" "}
          <span
            className={`font-semibold ${
              user.isModerator ? "text-green-600" : "text-red-600"
            }`}
          >
            {user.isModerator ? "SIM" : "NÃO"}
          </span>
        </p>
      </CardContainer>
    </div>
  );
};
