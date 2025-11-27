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
} as const;

export type ThemeKey = keyof typeof THEME_COLORS;

export interface University {
  id: string;
  name: string;
  shortName: string;
  countryFlag: string;
  continentColor: string;
  backgroundImage?: string;
}

export interface HUD {
  id: string;
  universityId: string;
  formalName: string;
  nickname: string;
  emoji: string;
  category: ThemeKey;

  coordinates: { lat: number; lng: number };
  activeUsers: number;
}

export type UserRole = "ADVENTURER" | "STUDENT";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;

  universityId?: string;
  isModerator?: boolean;
  currentHudId?: string | null;

  points: number;
}

export interface Post {
  id: string;
  authorId: string;
  hudId: string;

  content: string;
  imageUrl?: string;

  likes: number;
  isCurated: boolean;
  createdAt: string;
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
}
