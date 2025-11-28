import type { University, HUD, User, Post, Proposal, Group } from "../types";

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

export const MOCK_PROPOSALS: Proposal[] = [
  {
    id: "prop-1",
    authorId: "user-2",
    type: "NEW_HUD",
    title: 'Mapear o "Jardim dos Gatos"',
    description:
      "Área verde atrás do bloco C onde o pessoal descansa. Categoria Lazer.",
    targetCategory: "LEISURE",
    votesFor: 45,
    votesAgainst: 2,
    expiresAt: new Date(Date.now() + 86400000 * 2).toISOString(),
  },
  {
    id: "prop-2",
    authorId: "user-3",
    type: "NEW_HUD",
    title: "Sala de Estudos 24h",
    description: "Transformar a sala 402 em HUD oficial de Estudo Noturno.",
    targetCategory: "ACADEMIC",
    votesFor: 120,
    votesAgainst: 5,
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
  },
];

export const MOCK_GROUPS: Group[] = [
  {
    id: "group-1",
    name: "A Galera do Vôlei 🏐",
    memberIds: ["user-1", "user-4", "user-5"], // Alice está aqui
    isPrivate: true,
    lastMessagePreview: "Amanhã tem jogo às 18h no Coliseu!",
    lastActive: new Date().toISOString(),
  },
  {
    id: "group-2",
    name: "TCC - Grupo de Estudo",
    memberIds: ["user-1", "user-6"],
    isPrivate: false,
    lastMessagePreview: "Reunião no Canal de Áudio às 20h.",
    lastActive: new Date(Date.now() - 3600000).toISOString(),
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
  getProposals: async (): Promise<Proposal[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_PROPOSALS), 600)
    );
  },
  getGroups: async (): Promise<Group[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_GROUPS), 300)
    );
  },
};
