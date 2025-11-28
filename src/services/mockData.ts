import { universityFlag } from "@/globals/components/universityFlag";
import type {
  University,
  HUD,
  User,
  Post,
  Proposal,
  Group,
  Message,
} from "../types";

export const MOCK_UNIVERSITIES_LIST: University[] = [
  {
    id: "uni-1",
    name: "Universidade Federal RR",
    shortName: "UFRR",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Roraima",
  },
  {
    id: "uni-2",
    name: "Universidade Federal do Pará",
    shortName: "UFPA",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Pará",
  },
  {
    id: "uni-3",
    name: "Universidade Federal do Amazonas",
    shortName: "UFAM",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Amazonas",
  },
  {
    id: "uni-5",
    name: "Universidade Federal do Acre",
    shortName: "UFAC",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Acre",
  },
  {
    id: "uni-6",
    name: "Universidade Federal de Rondônia",
    shortName: "UNIR",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Rondônia",
  },

  {
    id: "uni-4",
    name: "Universidade Federal da Bahia",
    shortName: "UFBA",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Bahia",
  },
  {
    id: "uni-7",
    name: "Universidade Federal de Pernambuco",
    shortName: "UFPE",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Pernambuco",
  },
  {
    id: "uni-8",
    name: "Universidade Federal do Ceará",
    shortName: "UFC",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Ceará",
  },
  {
    id: "uni-9",
    name: "Universidade Federal do Rio G. do Norte",
    shortName: "UFRN",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Rio Grande do Norte",
  },
  {
    id: "uni-10",
    name: "Universidade Federal do Maranhão",
    shortName: "UFMA",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Maranhão",
  },

  {
    id: "uni-11",
    name: "Universidade deuniversityFlagsília",
    shortName: "UnB",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Distrito Federal",
  },
  {
    id: "uni-12",
    name: "Universidade Federal de Goiás",
    shortName: "UFG",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Goiás",
  },
  {
    id: "uni-13",
    name: "Universidade Federal de Mato Grosso",
    shortName: "UFMT",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Mato Grosso",
  },
  {
    id: "uni-14",
    name: "Universidade Federal de Mato Grosso do Sul",
    shortName: "UFMS",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Mato Grosso do Sul",
  },
  {
    id: "uni-15",
    name: "Universidade Federal de Jataí",
    shortName: "UFJ",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Goiás",
  },

  {
    id: "uni-16",
    name: "Universidade de São Paulo",
    shortName: "USP",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "São Paulo",
  },
  {
    id: "uni-17",
    name: "Universidade Federal do Rio de Janeiro",
    shortName: "UFRJ",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Rio de Janeiro",
  },
  {
    id: "uni-18",
    name: "Universidade Federal de Minas Gerais",
    shortName: "UFMG",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Minas Gerais",
  },
  {
    id: "uni-19",
    name: "Universidade Estadual de Campinas",
    shortName: "UNICAMP",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "São Paulo",
  },
  {
    id: "uni-20",
    name: "Universidade Federal do Espírito Santo",
    shortName: "UFES",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Espírito Santo",
  },

  {
    id: "uni-21",
    name: "Universidade Federal do Rio Grande do Sul",
    shortName: "UFRGS",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Rio Grande do Sul",
  },
  {
    id: "uni-22",
    name: "Universidade Federal de Santa Catarina",
    shortName: "UFSC",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Santa Catarina",
  },
  {
    id: "uni-23",
    name: "Universidade Federal do Paraná",
    shortName: "UFPR",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Paraná",
  },
  {
    id: "uni-24",
    name: "Universidade Estadual de Londrina",
    shortName: "UEL",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Paraná",
  },
  {
    id: "uni-25",
    name: "Universidade do Estado de Santa Catarina",
    shortName: "UDESC",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Santa Catarina",
  },
];

export const MOCK_UNIVERSITY: University = MOCK_UNIVERSITIES_LIST[0];

export const MOCK_HUDS: HUD[] = [
  {
    id: "hud-1",
    universityId: "uni-1",
    formalName: "Bloco VI - Centro de Ciências e Tecnologia",
    nickname: "CCT - O Nó Acadêmico",
    emoji: "🧪",
    category: "ACADEMIC",
    activeUsers: 42,
    polygonCoordinates: [
      [2.834, -60.6948],
      [2.8343, -60.6945],
      [2.8341, -60.694],
      [2.8338, -60.6943],
    ],
  },
  {
    id: "hud-2",
    universityId: "uni-1",
    formalName: "Ginásio da UFRR",
    nickname: "Arena da Fronteira",
    emoji: "⚽",
    category: "LEISURE",
    activeUsers: 15,
    polygonCoordinates: [
      [2.833, -60.6925],
      [2.8332, -60.6922],
      [2.833, -60.6918],
      [2.8328, -60.6921],
    ],
  },
  {
    id: "hud-3",
    universityId: "uni-1",
    formalName: "Restaurante Universitário",
    nickname: "RU do Norte",
    emoji: "🍚",
    category: "SERVICE",
    activeUsers: 120,
    polygonCoordinates: [
      [2.831, -60.694],
      [2.8313, -60.6943],
      [2.8311, -60.6938],
      [2.8308, -60.6941],
    ],
  },
  {
    id: "hud-4",
    universityId: "uni-2",
    formalName: "Auditório Principal",
    nickname: "A Tenda Grande",
    emoji: "🎤",
    category: "ACADEMIC",
    activeUsers: 15,
    polygonCoordinates: [
      [-1.472, -48.452],
      [-1.4725, -48.4525],
      [-1.473, -48.4515],
    ],
  },
  {
    id: "hud-5",
    universityId: "uni-16",
    formalName: "Faculdade de Direito",
    nickname: "O Prédio Histórico",
    emoji: "⚖️",
    category: "ACADEMIC",
    activeUsers: 200,
    polygonCoordinates: [
      [-23.55, -46.634],
      [-23.5505, -46.6345],
      [-23.551, -46.6335],
    ],
  },
  {
    id: "hud-6",
    universityId: "uni-21",
    formalName: "Centro de Eventos",
    nickname: "O Gigantinho",
    emoji: "🏟️",
    category: "LEISURE",
    activeUsers: 80,
    polygonCoordinates: [
      [-30.03, -51.215],
      [-30.0305, -51.2155],
      [-30.031, -51.2145],
    ],
  },
];

export const MOCK_CURRENT_USER: User = {
  id: "user-1",
  name: "Welder Barroso",
  role: "STUDENT",
  universityId: "uni-1",
  isModerator: true,
  points: 1250,
  avatarUrl:
    "https://avatars.githubusercontent.com/u/92405076?s=400&u=0366f7310c583e788c69059cb969fab7d1562270&v=4",
};

export const MOCK_OTHER_USER: User = {
  id: "user-2",
  name: "Bia Amiga",
  role: "STUDENT",
  universityId: "uni-1",
  isModerator: false,
  points: 850,
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bia",
};

export const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-1",
    groupId: "group-1",
    authorId: "user-2",
    content: "Pessoal, o treino de vôlei está mantido para hoje? Chego às 18h!",
    timestamp: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: "msg-2",
    groupId: "group-1",
    authorId: "user-1",
    content:
      "Sim, confirmado! Já estou no campus. Vemos quem está no Geo-Hub 😉",
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    authorId: "user-1",
    hudId: "hud-2",
    content:
      "Treino de futebol de campo hoje na Arena da Fronteira! Quem traz o tererê? 🧉",
    likes: 24,
    isCurated: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "post-2",
    authorId: "user-2",
    hudId: "hud-3",
    content:
      "O Bandejão do Norte está servindo tambaqui na chapa hoje! Fila está grande?",
    likes: 88,
    isCurated: false,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "post-3",
    authorId: "user-1",
    hudId: "hud-1",
    content:
      "Preciso de ajuda com a disciplina de Direito Indígena. Alguém no Casarão agora?",
    likes: 12,
    isCurated: false,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },

  {
    id: "post-4",
    authorId: "admin-ufmg",
    hudId: "hud-5",
    content:
      "USP: Seminário sobre novas tecnologias em IA. Transmissão no auditório da Direito ⚖️",
    likes: 150,
    isCurated: true,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "post-5",
    authorId: "admin-ufpa",
    hudId: "hud-4",
    content:
      "UFPA: Chamada para o Congresso de Estudos Amazônicos. Inscrições abertas!",
    likes: 350,
    isCurated: true,
    createdAt: new Date(Date.now() - 2400000).toISOString(),
  },

  {
    id: "post-6",
    authorId: "user-ufsc",
    hudId: "hud-22",
    content: "UFSC: Surf hoje cancelado! O vento virou. 🌊",
    likes: 50,
    isCurated: false,
    createdAt: new Date(Date.now() - 5400000).toISOString(),
  },
  {
    id: "post-7",
    authorId: "user-unb",
    hudId: "hud-11",
    content:
      "UnB: Almoço grátis para quem participar do mutirão de limpeza do lago. Horário: 13h.",
    likes: 90,
    isCurated: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "post-8",
    authorId: "global-admin",
    hudId: "hud-1",
    content:
      "UFRR: Convocação para Simpósio Internacional de Geopolítica de Fronteiras. (Selo oficial)",
    likes: 800,
    isCurated: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "post-9",
    authorId: "user-ufrgs",
    hudId: "hud-21",
    content:
      "UFRGS: Faltam 30 minutos para o show de rock beneficente no Gigantinho!",
    likes: 120,
    isCurated: false,
    createdAt: new Date(Date.now() - 1200000).toISOString(),
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
  getMessagesByGroup: async (groupId: string): Promise<Message[]> => {
    const filtered = MOCK_MESSAGES.filter((m) => m.groupId === groupId);
    return new Promise((resolve) => setTimeout(() => resolve(filtered), 200));
  },
};
