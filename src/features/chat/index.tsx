import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import type { Group, Message, User } from "@/types/identity";
import { MOCK_GROUPS } from "@/services/geo";
import { MOCK_USERS_LIST, MOCK_CURRENT_USER } from "@/services/identity";

const MOCK_ALL_USERS_MOCK = [...MOCK_USERS_LIST, MOCK_CURRENT_USER];

const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-1",
    groupId: "group-1",
    authorId: "user-0",
    content:
      "Bom dia! Alguém na Biblioteca central? Precisava de ajuda com o trabalho de IA.",
    timestamp: Date.now() - 3600000,
  },
  {
    id: "msg-2",
    groupId: "group-1",
    authorId: "user-1",
    content: "Sim, estou no Bloco IV. Quer que eu veja um material para você?",
    timestamp: Date.now() - 3500000,
  },
  {
    id: "msg-3",
    groupId: "group-1",
    authorId: "user-0",
    content: "Sim, por favor! Obrigado!",
    timestamp: Date.now() - 3400000,
  },
  {
    id: "msg-4",
    groupId: "group-2",
    authorId: "user-2",
    content: "Treino de vôlei cancelado hoje devido à chuva. Avisem a galera!",
    timestamp: Date.now() - 1200000,
  },
  {
    id: "msg-5",
    groupId: "group-2",
    authorId: "user-0",
    content: "Certo, aviso o pessoal do Ginásio!",
    timestamp: Date.now() - 600000,
  },
  {
    id: "msg-6",
    groupId: "group-1",
    authorId: "user-1",
    content: "De nada, Welder!",
    timestamp: Date.now() - 10000,
  },
];
const api = {
  getMessagesByGroup: (groupId: string): Promise<Message[]> => {
    const filtered = MOCK_MESSAGES.filter((m) => m.groupId === groupId);
    return Promise.resolve(filtered);
  },
};

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  author: User;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  author,
}) => {
  return (
    <div
      className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      {!isCurrentUser && (
        <img
          src={author.avatarUrl}
          alt={author.name}
          className="w-8 h-8 rounded-full mr-3 object-cover shrink-0"
        />
      )}
      <div
        className={`max-w-xs lg:max-w-lg p-3 rounded-xl shadow-sm relative ${
          isCurrentUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
        }`}
      >
        {!isCurrentUser && (
          <p
            className="font-semibold text-xs mb-1"
            style={{ color: "#457B9D" }}
          >
            {author.name}
          </p>
        )}
        <p className="text-sm">{message.content}</p>
        <span
          className={`text-[10px] absolute ${
            isCurrentUser ? "bottom-1 right-3" : "bottom-1 left-3" // Posição ajustada para melhor UX
          } text-gray-400 opacity-80`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      {isCurrentUser && (
        <img
          src={author.avatarUrl}
          alt={author.name}
          className="w-8 h-8 rounded-full ml-3 object-cover shrink-0"
        />
      )}
    </div>
  );
};

export const GroupChatPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { currentUser } = useAppContext();
  const chatContainerRef = useRef<HTMLDivElement>(null); // Referência para o Scroll

  const group: Group | undefined = MOCK_GROUPS.find((g) => g.id === groupId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!groupId) return;

    api.getMessagesByGroup(groupId).then((data) => {
      const sortedMessages = data.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(sortedMessages);
      setIsLoading(false);
    });
  }, [groupId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading || !group || !currentUser)
    return <div className="p-10 text-center">Carregando Chat...</div>;

  const getUserById = (id: string): User => {
    const foundUser = MOCK_ALL_USERS_MOCK.find((u) => u.id === id);

    if (!foundUser) {
      return {
        id: "unknown",
        name: "Usuário Desconhecido",
        role: "ADVENTURER",
        universityId: "uni-0",
        isModerator: false,
        points: 0,
        avatarUrl: "https://placehold.co/100x100/CCCCCC/666666?text=?",
      } as User;
    }
    return foundUser;
  };

  const mockUserActivity =
    MOCK_USERS_LIST[0].name === "Carlos Líder" ? "Online" : "Conectado";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="sticky top-0 bg-white border-b border-gray-200 p-4 shadow-md z-10">
        <Link
          to="/chat"
          className="text-blue-500 text-sm block mb-1 hover:underline"
        >
          ← Voltar aos Chats
        </Link>
        <h1 className="text-xl font-bold text-gray-900">{group.name}</h1>
        <p className="text-xs text-gray-500 mt-1">
          {group.memberIds.length} membros | Status:{" "}
          <span className="text-green-600 font-semibold">
            {mockUserActivity}
          </span>
        </p>
      </header>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 pt-4 pb-20"
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.authorId === currentUser.id}
            author={getUserById(message.authorId)}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-auto lg:w-96 bg-white border-t border-gray-200 p-4 z-20">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enviar mensagem..."
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
          />
          <button className="bg-blue-600 text-white px-4 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-transform">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
