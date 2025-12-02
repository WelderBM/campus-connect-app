import { api } from "@/services/dataApi";
import { MOCK_HUDS, MOCK_UNIVERSITY } from "@/services/geo";
import type { HUD } from "@/types/geo";
import type { CourseRanking } from "@/types/identity";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const StudentHub: React.FC = () => {
  const navigate = useNavigate();
  const [dominantAlliances, setDominantAlliances] = useState<CourseRanking[]>(
    []
  );

  useEffect(() => {
    api.getAlliancesRanking().then((data) => {
      setDominantAlliances(data.slice(0, 3));
    });
  }, []);

  const hudsByCategory = MOCK_HUDS.reduce((acc, hud) => {
    acc[hud.category] = acc[hud.category] || [];
    acc[hud.category].push(hud);
    return acc;
  }, {} as Record<string, HUD[]>);

  const ActionsSection = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/map")}
          className="p-4 bg-green-500 text-white rounded-xl font-bold shadow-md hover:bg-green-600 transition"
        >
          📍 Explorar Mapa
        </button>
        <button
          onClick={() => navigate("/feed")}
          className="p-4 bg-orange-500 text-white rounded-xl font-bold shadow-md hover:bg-orange-600 transition"
        >
          💬 Feed da Comunidade
        </button>
      </div>
    );
  };

  const RankingSection = () => {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-3">🔥 Ranking de Facções</h2>
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
        <button
          onClick={() => navigate("/profile")}
          className="mt-4 w-full py-2 text-white bg-blue-600 font-bold rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Ver Seu Perfil e Ranking Completo
        </button>
      </div>
    );
  };

  const CategoriesSection = () => {
    return (
      <div className="space-y-3">
        {Object.keys(hudsByCategory).map((category) => (
          <details
            key={category}
            className="group bg-white rounded-xl shadow overflow-hidden"
          >
            <summary className="p-4 flex justify-between items-center cursor-pointer font-bold text-gray-700 list-none border-b group-open:border-b-0">
              {category.charAt(0).toUpperCase() +
                category.slice(1).toLowerCase()}
              <span className="transition-transform duration-300 transform group-open:rotate-90">
                ›
              </span>
            </summary>
            <div className="p-2 border-t border-gray-100 space-y-1">
              {hudsByCategory[category].map((hud) => (
                <button
                  key={hud.id}
                  onClick={() => navigate(`/hud/${hud.id}`)}
                  className="w-full text-left p-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition flex justify-between items-center"
                >
                  <span>{hud.nickname}</span>
                  <span className="text-xs text-blue-500">Ir →</span>
                </button>
              ))}
            </div>
          </details>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 h-full">
      <h1 className="text-2xl font-bold text-gray-800">
        Bem-vindo(a), {MOCK_UNIVERSITY.shortName}
      </h1>
      <p className="text-sm text-gray-500">
        Seu ponto de partida no Geo-Hub da {MOCK_UNIVERSITY.name}.
      </p>
      <ActionsSection />
      <CategoriesSection />
      <RankingSection />
    </div>
  );
};
