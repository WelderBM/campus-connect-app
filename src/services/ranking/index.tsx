import type { CourseRanking } from "@/types/identity";
import { MOCK_COURSES, MOCK_CURRENT_USER, MOCK_USERS_LIST } from "../identity";

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

export const getAlliancesRanking = (): CourseRanking[] => {
  const ranking = MOCK_COURSES.map((course) => calculateWeightedXP(course.id));

  return ranking.sort((a, b) => b.weightedScore - a.weightedScore);
};
