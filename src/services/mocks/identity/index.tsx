import type { User, Course, Group, Message } from "@/types/identity";

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
];

export const MOCK_USERS_LIST: User[] = [
  {
    id: "user-1",
    name: "Aline Pereira",
    role: "STUDENT",
    universityId: "uni-1",
    courseId: "course-1",
    isModerator: false,
    points: 1200,
    avatarUrl: "https://placehold.co/100x100/FFC300/1D3557?text=AP",
  },
  {
    id: "user-2",
    name: "Bruno Costa",
    role: "STUDENT",
    universityId: "uni-1",
    courseId: "course-2",
    isModerator: false,
    points: 950,
    avatarUrl: "https://placehold.co/100x100/E76F51/1D3557?text=BC",
  },
  {
    id: "user-3",
    name: "Camila Dias",
    role: "STUDENT",
    universityId: "uni-1",
    courseId: "course-2",
    isModerator: true,
    points: 3500,
    avatarUrl: "https://placehold.co/100x100/F4A261/1D3557?text=CD",
  },
];

export const MOCK_GROUPS: Group[] = [
  {
    id: "group-1",
    name: "Clube de Investimentos",
    memberIds: ["user-1", "user-3"],
    isPrivate: false,
    lastMessagePreview: "Aline: Não se esqueçam do webinar amanhã!",
    lastActive: new Date().toISOString(),
  },
  {
    id: "group-2",
    name: "Eng. Civil - 2024",
    memberIds: ["user-2", "user-3"],
    isPrivate: true,
    lastMessagePreview: "Bruno: Alguém tem os slides de Geotecnia?",
    lastActive: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: "msg1",
    groupId: "group-1",
    authorId: "user-1",
    content: "Olá a todos! Como vão os estudos?",
    timestamp: Date.now() - 100000,
  },
  {
    id: "msg2",
    groupId: "group-1",
    authorId: "user-3",
    content: "Tudo ótimo, focado no projeto de iniciação.",
    timestamp: Date.now() - 50000,
  },
];
