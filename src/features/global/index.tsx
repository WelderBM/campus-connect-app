import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { MOCK_UNIVERSITIES_LIST, MOCK_UNIVERSITY } from "@/services/mockData";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { DrawControl } from "./components/DrawControl";

export const GlobalViewPage: React.FC = () => {
  const { setFilterLevel } = useAppContext();
  const navigate = useNavigate();
  const globeEl = useRef(null);
  const windowSize = { width: window.innerWidth, height: window.innerHeight };

  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const handlePolygonSubmit = (coords: [number, number][]) => {
    setIsDrawingMode(false);

    const proposalData = {
      name: "Novo HUD (Aguardando Nome)",
      geometry: coords,
      category: "ACADEMIC",
    };

    alert(
      `Novo Polígono de ${coords.length} pontos criado!\nNavegando para o Formulário de Proposta.`
    );
  };

  const uniData = MOCK_UNIVERSITIES_LIST.map((uni) => ({
    lat: uni.centerCoordinates[0],
    lng: uni.centerCoordinates[1],
    size: uni.shortName === MOCK_UNIVERSITY.shortName ? 0.05 : 0.02,
    color: uni.shortName === MOCK_UNIVERSITY.shortName ? "#457B9D" : "#E76F51",
    // name: uni.name,
    // shortName: uni.shortName,
    ...uni,
  }));

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: -15, lng: -55, altitude: 2 }, 1000);
    }
  }, []);

  const handlePointClick = (point: any) => {
    if (point.countryFlag === "") {
      setFilterLevel("NATIONAL");
      navigate(`/map`);
    } else {
      alert(`Universidade de ${point.countryFlag} | Em desenvolvimento.`);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-200px)] bg-gray-900 flex justify-center items-center">
      <div className="fixed top-16 w-full lg:max-w-md p-4 z-50">
        <button
          onClick={() => navigate("/feed")}
          className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full hover:bg-black/60 transition mb-3"
        >
          ← Voltar para a Sala de Convivência
        </button>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-700 text-white">
          <h1 className="text-xl font-bold">Visão Global de Universidades</h1>
          <p className="text-sm mt-1">
            Selecione um país para ver as universidades afiliadas.
          </p>
          <p className="text-xs mt-2 text-blue-300">
            {MOCK_UNIVERSITIES_LIST.length} Universidades Ativas
          </p>
        </div>
      </div>

      {isDrawingMode && <DrawControl onPolygonCreated={handlePolygonSubmit} />}

      <Globe
        ref={globeEl}
        width={windowSize.width < 768 ? windowSize.width : 448}
        height={windowSize.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={uniData}
        pointAltitude="size"
        pointColor="color"
        pointLabel={(d: any) => `<b>${d.shortName}</b>: ${d.name} (${d.state})`}
        pointRadius={0.5}
        onPointClick={handlePointClick}
      />

      <div className="absolute bottom-40 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-[400]">
        <h2 className="text-sm font-bold text-gray-700">📍 Geo-Hub: UFRR</h2>
        <p className="text-xs text-gray-500">
          {isDrawingMode
            ? "DESENHE O NOVO LIMITE DO HUD."
            : "Explore os espaços e faça check-in."}
        </p>
        <button
          onClick={() => setIsDrawingMode(!isDrawingMode)}
          className={`mt-2 w-full py-2 text-sm font-bold rounded-lg transition ${
            isDrawingMode
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {isDrawingMode ? "Cancelar Desenho" : "Propor Novo HUD"}
        </button>
      </div>
    </div>
  );
};
