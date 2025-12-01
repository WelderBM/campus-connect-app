import {
  MOCK_USERS_LIST,
  MOCK_CURRENT_USER,
  MOCK_COURSES,
} from "./mocks/userMocks";
import {
  MOCK_POSTS,
  MOCK_HUDS,
  MOCK_GROUPS,
  MOCK_PROPOSALS,
  MOCK_MESSAGES,
} from "./mocks/geoSocialMocks";
import { getFactionsRanking } from "./dataApi/ranking";
import {
  User,
  HUD,
  Post,
  Group,
  Proposal,
  Message,
  CourseRanking,
} from "../types";

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
    return new Promise((resolve) =>
      setTimeout(() => resolve(getFactionsRanking()), 500)
    );
  },
};
