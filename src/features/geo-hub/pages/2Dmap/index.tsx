import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import {
  MOCK_HUDS,
  MOCK_UNIVERSITIES_LIST,
  MOCK_UNIVERSITY,
} from "@/services/mockData";
import type { HUD, University } from "@/types";
import { getThemeColors } from "@/utils/themeHelpers";
import L from "leaflet";
import { Link, useLocation } from "react-router-dom"; // Importe useLocation

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { HudPopupContent } from "../../components/HudPopupContent";
import { DrawControl } from "../../components/DrawControl";

// Configuração de ícones do Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MIN_ZOOM_LEVEL_FOR_HUDS = 16;

// --- COMPONENTE AUXILIAR PARA ATUALIZAR A VISÃO DO MAPA ---
// O MapContainer não atualiza o centro automaticamente se as props mudarem após a montagem.
// Precisamos deste componente para "ouvir" as mudanças e chamar map.setView().
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
    });
  }, [center, zoom, map]);
  return null;
};

// --- CAMADA DE VISUALIZAÇÃO (Alfinetes vs Polígonos) ---
const VisualizationLayer: React.FC = () => {
  const map = useMapEvents({
    zoomend: (e) => {
      setZoomLevel(e.target.getZoom());
    },
  });

  const [zoomLevel, setZoomLevel] = useState(map.getZoom());
  const isLocalView = zoomLevel >= MIN_ZOOM_LEVEL_FOR_HUDS;
  const currentUniId = MOCK_UNIVERSITY.id;

  if (isLocalView) {
    return (
      <>
        {MOCK_HUDS.filter((hud) => hud.universityId === currentUniId).map(
          (hud: HUD) => {
            const theme = getThemeColors(hud.category);
            return (
              <Polygon
                key={hud.id}
                positions={hud.polygonCoordinates as [number, number][]}
                pathOptions={{
                  color: theme.secondary,
                  fillColor: theme.primary,
                  weight: 2,
                  fillOpacity: 0.7,
                }}
              >
                <Popup>
                  <HudPopupContent hud={hud} isMyUniversity={true} />
                </Popup>
              </Polygon>
            );
          }
        )}
      </>
    );
  }

  return (
    <>
      {MOCK_UNIVERSITIES_LIST.map((uni: University) => (
        <Marker key={uni.id} position={uni.centerCoordinates}>
          <Popup>
            <div className="text-center">
              <strong className="text-gray-800 block text-lg">
                {uni.shortName}
              </strong>
              <p className="text-xs text-gray-500">
                {uni.name} ({uni.state})
              </p>
              <Link
                to={`/university/${uni.id}`}
                className="mt-2 block text-blue-600 text-sm font-bold hover:underline"
              >
                Ver Página
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

// --- PÁGINA PRINCIPAL DO GEO-HUB ---
export const GeoHubPage: React.FC = () => {
  const location = useLocation(); // Hook para ler o estado da navegação (vindo do 3D)
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  // 1. Lógica de Posição Inicial:
  // Verifica se existe um estado vindo da navegação (do 3D). Se sim, usa.
  // Caso contrário, usa o padrão da UFRR.
  const incomingCenter = location.state?.center;

  const centerPosition: [number, number] =
    incomingCenter || MOCK_UNIVERSITY.centerCoordinates;
  const initialZoom: number = 16;

  const handlePolygonSubmit = (coords: [number, number][]) => {
    setIsDrawingMode(false);
    alert(
      `Novo Polígono de ${coords.length} pontos criado!\nNavegando para o Formulário de Proposta.`
    );
  };

  return (
    <div className="h-[calc(100vh-140px)] w-full relative">
      <MapContainer
        center={centerPosition}
        zoom={16}
        minZoom={10} // Ajustado para permitir ver o Brasil inteiro
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        {/* Atualizador de Mapa: Garante que o mapa se mova se o centerPosition mudar */}
        <MapUpdater center={centerPosition} zoom={initialZoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <VisualizationLayer />

        {isDrawingMode && (
          <DrawControl onPolygonCreated={handlePolygonSubmit} />
        )}
      </MapContainer>

      {/* Overlay de UI */}
      <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-[400]">
        <h2 className="text-sm font-bold text-gray-700">
          📍 Geo-Hub:{" "}
          {incomingCenter ? "Visualização Nacional" : MOCK_UNIVERSITY.shortName}
        </h2>
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
