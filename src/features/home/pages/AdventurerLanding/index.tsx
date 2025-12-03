import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardContainer } from "@/globals/components/cardContainer";
import { ActionButton } from "@/globals/components/ActionButton";

interface AdventurerLandingProps {
  signInMockUser: (role: "STUDENT" | "ADVENTURER") => Promise<void>;
}

export const AdventurerLanding: React.FC<AdventurerLandingProps> = ({
  signInMockUser,
}) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.endsWith("@ufrr.edu.br")) {
      alert(
        "✅ E-mail institucional válido! Você será logado como estudante padrão."
      );
      signInMockUser("STUDENT");
    } else {
      alert("❌ E-mail inválido ou não-institucional. Tente novamente.");
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Bem-vindo ao Campus Connect
      </h1>
      <p className="text-lg text-gray-600">
        Explore a vida universitária antes mesmo de chegar.
      </p>

      <CardContainer padding="large">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          Acesse sua Instituição
        </h2>
        <form onSubmit={handleValidation} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.nome@ufrr.edu.br"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <ActionButton
            onClick={() => {}}
            variant="primary"
            text="Validar E-mail Institucional"
            emoji="🔑"
            isFullWidth={true}
          />
        </form>
      </CardContainer>

      <CardContainer padding="large" className="shadow-none border-none">
        <h3 className="text-xl font-bold text-gray-800">
          O que você pode fazer aqui?
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mt-3">
          <li>Visualizar o mapa 3D global de universidades.</li>
          <li>Ver o Feed de notícias públicas.</li>
          <li>Explorar os HUDs (locais) mais populares.</li>
        </ul>
      </CardContainer>
    </div>
  );
};
