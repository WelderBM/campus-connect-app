import React from "react";
import { useAppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { CardContainer } from "@/global/components/cardContainer";
import { ActionButton } from "@/global/components/ActionButton";

export const ProfilePage: React.FC = () => {
  // 1. OBTENDO O ESTADO REAL E O FLAG DE CARREGAMENTO
  const { currentUser, isAuthReady } = useAppContext();

  // 2. VERIFICAÇÃO DE CARREGAMENTO E REDIRECIONAMENTO (GUARD CLAUSE)
  if (!isAuthReady) {
    return (
      <div className="p-10 text-center text-xl text-gray-500">
        Autenticando Perfil...
      </div>
    );
  }

  // Se terminou o Auth e o currentUser é null (o que não deve acontecer no nosso AppProvider),
  // ou se for um Adventurer que não deveria estar aqui.
  if (!currentUser) {
    return (
      <div className="p-10 text-center text-xl text-red-600">
        Perfil não encontrado. Por favor, tente logar novamente.
      </div>
    );
  }

  // Lógica de XP (Pode ser transferida para um hook ou utilitário no futuro, mas mantida aqui por clareza)
  const level = Math.floor(currentUser.points / 1000) + 1;
  const nextLevelThreshold = level * 1000;
  // Cálculo do progresso na barra
  const progress = ((currentUser.points % 1000) / 1000) * 100;

  return (
    <div className="h-full bg-gray-50 pb-24">
      {/* HEADER DE PERFIL (Fixo no topo) */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 pb-8 pt-6 px-4 mb-4">
        <div className="max-w-md mx-auto text-center">
          {/* Avatar e Level Badge */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-blue-400 to-purple-500">
              <img
                src={currentUser.avatarUrl}
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-white object-cover"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
              Lvl {level}
            </span>
          </div>

          {/* Nome e Cargo */}
          <h1 className="text-2xl font-bold text-gray-900 flex justify-center items-center gap-2">
            {currentUser.name}
            {currentUser.isModerator && <span title="Moderador">👑</span>}
          </h1>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mt-1">
            {currentUser.role === "STUDENT"
              ? "🎓 Universitário Verificado"
              : "🎒 Visitante"}
          </p>

          {/* Barra de Progresso XP */}
          <div className="mt-6">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
              <span>{currentUser.points} XP</span>
              <span>{nextLevelThreshold} XP</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              Faltam {nextLevelThreshold - currentUser.points} pontos para o
              nível {level + 1}
            </p>
          </div>
        </div>
      </div>

      {/* DETALHES GERAIS (STREAK E VOTOS) */}
      <div className="grid grid-cols-2 gap-3 px-4 max-w-md mx-auto mb-6">
        <CardContainer padding="default" className="text-center">
          <span className="block text-2xl mb-1">🔥</span>
          <span className="block font-bold text-gray-800 text-lg">12 Dias</span>
          <span className="text-xs text-gray-400">Sequência (Streak)</span>
        </CardContainer>
        <CardContainer padding="default" className="text-center">
          <span className="block text-2xl mb-1">🗳️</span>
          <span className="block font-bold text-gray-800 text-lg">45</span>
          <span className="text-xs text-gray-400">Votos em Governança</span>
        </CardContainer>
      </div>

      {/* ULTIMAS CONQUISTAS */}
      <div className="px-4 max-w-md mx-auto">
        <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">
          Últimas Conquistas
        </h3>

        <div className="space-y-3">
          <CardContainer padding="default" className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-full text-lg">🗳️</div>
            <div>
              <p className="font-bold text-gray-800 text-sm">
                Cidadão Exemplar
              </p>
              <p className="text-xs text-gray-500">
                Votou em 10 propostas seguidas.
              </p>
            </div>
            <span className="ml-auto text-xs font-bold text-blue-600">
              +200 XP
            </span>
          </CardContainer>

          <CardContainer
            padding="default"
            className="flex items-center gap-3 opacity-60"
          >
            <div className="bg-gray-100 p-2 rounded-full text-lg">🔇</div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Mestre do Foco</p>
              <p className="text-xs text-gray-500">
                Estudou 10h na Biblioteca.
              </p>
            </div>
            <span className="ml-auto text-xs font-bold text-gray-400">
              Bloqueado
            </span>
          </CardContainer>
        </div>
      </div>

      <div className="m-4 mt-8 max-w-md mx-auto">
        <Link to="/ranking" className="block w-full">
          <ActionButton
            text="Ver Ranking Completo 🏆"
            onClick={() => {}}
            variant="primary"
            className="bg-gray-900 hover:bg-gray-700"
          />
        </Link>
      </div>
    </div>
  );
};
