import React from "react";
import { useAppContext } from "@/context/AppContext";
import FilterBar from "./components/FilterBar";
import PostCard from "./components/PostCard";
import { MOCK_HUDS, MOCK_UNIVERSITY } from "@/services/mockData";
import type { Post } from "@/types";
import { universityFlag } from "@/globals/components/universityFlag";
import { PostInputBar } from "./components/PostImputBar";

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

  const USER_UNI_ID = "uni-1";
  const USER_COUNTRY_FLAG = universityFlag;

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
    const postHud = MOCK_HUDS.find((h) => h.id === post.hudId);
    if (!postHud) return false;

    switch (filterLevel) {
      case "GLOBAL":
        return post.isCurated;

      case "NATIONAL":
        return MOCK_UNIVERSITY.countryFlag === USER_COUNTRY_FLAG;

      case "INSTITUTION":
        return postHud.universityId === USER_UNI_ID;

      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Sala de Convivência
        </h1>

        <FilterBar />
        <PostInputBar />

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
