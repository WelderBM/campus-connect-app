import type { University, HUD, User, Post } from "../types";

export const MOCK_UNIVERSITY: University = {
  id: "uni-1",
  name: "Universidade de São Paulo (USP)",
  shortName: "USP",
  countryFlag: "🇧🇷",
  continentColor: "#FADECB",
  backgroundImage:
    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
};

export const MOCK_HUDS: HUD[] = [
  {
    id: "hud-1",
    universityId: "uni-1",
    formalName: "Biblioteca Central",
    nickname: "A Toca",
    emoji: "📘",
    category: "ACADEMIC",
    coordinates: { lat: -23.5505, lng: -46.6333 },
    activeUsers: 42,
  },
  {
    id: "hud-2",
    universityId: "uni-1",
    formalName: "Ginásio de Esportes",
    nickname: "O Coliseu",
    emoji: "⚽",
    category: "LEISURE",
    coordinates: { lat: -23.552, lng: -46.635 },
    activeUsers: 15,
  },
  {
    id: "hud-3",
    universityId: "uni-1",
    formalName: "Restaurante Universitário",
    nickname: "Bandejão",
    emoji: "🍔",
    category: "SERVICE",
    coordinates: { lat: -23.551, lng: -46.634 },
    activeUsers: 120,
  },
];

export const MOCK_CURRENT_USER: User = {
  id: "user-1",
  name: "Alice Dev",
  role: "STUDENT",
  universityId: "uni-1",
  isModerator: true,
  points: 1250,
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
};

export const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    authorId: "user-1",
    hudId: "hud-2",
    content: "Campeonato de Vôlei hoje às 18h! Faltam 2 times. Quem anima?",
    likes: 24,
    isCurated: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "post-2",
    authorId: "admin-uni",
    hudId: "hud-1",
    content: "⚠️ Manutenção no sistema da biblioteca das 14h às 16h.",
    likes: 150,
    isCurated: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const api = {
  getPosts: async (): Promise<Post[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_POSTS), 800));
  },
  getCurrentUser: async (): Promise<User> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_CURRENT_USER), 500)
    );
  },
  getHUDs: async (): Promise<HUD[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_HUDS), 600));
  },
};
