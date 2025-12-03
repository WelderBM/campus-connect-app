import type { JSX } from "react";

export const THEME_COLORS = {
  ACADEMIC: {
    primary: "#A8DADC",
    secondary: "#457B9D",
    label: "Acadêmico",
  },
  SERVICE: {
    primary: "#C7E8CA",
    secondary: "#2A9D8F",
    label: "Serviço",
  },
  LEISURE: {
    primary: "#FADECB",
    secondary: "#E76F51",
    label: "Lazer",
  },
  SPORTS: { primary: "#D3D3D3", secondary: "#555555", label: "Esportes" },
  GENERAL: { primary: "#EFEFEF", secondary: "#AAAAAA", label: "Geral" },
} as const;

export type ThemeKey = keyof typeof THEME_COLORS;

export type Coordinates = [number, number];
export type PolygonCoordinates = Coordinates[];

export interface University {
  id: string;
  name: string;
  shortName: string;
  countryFlag: JSX.Element;
  continentColor: string;
  backgroundImage?: string;
  state: string;
  centerCoordinates: Coordinates;
  proximityRadiusKm: number;
}

export interface HUD {
  id: string;
  universityId: string;
  formalName: string;
  nickname: string;
  emoji: string;
  category: ThemeKey;
  polygonCoordinates: PolygonCoordinates;
  description: string;
}

export type UserRole = "STUDENT" | "MODERATOR" | "ADVENTURER";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  universityId: string;
  courseId?: string;
  isModerator: boolean;
  points: number;
  avatarUrl: string;
}

export interface Course {
  id: string;
  name: string;
  shortName: string;
  colorHex: string;
  universityId: string;
}

export interface CourseRanking {
  course: Course;
  totalXP: number;
  activeUsers: number;
  weightedScore: number;
}

export interface Post {
  id: string;
  authorId: string;
  hudId: string;
  universityId: string;
  content: string;
  imageUrl?: string;
  likes: number;
  isCurated: boolean;
  createdAt: number;
}

export interface Proposal {
  id: string;
  authorId: string;
  type: "NEW_HUD" | "NEW_RULE";
  title: string;
  description: string;
  targetCategory: ThemeKey;
  votesFor: number;
  votesAgainst: number;
  expiresAt: string;
  createdAt: number;
}

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
  isPrivate: boolean;
  lastMessagePreview: string;
  lastActive: string;
}

export interface Message {
  id: string;
  groupId: string;
  authorId: string;
  content: string;
  timestamp: number;
}
