import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import type { Group, Message, User } from "@/types/identity";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

declare const __app_id: string;
declare const __firebase_config: string;

const app = initializeApp(
  JSON.parse(
    typeof __firebase_config !== "undefined" ? __firebase_config : "{}"
  )
);
const db = getFirestore(app);

import { ActionButton } from "@/global/components/ActionButton";

// Mocks simples para garantir que a página renderize os autores, pois a busca é complexa
const MOCK_USERS_LIST_FOR_CHAT: User[] = [
  {
    id: "user-1",
    name: "Aline Pereira",
    role: "STUDENT",
    universityId: "uni-1",
    isModerator: false,
    points: 1200,
    avatarUrl: "https://placehold.co/100x100/FFC300/1D3557?text=AP",
  },
  {
    id: "user-2",
    name: "Bruno Costa",
    role: "STUDENT",
    universityId: "uni-1",
    isModerator: false,
    points: 950,
    avatarUrl: "https://placehold.co/100x100/E76F51/1D3557?text=BC",
  },
  {
    id: "user-3",
    name: "Camila Dias",
    role: "STUDENT",
    universityId: "uni-1",
    isModerator: true,
    points: 3500,
    avatarUrl: "https://placehold.co/100x100/F4A261/1D3557?text=CD",
  },
];

const MessageBubble: React.FC<{
  message: Message;
  isCurrentUser: boolean;
  author: User;
}> = ({ message, isCurrentUser, author }) => {
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
        className={`max-w-xs lg:max-w-lg p-3 rounded-xl shadow-sm relative pb-6 ${
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
          className={`text-[10px] absolute bottom-1 ${
            isCurrentUser ? "right-3" : "left-3"
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
  const { currentUser, isAuthReady } = useAppContext();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [group, setGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Lista de usuários para referência (mistura mocks com o usuário atual)
  const allUsers = currentUser
    ? [
        currentUser,
        ...MOCK_USERS_LIST_FOR_CHAT.filter((u) => u.id !== currentUser.id),
      ]
    : MOCK_USERS_LIST_FOR_CHAT;

  useEffect(() => {
    if (!groupId || !isAuthReady) {
      setIsLoading(false);
      return;
    }

    const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

    // 1. Fetch Group Details (simples get para detalhes estáticos)
    const groupRef = doc(db, `artifacts/${appId}/public/data/groups`, groupId);
    getDoc(groupRef).then((snap) => {
      if (snap.exists()) {
        setGroup(snap.data() as Group);
      } else {
        setGroup(null);
      }
    });

    // 2. Setup Realtime Message Listener
    const messagesCollectionRef = collection(
      db,
      `artifacts/${appId}/public/data/messages`
    );
    const messagesQuery = query(
      messagesCollectionRef,
      where("groupId", "==", groupId)
      // NOTE: Firestore não suporta ordering sem índice. Ordenamos em JS.
    );

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messagesData = snapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Message)
          )
          .sort((a, b) => a.timestamp - b.timestamp);

        setMessages(messagesData);
        setIsLoading(false);
      },
      (e) => {
        console.error("Erro no listener de Mensagens:", e);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [groupId, isAuthReady]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getUserById = (id: string): User => {
    const foundUser = allUsers.find((u) => u.id === id);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !groupId) return;

    const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

    const messagePayload: Omit<Message, "id"> = {
      groupId,
      authorId: currentUser.id,
      content: newMessage.trim(),
      timestamp: Date.now(),
    };

    try {
      await addDoc(
        collection(db, `artifacts/${appId}/public/data/messages`),
        messagePayload
      );
      setNewMessage("");

      // Atualizar o preview e lastActive do grupo (Opcional, mas recomendado para o ChatHubPage)
      const groupRef = doc(
        db,
        `artifacts/${appId}/public/data/groups`,
        groupId
      );
      await setDoc(
        groupRef,
        {
          lastMessagePreview: `${
            currentUser.name.split(" ")[0]
          }: ${messagePayload.content.substring(0, 30)}${
            messagePayload.content.length > 30 ? "..." : ""
          }`,
          lastActive: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  if (isLoading || !group || !currentUser || !isAuthReady)
    return <div className="p-10 text-center">Carregando Chat e Usuário...</div>;

  const mockUserActivity = "Online";

  return (
    <div className="h-full bg-gray-100 flex-col flex min-h-screen">
      <header className="sticky top-0 lg:top-16 bg-white border-b border-gray-200 p-4 shadow-md z-10">
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
        className="flex-1 overflow-y-auto p-4 space-y-4 pt-4 pb-28"
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.authorId === currentUser.id}
            author={getUserById(message.authorId)}
          />
        ))}
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            Diga "Olá"! Esta é a primeira mensagem do grupo.
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-auto lg:w-96 bg-white border-t border-gray-200 p-4 z-20">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enviar mensagem..."
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
            disabled={!currentUser}
          />
          <ActionButton
            type="submit"
            onClick={() => {}}
            text="Enviar"
            variant="primary"
            isFullWidth={false}
            isDisabled={!newMessage.trim()}
          />
        </form>
      </div>
    </div>
  );
};
