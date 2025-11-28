import { MapContainer, TileLayer, Polygon, Popup, Marker } from "react-leaflet";
import { MOCK_HUDS, MOCK_UNIVERSITY } from "@/services/mockData";
import type { HUD } from "@/types";
import { getThemeColors } from "@/utils/themeHelpers";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Link } from "react-router-dom";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const GeoHubPage: React.FC = () => {
  // Centro do Mapa: Vamos usar a localização do primeiro HUD ou um ponto fixo da USP
  const centerPosition: [number, number] = [2.833227, -60.693891];

  return (
    <div className="h-[calc(100vh-140px)] w-full relative">
      <MapContainer
        center={centerPosition}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        {/* Camada do Mapa (Skin Visual) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {MOCK_HUDS.map((hud: HUD) => {
          const theme = getThemeColors(hud.category);

          return (
            <Polygon
              key={hud.id}
              positions={hud.polygonCoordinates} // Usa o novo campo
              pathOptions={{
                color: theme.secondary,
                fillColor: theme.primary,
                weight: 2, // Espessura da linha
                fillOpacity: 0.7,
              }}
            >
              <Popup>
                {/* ... Conteúdo do Popup permanece igual ... */}
                <div className="text-center">
                  <span className="text-3xl block mb-2">{hud.emoji}</span>
                  <strong className="text-gray-800 block text-lg">
                    {hud.nickname}
                  </strong>
                  {/* BOTÃO DE ENTRAR (Link permanece) */}
                  <Link
                    to={`/hud/${hud.id}`}
                    className="block w-full bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors no-underline mt-2"
                  >
                    Entrar no Espaço
                  </Link>
                </div>
              </Popup>
            </Polygon>
          );
        })}

        {/* Marcador Central (Sede) */}
        <Marker position={centerPosition}>
          <Popup>
            {MOCK_UNIVERSITY.name} <br /> Ponto Central.
          </Popup>
        </Marker>
      </MapContainer>

      {/* Overlay de Título (UI Flutuante) */}
      <div className="absolute bottom-20 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-[400]">
        <h2 className="text-sm font-bold text-gray-700">
          📍 Geo-Hub: {MOCK_UNIVERSITY.shortName}
        </h2>
        <p className="text-xs text-gray-500">
          Explore os espaços e faça check-in.
        </p>
      </div>
    </div>
  );
};
