import { ThemeKey } from "./theme";

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
