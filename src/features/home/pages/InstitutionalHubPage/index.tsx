import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  MOCK_UNIVERSITY,
  MOCK_HUDS,
  getFactionsRanking,
  api,
} from "@/services/mockData";
import type { HUD } from "@/types";

const AdventurerLanding: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.endsWith("@ufrr.edu.br")) {
      alert("✅ E-mail institucional válido! Redirecionando para o Cadastro.");
    } else {
      alert("❌ E-mail inválido ou não-institucional. Tente novamente.");
    }
  };

  return (
    <div className="p-6 space-y-8 bg-white min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Bem-vindo ao Campus Connect
      </h1>
      <p className="text-lg text-gray-600">
        Explore a vida universitária antes mesmo de chegar.
      </p>

      <div className="p-5 bg-blue-50 rounded-xl border border-blue-200">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          Acesse sua Instituição
        </h2>
        <form onSubmit={handleValidation} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.nome@ufrr.edu.br"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Validar E-mail Institucional
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">
          O que você pode fazer aqui?
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Visualizar o mapa 3D global de universidades.</li>
          <li>Ver o Feed de notícias públicas.</li>
          <li>Explorar os HUDs (locais) mais populares.</li>
        </ul>
      </div>
    </div>
  );
};

const StudentHub: React.FC = () => {
  const navigate = useNavigate();
  const dominantFactions = api.getRanking().then((data) => data.slice(0, 3));

  const hudsByCategory = MOCK_HUDS.reduce((acc, hud) => {
    acc[hud.category] = acc[hud.category] || [];
    acc[hud.category].push(hud);
    return acc;
  }, {} as Record<string, HUD[]>);

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        Bem-vindo(a), {MOCK_UNIVERSITY.shortName}
      </h1>
      <p className="text-sm text-gray-500">
        Seu ponto de partida no Geo-Hub da {MOCK_UNIVERSITY.name}.
      </p>

      <div className="bg-blue-600 text-white p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-3">🔥 Ranking de Facções</h2>
        <div className="space-y-2">
          {dominantFactions.map((rank, index) => (
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
          className="mt-4 w-full py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition text-sm"
        >
          Ver Seu Perfil e Ranking Completo
        </button>
      </div>

      <h2 className="text-xl font-bold text-gray-800 pt-4">Navegação Rápida</h2>
      <p className="text-sm text-gray-500 -mt-2">
        Acesse áreas específicas da UFRR.
      </p>

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
                  <span>{hud.name}</span>
                  <span className="text-xs text-blue-500">Ir →</span>
                </button>
              ))}
            </div>
          </details>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-800 pt-4">Ações</h2>
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
    </div>
  );
};

export const InstitutionalHubPage: React.FC = () => {
  const { currentUser } = useAppContext();

  if (currentUser?.role === "ADVENTURER") {
    return <AdventurerLanding />;
  }

  return <StudentHub />;
};
