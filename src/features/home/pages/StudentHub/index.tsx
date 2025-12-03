import { ActionButton } from "@/global/components/ActionButton";
import { CardContainer } from "@/global/components/cardContainer";
import { api } from "@/services/dataApi";
import { MOCK_HUDS, MOCK_UNIVERSITY } from "@/services/mocks/geo";
import type { HUD } from "@/types/geo";
import type { CourseRanking } from "@/types/identity";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

export const StudentHub: React.FC = () => {
  const navigate = useNavigate();
  const [dominantAlliances, setDominantAlliances] = useState<CourseRanking[]>(
    []
  );
  const { currentUser } = useAppContext();

  useEffect(() => {
    api.getFactionsRanking(currentUser).then((data) => {
      setDominantAlliances(data.slice(0, 3));
    });
  }, []);

  const hudsByCategory = MOCK_HUDS.reduce((acc, hud) => {
    const categoryLabel =
      hud.category.charAt(0).toUpperCase() +
      hud.category.slice(1).toLowerCase();
    acc[categoryLabel] = acc[categoryLabel] || [];
    acc[categoryLabel].push(hud);
    return acc;
  }, {} as Record<string, HUD[]>);

  const ActionsSection = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <ActionButton
          onClick={() => navigate("/map")}
          text="Explorar Mapa"
          emoji="📍"
          variant="success"
        />
        <ActionButton
          onClick={() => navigate("/feed")}
          text="Feed da Comunidade"
          emoji="💬"
          variant="primary"
        />
      </div>
    );
  };

  const RankingSection = () => {
    return (
      <CardContainer className="bg-blue-600 text-white" padding="large">
        <h2 className="text-xl font-bold mb-3">🏆 Ranking de Alianças</h2>
        <div className="space-y-2">
          {dominantAlliances.map((rank, index) => (
            <div
              key={rank.course.id}
              className="flex justify-between items-center text-sm"
            >
              <span
                className="font-extrabold"
                style={{ color: rank.course.colorHex }}
              >
                {index + 1}º {rank.course.shortName}
              </span>
              <span className="text-xs opacity-80">
                {Math.round(rank.weightedScore)} Pontos Médios
              </span>
            </div>
          ))}
        </div>
        <ActionButton
          onClick={() => navigate("/profile")}
          text="Ver Seu Perfil e Ranking Completo"
          variant="secondary"
          className="mt-4 bg-white text-blue-600 hover:bg-gray-100" // Cores invertidas
        />
      </CardContainer>
    );
  };

  const CategoriesSection = () => {
    return (
      <div className="space-y-3">
        {Object.keys(hudsByCategory).map((category) => (
          <CardContainer
            key={category}
            padding="none"
            className="overflow-hidden"
          >
            <details className="group">
              <summary className="p-4 flex justify-between items-center cursor-pointer font-bold text-gray-700 list-none border-b group-open:border-b-0">
                {category}
                <span className="transition-transform duration-300 transform group-open:rotate-90">
                  ›
                </span>
              </summary>
              <div className="p-2 border-t border-gray-100 space-y-1">
                {hudsByCategory[category].map((hud) => (
                  <ActionButton
                    key={hud.id}
                    onClick={() => navigate(`/hud/${hud.id}`)}
                    text={hud.nickname}
                    emoji={hud.emoji}
                    variant="secondary"
                    isFullWidth={true}
                    className="justify-between text-left px-3 py-2 text-sm bg-transparent hover:bg-gray-100 shadow-none border-none"
                  />
                ))}
              </div>
            </details>
          </CardContainer>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        Bem-vindo(a), {MOCK_UNIVERSITY.shortName}
      </h1>
      <p className="text-sm text-gray-500">
        Seu ponto de partida no Geo-Hub da {MOCK_UNIVERSITY.name}.
      </p>
      <ActionsSection />
      <RankingSection />
      <CategoriesSection />
    </div>
  );
};
