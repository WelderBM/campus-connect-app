import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { getThemeClasses } from "@/utils/themeHelpers";
import PostCard from "@/features/feed/components/PostCard/index";
import { MOCK_HUDS, MOCK_POSTS } from "@/services/geo";

export const HudPage: React.FC = () => {
  const { currentUser } = useAppContext();

  const { hudId } = useParams();
  const hud = MOCK_HUDS.find((h) => h.id === hudId);

  if (!hud) {
    return <div className="p-10 text-center">HUD não encontrado 😢</div>;
  }

  const theme = getThemeClasses(hud.category);

  const localPosts = MOCK_POSTS.filter((post) => post.hudId === hud.id);

  return (
    <div className="h-full bg-gray-50 pb-24">
      {" "}
      <div
        className={`${theme.bg} ${theme.border} border-b-4 p-6 shadow-sm sticky top-16 z-10`}
      >
        <Link
          to="/"
          className="text-sm text-gray-500 mb-4 block hover:underline flex items-center gap-1"
        >
          <span>⬅️</span> Voltar para o Início
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-4xl filter drop-shadow-md">{hud.emoji}</span>
          <div>
            <h1 className={`text-2xl font-bold ${theme.text}`}>
              {hud.nickname}
            </h1>
            <p className="text-gray-600 text-sm font-medium">
              {hud.formalName}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4 max-w-3xl mx-auto">
        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-100">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.tagBg}`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${theme.tagBg}`}
              ></span>
            </span>
            <span className="text-gray-600 font-medium text-sm">
              Ao vivo agora:
            </span>
          </div>
          <span className={`text-xl font-bold ${theme.text}`}>
            {hud.activeUsers} pessoas
          </span>
        </div>

        <button
          className={`
            w-full py-4 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all
            flex justify-center items-center gap-2 text-lg
            ${theme.tagBg} hover:opacity-90 
          `}
          onClick={() => alert(`Ação para ${hud.category} em desenvolvimento!`)}
        >
          {hud.category === "ACADEMIC" && (
            <span>🔇 Entrar no Modo Silêncio</span>
          )}
          {hud.category === "LEISURE" && <span>⚽ Criar Partida Agora</span>}
          {hud.category === "SERVICE" && <span>🍽️ Ver Cardápio do Dia</span>}
        </button>

        <hr className="border-gray-200 my-6" />
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-4 px-1">
            Acontecendo aqui
          </h3>

          {localPosts.length > 0 ? (
            <div className="space-y-4">
              {localPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  author={currentUser}
                  hud={hud}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-400 mb-2">
                Nada postado aqui recentemente.
              </p>
              <button className="text-blue-500 font-semibold text-sm">
                Seja o primeiro a postar!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
