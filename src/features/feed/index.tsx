import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import FilterBar from "./components/FilterBar";
import PostCard from "./components/PostCard";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import type { Post } from "@/types/identity";
import { CardContainer } from "@/global/components/cardContainer";
import { PostInputBar } from "./components/PostImputBar";

declare const __app_id: string;
declare const __firebase_config: string;

const app = initializeApp(
  JSON.parse(
    typeof __firebase_config !== "undefined" ? __firebase_config : "{}"
  )
);
const db = getFirestore(app);

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
  const { currentUser, filterLevel, isAuthReady } = useAppContext();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthReady || !currentUser) return;

    const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
    const postsCollectionRef = collection(
      db,
      `artifacts/${appId}/public/data/posts`
    );
    let postsQuery;

    if (filterLevel === "GLOBAL") {
      postsQuery = query(
        postsCollectionRef,
        where("isCurated", "==", true),
        orderBy("createdAt", "desc")
      );
    } else if (filterLevel === "INSTITUTION") {
      postsQuery = query(
        postsCollectionRef,
        where("universityId", "==", currentUser.universityId),
        orderBy("createdAt", "desc")
      );
    } else {
      postsQuery = query(postsCollectionRef, orderBy("createdAt", "desc"));
    }

    setIsLoadingPosts(true);

    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        const postsData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Post)
        );

        setFilteredPosts(postsData);
        setIsLoadingPosts(false);
        setError(null);
      },
      (e) => {
        setError("Erro ao carregar feed em tempo real.");
        setIsLoadingPosts(false);
      }
    );

    return () => unsubscribe();
  }, [isAuthReady, currentUser, filterLevel]);

  if (!isAuthReady || isLoadingPosts) {
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
        Acesso negado. Por favor, faça login.
      </div>
    );
  }

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
          {filteredPosts.map((post: Post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                author={currentUser}
                hud={post.hudId as any}
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
