import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { THEME_COLORS, type ThemeKey } from "@/types/themes";

export const ProposalFormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const geometry = location.state?.geometry;

  if (!geometry) {
    setTimeout(() => navigate("/map"), 0);
    return null;
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ThemeKey>("ACADEMIC");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert(
        "🎉 Proposta enviada com sucesso!\n\nA comunidade agora poderá votar para aprovar este novo HUD."
      );
      navigate("/governance");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <button
          onClick={() => navigate("/map")}
          className="text-sm text-gray-500 hover:text-gray-800 mb-1"
        >
          ← Cancelar e Voltar
        </button>
        <h1 className="text-xl font-bold text-gray-900">Propor Novo Espaço</h1>
        <p className="text-xs text-gray-500">
          Defina os detalhes da área que você mapeou.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-lg mx-auto">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-1">
            Geometria Capturada
          </p>
          <p className="text-sm text-blue-900">
            Polígono com {geometry.length} pontos de definição.
          </p>
          <p className="text-[10px] text-blue-600 mt-1 truncate">
            {JSON.stringify(geometry[0])}...
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Nome do Local
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Praça do Relógio, Bloco IV..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Categoria Principal
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(THEME_COLORS) as ThemeKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`p-3 rounded-lg text-xs font-bold border-2 transition-all ${
                  category === key
                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                }`}
              >
                {THEME_COLORS[key].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Descrição & Justificativa
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o que acontece neste local e por que ele deve ser um HUD oficial..."
            className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg text-lg transition-all active:scale-95 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "Enviando Proposta..." : "🚀 Submeter para Votação"}
        </button>
      </form>
    </div>
  );
};
