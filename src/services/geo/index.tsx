import type { HUD, University } from "@/types/geo";
import type { Group, Message, Post, Proposal } from "@/types/identity";
import type { ThemeKey } from "@/types/themes";
import type { JSX } from "react";

const BrazilFlag: JSX.Element = (
  <span role="img" aria-label="Bandeira do Brasil">
    🇧🇷
  </span>
);

export const MOCK_UNIVERSITIES_LIST: University[] = [
  {
    id: "uni-1",
    name: "Universidade Federal de Roraima",
    shortName: "UFRR",
    countryFlag: BrazilFlag,
    continentColor: "#FADECB",
    state: "Roraima",
    centerCoordinates: [2.83328, -60.69378],
    proximityRadiusKm: 10,
    backgroundImage: "https://placehold.co/1920x1080/FADECB/1D3557",
  },
  {
    id: "uni-2",
    name: "Universidade Federal do Pará",
    shortName: "UFPA",
    countryFlag: BrazilFlag,
    continentColor: "#FADECB",
    state: "Pará",
    centerCoordinates: [-1.4725, -48.4525],
    proximityRadiusKm: 10,
    backgroundImage: "https://placehold.co/1920x1080/FADECB/1D3557",
  },
  {
    id: "uni-3",
    name: "Universidade Federal do Amazonas",
    shortName: "UFAM",
    countryFlag: BrazilFlag,
    continentColor: "#FADECB",
    state: "Amazonas",
    centerCoordinates: [-3.085, -60.012],
    proximityRadiusKm: 10,
    backgroundImage: "https://placehold.co/1920x1080/FADECB/1D3557",
  },
  {
    id: "uni-16",
    name: "Universidade de São Paulo",
    shortName: "USP",
    countryFlag: BrazilFlag,
    continentColor: "#FADECB",
    state: "São Paulo",
    centerCoordinates: [-23.55, -46.634],
    proximityRadiusKm: 10,
    backgroundImage: "https://placehold.co/1920x1080/FADECB/1D3557",
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
    id: "post-8",
    authorId: "global-admin",
    hudId: "hud-1",
    content:
      "UFRR: Convocação para Simpósio Internacional de Geopolítica de Fronteiras. (Selo oficial)",
    likes: 800,
    isCurated: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
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
    targetCategory: "LEISURE" as ThemeKey,
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
    targetCategory: "ACADEMIC" as ThemeKey,
    votesFor: 120,
    votesAgainst: 5,
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
  },
];

export const MOCK_GROUPS: Group[] = [
  {
    id: "group-1",
    name: "A Galera do Vôlei 🏐",
    memberIds: ["user-1", "user-4", "user-5"],
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

export const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-1",
    groupId: "group-1",
    authorId: "user-2",
    content: "Pessoal, o treino de vôlei está mantido para hoje? Chego às 18h!",
    timestamp: Date.now() - 600000,
  },
  {
    id: "msg-2",
    groupId: "group-1",
    authorId: "user-1",
    content:
      "Sim, confirmado! Já estou no campus. Vemos quem está no Geo-Hub 😉",
    timestamp: Date.now() - 300000,
  },
];
