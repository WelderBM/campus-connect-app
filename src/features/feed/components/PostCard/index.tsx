import type { Post, User, HUD } from "@/types";
import { getThemeClasses } from "@/utils/themeHelpers";

interface PostCardProps {
  post: Post;
  author: User;
  hud: HUD;
}

export default function PostCard({ post, author, hud }: PostCardProps) {
  const themeClasses = getThemeClasses(hud.category);

  return (
    <article
      className={`
        relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200
        bg-white p-5 mb-4 border-l-4 ${themeClasses.border}
      `}
    >
      {/* --- CABEÇALHO --- */}
      <header className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <img
            src={author.avatarUrl}
            alt={author.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-100"
          />

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 text-sm">
                {author.name}
              </span>

              {/* Badge Moderador (Coroa 👑) */}
              {author.isModerator && (
                <span title="Moderador" className="text-xs cursor-help">
                  👑
                </span>
              )}
            </div>

            {/* Subtítulo / Localização Macro */}
            <span className="text-xs text-gray-400 font-medium">
              2h atrás • {hud.formalName}
            </span>
          </div>
        </div>

        {/* Badge Selo Dourado (Curadoria) */}
        {post.isCurated && (
          <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-yellow-200">
            Destaque Oficial
          </span>
        )}
      </header>

      {/* --- CONTEÚDO --- */}
      <div className="text-gray-600 text-sm leading-relaxed mb-4">
        {post.content}
      </div>

      {/* --- RODAPÉ --- */}
      <footer className="flex justify-between items-center border-t border-gray-50 pt-3 mt-2">
        {/* Tag do HUD (Cor Dinâmica Pastel) */}
        <div
          className={`
            inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-gray-700
            ${themeClasses.tagBg} 
          `}
        >
          <span>{hud.emoji}</span>
          <span>{hud.nickname}</span>
        </div>

        {/* Ações */}
        <div className="flex gap-4 text-xs font-medium text-gray-400">
          <button className="hover:text-red-500 transition-colors flex items-center gap-1">
            ❤️ {post.likes}
          </button>
          <button className="hover:text-blue-500 transition-colors">
            💬 Comentar
          </button>
        </div>
      </footer>
    </article>
  );
}
