import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { MOCK_UNIVERSITIES_LIST, MOCK_UNIVERSITY } from "@/services/mockData";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

export const GlobalViewPage: React.FC = () => {
  const { setFilterLevel } = useAppContext();
  const navigate = useNavigate();
  const globeEl = useRef<any | null>(null);

  // O componente Globe precisa de altura e largura dinâmicas
  const [size, setSize] = useState({
    width: window.innerWidth < 768 ? window.innerWidth : 448,
    height: window.innerHeight,
  });

  // Atualiza as dimensões ao redimensionar (garante que o canvas seja do tamanho certo)
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth < 768 ? window.innerWidth : 448,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const uniData = MOCK_UNIVERSITIES_LIST.map((uni) => ({
    lat: uni.centerCoordinates[0],
    lng: uni.centerCoordinates[1],
    size: uni.shortName === MOCK_UNIVERSITY.shortName ? 0.05 : 0.02,
    color: "#FF00FF",
    ...uni,
  }));

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: -15, lng: -55, altitude: 2 }, 1000);
      globeEl.current.controls().autoRotate = false;
    }
  }, []);

  const handlePointClick = (point: any) => {
    if (!globeEl.current) return;

    globeEl.current.pointOfView(
      {
        lat: point.lat,
        lng: point.lng,
        altitude: 0.5,
      },
      1500
    );
    setTimeout(() => {
      navigate("/map", {
        state: {
          center: point.centerCoordinates,
          initialZoom: 10,
          uniId: point.id,
        },
      });
      setFilterLevel("INSTITUTION");
    }, 1500);
  };

  return (
    <div className="h-full w-full overflow-hidden bg-gray-100 flex justify-center items-center">
      <div
        className="relative"
        style={{ width: size.width, height: size.height }}
      >
        <Globe
          ref={globeEl as any}
          width={size.width}
          height={size.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
          backgroundColor="rgb(229, 228, 226)"
          pointsData={uniData}
          pointAltitude="size"
          pointColor="color"
          pointLabel={(d: any) =>
            `<b>${d.shortName}</b>: ${d.name} (${d.state})`
          }
          pointRadius={0.5}
          onPointClick={handlePointClick}
        />
      </div>

      <div
        className="fixed top-16 w-full lg:max-w-md p-4 z-50 pointer-events-none"
        style={{ width: size.width, height: size.height }}
      >
        <div className="flex flex-col items-start pointer-events-auto">
          <button
            onClick={() => navigate("/feed")}
            className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full hover:bg-black/60 transition mb-3"
          >
            ← Voltar para a Sala de Convivência
          </button>

          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-700 text-gray-700 w-full">
            <h1 className="text-xl font-bold">🌐 Geo-Hub Global</h1>
            <p className="text-sm mt-1">Foco nas universidades brasileiras.</p>
            <p className="text-xs mt-2 text-blue-500">
              Clique em um ponto para entrar em uma faculdade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
