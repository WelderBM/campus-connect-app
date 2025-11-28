// src/features/profile/components/RankingCard.tsx
import React from "react";
import { User } from "@/types";

interface RankingCardProps {
  user: User;
  rank: number;
  isCurrentUser: boolean;
}

export const RankingCard: React.FC<RankingCardProps> = ({
  user,
  rank,
  isCurrentUser,
}) => {
  // Classes de cores para o Top 3
  const rankColor =
    rank === 1
      ? "text-yellow-600"
      : rank === 2
      ? "text-gray-500"
      : rank === 3
      ? "text-yellow-800"
      : "text-gray-400";

  return (
    <div
      className={`flex items-center p-3 rounded-xl transition-all border ${
        isCurrentUser
          ? "bg-blue-100/70 border-blue-400 shadow-lg"
          : "bg-white border-gray-100"
      }`}
    >
      {/* 1. RANK E MEDALHA */}
      <div
        className={`w-10 text-lg font-extrabold shrink-0 text-center ${rankColor}`}
      >
        {rank <= 3 ? (
          <span className="text-xl">
            {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
          </span>
        ) : (
          <span className="text-gray-600">{rank}°</span>
        )}
      </div>

      {/* 2. AVATAR & NOME */}
      <div className="flex items-center flex-grow gap-3 ml-2">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
        />
        <div>
          <p
            className={`font-bold text-gray-800 ${
              isCurrentUser ? "text-blue-700" : ""
            }`}
          >
            {user.name} {isCurrentUser && "(Você)"}
          </p>
          <p className="text-xs text-gray-500">
            {user.role === "STUDENT" ? "🎓 Universitário" : "🎒 Aventureiro"}
          </p>
        </div>
      </div>

      {/* 3. PONTOS */}
      <div className="text-right shrink-0">
        <p className="text-xl font-bold text-gray-900">{user.points}</p>
        <p className="text-xs text-gray-400">XP</p>
      </div>
    </div>
  );
};
