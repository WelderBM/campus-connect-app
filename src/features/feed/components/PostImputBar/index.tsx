import React from "react";
import { useAppContext } from "@/context/AppContext";

export const PostInputBar: React.FC = () => {
  const { currentUser } = useAppContext();

  if (!currentUser) return null;

  return (
    <div className="flex gap-2 items-center w-full p-2 bg-white">
      <img
        src={currentUser.avatarUrl}
        alt="Perfil"
        className="w-8 h-8 rounded-full shrink-0"
      />
      <input
        type="text"
        placeholder="No que você está pensando, Welder?"
        className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
        disabled
      />
      <button
        className="bg-blue-600 text-white font-bold py-2 px-3 rounded-full hover:bg-blue-700 transition active:scale-95 text-sm shrink-0"
        onClick={() => alert("Módulo de criação de post abriria aqui!")}
        disabled
      >
        Postar
      </button>
    </div>
  );
};
