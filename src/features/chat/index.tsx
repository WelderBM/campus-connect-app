import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { ActionButton } from "@/global/components/ActionButton";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import type { Group } from "@/types/identity";
import { CardContainer } from "@/global/components/CardContainer";

declare const __app_id: string;
declare const __firebase_config: string;

const app = initializeApp(
  JSON.parse(
    typeof __firebase_config !== "undefined" ? __firebase_config : "{}"
  )
);
const db = getFirestore(app);

const GroupCard: React.FC<{ group: Group }> = ({ group }) => {
  return (
    <Link to={`/chat/${group.id}`} className="block">
      <CardContainer
        isClickable
        padding="large"
        className="hover:bg-gray-50 transition duration-150"
      >
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{group.name}</h3>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              group.isPrivate
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {group.isPrivate ? "Privado" : "Aberto"}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 truncate">
          {group.lastMessagePreview || "Nenhuma mensagem recente."}
        </p>
        <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
          <span>{group.memberIds.length} membros</span>
          <span>{new Date(group.lastActive).toLocaleDateString()}</span>
        </div>
      </CardContainer>
    </Link>
  );
};

export const ChatHubPage: React.FC = () => {
  const { currentUser, isAuthReady } = useAppContext();
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthReady || !currentUser || !currentUser.id) return;

    const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
    const groupsCollectionRef = collection(
      db,
      `artifacts/${appId}/public/data/groups`
    );

    const groupsQuery = query(
      groupsCollectionRef,
      where("memberIds", "array-contains", currentUser.id)
    );

    const unsubscribe = onSnapshot(
      groupsQuery,
      (snapshot) => {
        const groupsData = snapshot.docs
          .map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Group)
          )
          .sort(
            (a, b) =>
              new Date(b.lastActive).getTime() -
              new Date(a.lastActive).getTime()
          );

        setGroups(groupsData);
        setIsLoading(false);
        setError(null);
      },
      (e) => {
        setError("Erro ao carregar lista de chats.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isAuthReady, currentUser]);

  if (!isAuthReady || isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 font-bold">
        Carregando Mensagens e Grupos...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        Você precisa estar logado para ver seus chats.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Mensagens e Grupos
      </h1>

      {groups.length === 0 ? (
        <CardContainer padding="large" className="text-center mt-10">
          <p className="text-gray-500 mb-4">
            Você ainda não faz parte de nenhum grupo.
          </p>
          <ActionButton
            text="Explorar o Feed para Entrar em Grupos"
            onClick={() => {}}
            variant="secondary"
          />
        </CardContainer>
      ) : (
        groups.map((group) => <GroupCard key={group.id} group={group} />)
      )}

      {error && (
        <div className="text-center text-sm text-red-500 mt-4">{error}</div>
      )}
    </div>
  );
};
