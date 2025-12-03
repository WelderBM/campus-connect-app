import type {
  CourseRanking,
  Post,
  Proposal,
  Group,
  Message,
  User,
} from "@/types/identity";
import {
  MOCK_PROPOSALS,
  MOCK_GROUPS,
  MOCK_HUDS,
  MOCK_MESSAGES,
  MOCK_POSTS,
} from "../geo";
import { MOCK_USERS_LIST } from "../identity";
import type { HUD } from "@/types/geo";
import { getAlliancesRanking } from "../ranking";

export const api = {
  getPosts: async (): Promise<Post[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_POSTS), 800));
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
  getAlliancesRanking: async (): Promise<CourseRanking[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(getAlliancesRanking()), 500)
    );
  },
};
