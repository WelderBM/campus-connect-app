import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "@/global/components/ActionButton";
import { THEME_COLORS, type ThemeKey } from "@/types";
import { CardContainer } from "@/global/components/CardContainer";

export const ProposalFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [proposalType, setProposalType] = useState<"NEW_HUD" | "NEW_RULE">(
    "NEW_HUD"
  );
  const [targetCategory, setTargetCategory] = useState<ThemeKey>("GENERAL");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const themeKeys: ThemeKey[] = Object.keys(THEME_COLORS) as ThemeKey[];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newProposal = {
      title,
      description,
      type: proposalType,
      targetCategory,
    };

    console.log("Proposta Enviada:", newProposal);

    setTimeout(() => {
      alert("Proposta enviada com sucesso para votação!");
      setIsSubmitting(false);
      navigate("/governance");
    }, 1500);
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Criar Nova Proposta
      </h1>
      <p className="text-gray-600">
        Use a DAO para sugerir novos HUDs (locais) ou regras para a comunidade.
      </p>

      <CardContainer padding="large">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Tipo de Proposta
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center text-sm font-medium text-gray-800">
                <input
                  type="radio"
                  name="proposalType"
                  value="NEW_HUD"
                  checked={proposalType === "NEW_HUD"}
                  onChange={() => setProposalType("NEW_HUD")}
                  className="mr-2 text-blue-600"
                />
                Novo HUD (Local)
              </label>
              <label className="flex items-center text-sm font-medium text-gray-800">
                <input
                  type="radio"
                  name="proposalType"
                  value="NEW_RULE"
                  checked={proposalType === "NEW_RULE"}
                  onChange={() => setProposalType("NEW_RULE")}
                  className="mr-2 text-blue-600"
                />
                Nova Regra Comunitária
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Título da Proposta (Máximo 80 caracteres)
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Descrição Detalhada
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Categoria Relacionada (Tema)
            </label>
            <select
              id="category"
              value={targetCategory}
              onChange={(e) => setTargetCategory(e.target.value as ThemeKey)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              {themeKeys.map((key) => (
                <option key={key} value={key}>
                  {THEME_COLORS[key].label}
                </option>
              ))}
            </select>
          </div>

          <ActionButton
            onClick={() => {}}
            type="submit"
            text={isSubmitting ? "Enviando..." : "Enviar para Votação"}
            emoji="🚀"
            variant="primary"
            isFullWidth={true}
            className="mt-6"
            isDisabled={isSubmitting}
          />
        </form>
      </CardContainer>
    </div>
  );
};
