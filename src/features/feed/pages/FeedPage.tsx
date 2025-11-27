import React from "react";
import { useAppContext } from "@/context/AppContext";
import FilterBar from "../components/FilterBar";
import PostCard from "../components/PostCard";
import { MOCK_HUDS } from "@/services/mockData";
import type { Post } from "@/types";

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-gray-200 animate-pulse"
      >
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    ))}
  </div>
);

export const FeedPage: React.FC = () => {
  const { posts, isLoading, currentUser, filterLevel } = useAppContext();

  if (isLoading || !currentUser) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Carregando Sala de Convivência...
        </h2>
        <LoadingSkeleton />
      </div>
    );
  }

  const filteredPosts = posts.filter((post) => {
    if (filterLevel === "GLOBAL") return true;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Sala de Convivência
        </h1>

        <FilterBar />

        {/* Renderiza os Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post: Post) => {
            const hud = MOCK_HUDS.find((h) => h.id === post.hudId);

            return (
              <PostCard
                key={post.id}
                post={post}
                author={currentUser}
                hud={hud!}
              />
            );
          })}

          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              Nenhum post encontrado no nível {filterLevel}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
