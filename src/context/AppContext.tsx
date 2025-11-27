// src/context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, Post } from "../types";
import { api } from "../services/mockData";

interface AppContextType {
  currentUser: User | null;
  posts: Post[];
  isLoading: boolean;
  filterLevel: "GLOBAL" | "NATIONAL" | "INSTITUTION";
  setFilterLevel: (level: "GLOBAL" | "NATIONAL" | "INSTITUTION") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState<
    "GLOBAL" | "NATIONAL" | "INSTITUTION"
  >("INSTITUTION");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await api.getCurrentUser();
        const loadedPosts = await api.getPosts();

        setCurrentUser(user);
        setPosts(loadedPosts);

        // Define o filtro inicial baseado no perfil
        if (user.role === "ADVENTURER") {
          setFilterLevel("GLOBAL");
        } else {
          setFilterLevel("INSTITUTION");
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        posts,
        isLoading,
        filterLevel,
        setFilterLevel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
