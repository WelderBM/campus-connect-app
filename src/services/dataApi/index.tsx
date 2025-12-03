import type { CourseRanking, User } from "@/types/identity";
import { MOCK_USERS_LIST } from "../mocks/identity";
import { getFactionsRanking } from "../mocks/ranking";

export const api = {
  getRanking: async (): Promise<User[]> => {
    const sorted = [...MOCK_USERS_LIST].sort((a, b) => b.points - a.points);
    return new Promise((resolve) => setTimeout(() => resolve(sorted), 500));
  },

  getFactionsRanking: async (
    currentUser: User | null
  ): Promise<CourseRanking[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(getFactionsRanking(currentUser)), 500)
    );
  },
};
