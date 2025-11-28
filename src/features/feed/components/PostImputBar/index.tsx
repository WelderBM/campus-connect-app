import React from "react";
import { useAppContext } from "@/context/AppContext";

export const PostInputBar: React.FC = () => {
  const { currentUser } = useAppContext();

  if (!currentUser) return null;

  return (
    <div className="bg-white p-4 mb-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">
        Compartilhe o que está rolando!
      </h2>
      <textarea
        placeholder={`O que está acontecendo na sua área, ${currentUser.name}?`}
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
        disabled
      />
      <div className="flex justify-between items-center mt-3">
        <p className="text-xs text-gray-400">
          Clique para anexar 📎 (Imagens, Enquetes, Localização)
        </p>
        <button
          className="bg-gray-900 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-700 transition active:scale-95"
          onClick={() => alert("Módulo de criação de post abriria aqui!")}
          disabled
        >
          Postar
        </button>
      </div>
    </div>
  );
};
