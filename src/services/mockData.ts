import { universityFlag } from "@/globals/components/universityFlag";
import type {
  University,
  HUD,
  User,
  Post,
  Proposal,
  Group,
  Message,
  Course,
} from "../types";

export interface CourseRanking {
  course: Course;
  totalXP: number;
  activeUsers: number;
  weightedScore: number;
}

export const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    name: "Direito",
    shortName: "DIREITO",
    colorHex: "#E63946",
    universityId: "uni-1",
  },
  {
    id: "course-2",
    name: "Engenharia Civil",
    shortName: "ENGENHARIA",
    colorHex: "#457B9D",
    universityId: "uni-1",
  },
  {
    id: "course-3",
    name: "Medicina",
    shortName: "MEDICINA",
    colorHex: "#2A9D8F",
    universityId: "uni-1",
  },
  {
    id: "course-4",
    name: "Artes Visuais",
    shortName: "ARTES",
    colorHex: "#FFC300",
    universityId: "uni-1",
  },
  {
    id: "course-5",
    name: "Administração",
    shortName: "ADM",
    colorHex: "#A8DADC",
    universityId: "uni-1",
  },
];

// --- Usuário Atual (ATUALIZADO com courseId) ---
export const MOCK_CURRENT_USER: User = {
  id: "user-0",
  name: "Welder Barroso",
  role: "STUDENT",
  universityId: "uni-1",
  courseId: "course-2", // Agora Welder é da Engenharia Civil (course-2)
  isModerator: false,
  points: 730,
  avatarUrl: "https://placehold.co/100x100/99C2FF/FFFFFF?text=W.B",
};

// --- Lista de Usuários (MOCK_USERS_LIST) ---
export const MOCK_USERS_LIST: User[] = [
  {
    id: "user-1",
    name: "Carlos Líder",
    role: "STUDENT",
    universityId: "uni-1",
    courseId: "course-2", // Engenharia
    isModerator: true,
    points: 2100,
    avatarUrl: "https://placehold.co/100x100/A8DADC/1D3557?text=C.L",
  },
  {
    id: "user-2",
    name: "Sofia Aventureira",
    role: "ADVENTURER", // Aventureiro não tem curso, mas tem uniId
    universityId: "uni-1",
    courseId: "",
    isModerator: false,
    points: 1100,
    avatarUrl: "https://placehold.co/100x100/F4A261/1D3557?text=S.A",
  },
  {
    id: "user-3",
    name: "Pedro Calouro",
    role: "STUDENT",
    universityId: "uni-1",
    courseId: "course-1", // Direito
    isModerator: false,
    points: 50,
    avatarUrl: "https://placehold.co/100x100/E9C46A/1D3557?text=P.C",
  },
  // Adicionando mais usuários para simular facções
  {
    id: "user-4",
    name: "Ana",
    role: "STUDENT",
    universityId: "uni-1",
    courseId: "course-2",
    isModerator: false,
    points: 150,
    avatarUrl: "...",
  }, // Engenharia
  {
    id: "user-5",
    name: "Bia",
    role: "STUDENT",
    universityId: "uni-1",
    courseId: "course-1",
    isModerator: false,
    points: 1200,
    avatarUrl: "...",
  }, // Direito
  {
    id: "user-6",
    name: "Júlio",
    role: "STUDENT",
    universityId: "uni-1",
    courseId: "course-3",
    isModerator: false,
    points: 500,
    avatarUrl: "...",
  }, // Medicina
  {
    id: "user-7",
    name: "Lia",
    role: "STUDENT",
    universityId: "uni-1",
    courseId: "course-3",
    isModerator: false,
    points: 100,
    avatarUrl: "...",
  }, // Medicina
  // ... adicione mais usuários se necessário
];

// --- NOTA: As coordenadas são aproximadas ao centro do campus principal ---
export const MOCK_UNIVERSITIES_LIST: University[] = [
  // =========================================================================
  // REGIÃO NORTE (5 Universidades)
  // =========================================================================
  {
    id: "uni-1",
    name: "Universidade Federal de Roraima",
    shortName: "UFRR",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Roraima",
    centerCoordinates: [2.83328, -60.69378], // Coordenada validada por você
  },
  {
    id: "uni-2",
    name: "Universidade Federal do Pará",
    shortName: "UFPA",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Pará",
    centerCoordinates: [-1.4725, -48.4525], // Belém
  },
  {
    id: "uni-3",
    name: "Universidade Federal do Amazonas",
    shortName: "UFAM",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Amazonas",
    centerCoordinates: [-3.085, -60.012], // Manaus
  },
  {
    id: "uni-5",
    name: "Universidade Federal do Acre",
    shortName: "UFAC",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Acre",
    centerCoordinates: [-9.957, -67.868], // Rio Branco
  },
  {
    id: "uni-6",
    name: "Universidade Federal de Rondônia",
    shortName: "UNIR",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Rondônia",
    centerCoordinates: [-8.761, -63.903], // Porto Velho
  },

  // =========================================================================
  // REGIÃO NORDESTE (5 Universidades)
  // =========================================================================
  {
    id: "uni-4",
    name: "Universidade Federal da Bahia",
    shortName: "UFBA",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Bahia",
    centerCoordinates: [-13.004, -38.514], // Salvador
  },
  {
    id: "uni-7",
    name: "Universidade Federal de Pernambuco",
    shortName: "UFPE",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Pernambuco",
    centerCoordinates: [-8.0583, -34.904], // Recife
  },
  {
    id: "uni-8",
    name: "Universidade Federal do Ceará",
    shortName: "UFC",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Ceará",
    centerCoordinates: [-3.743, -38.579], // Fortaleza
  },
  {
    id: "uni-9",
    name: "Universidade Federal do Rio G. do Norte",
    shortName: "UFRN",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Rio Grande do Norte",
    centerCoordinates: [-5.836, -35.205], // Natal
  },
  {
    id: "uni-10",
    name: "Universidade Federal do Maranhão",
    shortName: "UFMA",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Maranhão",
    centerCoordinates: [-2.564, -44.3], // São Luís
  },

  // =========================================================================
  // REGIÃO CENTRO-OESTE (5 Universidades)
  // =========================================================================
  {
    id: "uni-11",
    name: "Universidade de Brasília",
    shortName: "UnB",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Distrito Federal",
    centerCoordinates: [-15.765, -47.87], // Brasília
  },
  {
    id: "uni-12",
    name: "Universidade Federal de Goiás",
    shortName: "UFG",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Goiás",
    centerCoordinates: [-16.6, -49.26], // Goiânia
  },
  {
    id: "uni-13",
    name: "Universidade Federal de Mato Grosso",
    shortName: "UFMT",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Mato Grosso",
    centerCoordinates: [-15.6, -56.09], // Cuiabá
  },
  {
    id: "uni-14",
    name: "Universidade Federal de Mato Grosso do Sul",
    shortName: "UFMS",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Mato Grosso do Sul",
    centerCoordinates: [-20.51, -54.6], // Campo Grande
  },
  {
    id: "uni-15",
    name: "Universidade Federal de Catalão",
    shortName: "UFCat",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Goiás",
    centerCoordinates: [-18.169, -47.935], // Catalão
  },

  // =========================================================================
  // REGIÃO SUDESTE (5 Universidades)
  // =========================================================================
  {
    id: "uni-16",
    name: "Universidade de São Paulo",
    shortName: "USP",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "São Paulo",
    centerCoordinates: [-23.55, -46.634], // São Paulo
  },
  {
    id: "uni-17",
    name: "Universidade Federal do Rio de Janeiro",
    shortName: "UFRJ",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Rio de Janeiro",
    centerCoordinates: [-22.853, -43.22], // Rio de Janeiro
  },
  {
    id: "uni-18",
    name: "Universidade Federal de Minas Gerais",
    shortName: "UFMG",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Minas Gerais",
    centerCoordinates: [-19.854, -43.955], // Belo Horizonte
  },
  {
    id: "uni-19",
    name: "Universidade Estadual de Campinas",
    shortName: "UNICAMP",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "São Paulo",
    centerCoordinates: [-22.815, -47.07], // Campinas
  },
  {
    id: "uni-20",
    name: "Universidade Federal do Espírito Santo",
    shortName: "UFES",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Espírito Santo",
    centerCoordinates: [-20.315, -40.3], // Vitória
  },

  // =========================================================================
  // REGIÃO SUL (5 Universidades)
  // =========================================================================
  {
    id: "uni-21",
    name: "Universidade Federal do Rio Grande do Sul",
    shortName: "UFRGS",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Rio Grande do Sul",
    centerCoordinates: [-30.03, -51.215], // Porto Alegre
  },
  {
    id: "uni-22",
    name: "Universidade Federal de Santa Catarina",
    shortName: "UFSC",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Santa Catarina",
    centerCoordinates: [-27.5945, -48.5477], // Florianópolis
  },
  {
    id: "uni-23",
    name: "Universidade Federal do Paraná",
    shortName: "UFPR",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Paraná",
    centerCoordinates: [-25.428, -49.273], // Curitiba
  },
  {
    id: "uni-24",
    name: "Universidade Estadual de Londrina",
    shortName: "UEL",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Paraná",
    centerCoordinates: [-23.31, -51.18], // Londrina
  },
  {
    id: "uni-25",
    name: "Universidade do Estado de Santa Catarina",
    shortName: "UDESC",
    countryFlag: universityFlag,
    continentColor: "#FADECB",
    state: "Santa Catarina",
    centerCoordinates: [-27.59, -48.56], // Florianópolis (UDESC)
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
  getRanking: async (): Promise<User[]> => {
    const sorted = [...MOCK_USERS_LIST].sort((a, b) => b.points - a.points);
    return new Promise((resolve) => setTimeout(() => resolve(sorted), 500));
  },
  getFactionsRanking: async (): Promise<CourseRanking[]> => {
    const ranking = MOCK_COURSES.map((course) =>
      calculateWeightedXP(course.id)
    );

    return ranking.sort((a, b) => b.weightedScore - a.weightedScore);
  },
};

const calculateWeightedXP = (courseId: string): CourseRanking => {
  const course = MOCK_COURSES.find((c) => c.id === courseId);
  if (!course) throw new Error(`Course ${courseId} not found.`);

  const allUsers = [...MOCK_USERS_LIST, MOCK_CURRENT_USER];

  const members = allUsers.filter((u) => u.courseId === courseId);
  const activeUsers = members.length;

  const totalXP = members.reduce((sum, user) => sum + (user.points || 0), 0);

  if (activeUsers === 0) {
    return { course, totalXP: 0, activeUsers: 0, weightedScore: 0 };
  }

  const averageXP = totalXP / activeUsers;
  const participationFactor = 1 + activeUsers / 100;

  const weightedScore = averageXP * participationFactor;

  return { course, totalXP, activeUsers, weightedScore };
};
