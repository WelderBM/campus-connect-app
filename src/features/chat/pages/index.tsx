import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { MOCK_GROUPS, api, MOCK_OTHER_USER } from "@/services/mockData";
import type { Group, Message, User } from "@/types";

const MOCK_ALL_USERS = [MOCK_OTHER_USER];

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
            isCurrentUser ? "bottom-1 left-3" : "bottom-1 right-3"
          } text-gray-300`}
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

  const group: Group | undefined = MOCK_GROUPS.find((g) => g.id === groupId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!groupId) return;
    api.getMessagesByGroup(groupId).then((data) => {
      setMessages(data);
      setIsLoading(false);
    });
  }, [groupId]);

  if (isLoading || !group || !currentUser)
    return <div className="p-10 text-center">Carregando Chat...</div>;

  const getUserById = (id: string): User => {
    return id === currentUser.id
      ? currentUser
      : MOCK_ALL_USERS.find((u) => u.id === id) || MOCK_OTHER_USER;
  };

  const mockUserActivity =
    MOCK_OTHER_USER.id === "user-2" ? "Feeling Sporty" : "Online";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="sticky top-0 bg-white border-b border-gray-200 p-4 shadow-md z-10">
        <Link to="/chat" className="text-blue-500 text-sm block mb-1">
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

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-20">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.authorId === currentUser.id}
            author={getUserById(message.authorId)}
          />
        ))}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 z-10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enviar mensagem..."
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <button className="bg-blue-600 text-white px-4 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-transform">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
