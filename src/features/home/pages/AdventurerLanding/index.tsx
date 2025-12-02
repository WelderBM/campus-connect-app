import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdventurerLanding: React.FC = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.endsWith("@ufrr.edu.br")) {
      navigate("/register");
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
