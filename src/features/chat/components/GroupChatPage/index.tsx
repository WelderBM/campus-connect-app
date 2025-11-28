import React, { useEffect, useState } from "react";
import { api } from "@/services/mockData";
import type { Group } from "@/types";
import { Link } from "react-router-dom";

export const ChatHubPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getGroups().then((data) => {
      setGroups(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mensagens e Grupos</h1>
        <p className="text-gray-500 text-sm mt-1">
          Comunicação persistente entre amigos e colegas.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {isLoading ? (
          <div className="p-10 text-center text-gray-500">
            Carregando seus grupos...
          </div>
        ) : (
          <div className="space-y-3">
            {groups.map((group) => (
              <Link
                to={`/chat/${group.id}`}
                key={group.id}
                className="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {group.isPrivate ? "🔒" : "📚"} {group.name}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {group.isPrivate ? "Privado" : "Público"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1 truncate">
                  {group.lastMessagePreview}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <button
        className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition active:scale-90 z-40 flex items-center justify-center w-14 h-14"
        title="Iniciar Novo Chat"
        onClick={() => alert("Módulo de criação de chat")}
      >
        <span className="text-2xl">💬</span>
      </button>
    </div>
  );
};
