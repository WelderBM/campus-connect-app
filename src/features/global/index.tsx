import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import { MOCK_UNIVERSITIES_LIST, MOCK_UNIVERSITY } from "@/services/mockData";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

export const GlobalViewPage: React.FC = () => {
  const { setFilterLevel } = useAppContext();
  const navigate = useNavigate();
  const globeEl = useRef(null);
  const windowSize = { width: window.innerWidth, height: window.innerHeight };

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
    <div className="h-full w-full overflow-hidden bg-gray-900 flex justify-center items-center">
      <div className="absolute top-16 w-full lg:max-w-md p-4 z-50">
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
    </div>
  );
};
