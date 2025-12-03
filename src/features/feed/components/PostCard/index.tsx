import type { HUD } from "@/types";
import type { Post, User } from "@/types";
import React from "react";
import { CardContainer } from "@/global/components/CardContainer";
import { getThemeClasses } from "@/utils/themeHelpers";

interface PostCardProps {
  post: Post;
  author: User | null;
  hud: HUD;
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const PostCard: React.FC<PostCardProps> = ({ post, author, hud }) => {
  const theme = getThemeClasses(hud?.category || "GENERAL");
  const isCurated = post.isCurated;

  const hudName = hud?.nickname || `[HUD:${post.hudId}]`;
  const authorName = author?.name || `[Usuário:${post.authorId}]`;

  return (
    <CardContainer padding="large" className={`border-l-4 ${theme.border}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={
              author?.avatarUrl || "https://placehold.co/40x40/ccc/333?text=?"
            }
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover shadow-sm"
          />
          <div>
            <p className="font-bold text-gray-900">{authorName}</p>
            <p className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${theme.tagBg} ${theme.text}`}
        >
          {hudName} {hud?.emoji}
        </span>
      </div>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Imagem da postagem"
          className="w-full h-auto rounded-lg mb-4 shadow-md object-cover"
        />
      )}

      <p className="text-gray-800 text-md mb-4 leading-relaxed">
        {post.content}
      </p>

      <div className="flex justify-between items-center border-t pt-3">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition">
            <span>👍</span>
            <span className="font-semibold text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition">
            <span>💬</span>
            <span className="font-semibold text-sm">Comentar</span>
          </button>
        </div>

        {isCurated && (
          <span className="text-xs font-bold text-purple-600 flex items-center space-x-1">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Curadoria</span>
          </span>
        )}
      </div>
    </CardContainer>
  );
};
