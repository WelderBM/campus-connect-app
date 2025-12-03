import React from "react";
import { useAppContext } from "@/context/AppContext";
import FilterBar from "./components/FilterBar";
import PostCard from "./components/PostCard";
import type { Post } from "@/types/identity";
import { MOCK_HUDS, MOCK_UNIVERSITY } from "@/services/geo";
import { PostInputBar } from "./components/PostImputBar";
import { CardContainer } from "@/globals/components/cardContainer";

const universityFlag = (
  <span role="img" aria-label="Brazil Flag">
    🇧🇷
  </span>
);

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

const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    authorId: "user-0",
    hudId: "hud-1",
    content: "Primeiro post mockado!",
    likes: 5,
    isCurated: false,
    createdAt: new Date().toISOString(),
  } as Post,
  {
    id: "p2",
    authorId: "user-1",
    hudId: "hud-1",
    content: "Post Curado Globalmente.",
    likes: 100,
    isCurated: true,
    createdAt: new Date().toISOString(),
  } as Post,
];

export const FeedPage: React.FC = () => {
  const { currentUser, filterLevel, isAuthReady } = useAppContext();

  if (!isAuthReady) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Carregando Sala de Convivência...
        </h2>
        <LoadingSkeleton />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="p-10 text-center text-xl text-red-600">
        Acesso negado. Por favor, faça login novamente.
      </div>
    );
  }

  const USER_UNI_ID = currentUser.universityId;
  const USER_COUNTRY_FLAG = MOCK_UNIVERSITY.countryFlag;

  const filteredPosts = MOCK_POSTS.filter((post) => {
    const postHud = MOCK_HUDS.find((h) => h.id === post.hudId);
    if (!postHud) return false;

    switch (filterLevel) {
      case "GLOBAL":
        // Filtro GLOBAL: Apenas posts curados (oficiais)
        return post.isCurated;

      case "NATIONAL":
        return true;

      case "INSTITUTION":
        return postHud.universityId === USER_UNI_ID;

      default:
        return true;
    }
  });

  return (
    <CardContainer padding="none">
      <div className="sticky top-0 z-40 bg-gray-50 pt-3 pb-3 shadow-md border-b border-gray-200 px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Sala de Convivência
        </h1>
        <FilterBar />
      </div>
      <div>
        <div className="p-4 space-y-4">
          {" "}
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
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 z-50 lg:max-w-md">
        <PostInputBar />
      </div>
    </CardContainer>
  );
};
