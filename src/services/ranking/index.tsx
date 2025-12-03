import type { CourseRanking, User } from "@/types/identity"; // Importação unificada a partir de /types/index (Corrigido para garantir todos os campos)
import { MOCK_COURSES, MOCK_USERS_LIST } from "@/services/identity";

interface AllUsersContext {
  users: User[];
}

const calculateWeightedXP = (
  courseId: string,
  context: AllUsersContext
): CourseRanking => {
  const course = MOCK_COURSES.find((c) => c.id === courseId);
  if (!course) throw new Error(`Course ${courseId} not found.`);

  const members = context.users.filter((u) => u.courseId === courseId);
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

export const getFactionsRanking = (realUser?: User | null): CourseRanking[] => {
  let allUsers: User[] = [...MOCK_USERS_LIST];

  if (
    realUser &&
    realUser.id &&
    !MOCK_USERS_LIST.some((u) => u.id === realUser.id)
  ) {
    allUsers.push(realUser);
  }

  const context: AllUsersContext = { users: allUsers };

  const ranking = MOCK_COURSES.map((course) =>
    calculateWeightedXP(course.id, context)
  );

  return ranking.sort((a, b) => b.weightedScore - a.weightedScore);
};
