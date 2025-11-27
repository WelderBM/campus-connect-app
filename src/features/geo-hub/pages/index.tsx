import { MapContainer, TileLayer, Circle, Popup, Marker } from "react-leaflet";
import { MOCK_HUDS, MOCK_UNIVERSITY } from "@/services/mockData";
import type { HUD } from "@/types";
import { getThemeColors } from "@/utils/themeHelpers";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const GeoHubPage: React.FC = () => {
  // Centro do Mapa: Vamos usar a localização do primeiro HUD ou um ponto fixo da USP
  const centerPosition: [number, number] = [-23.5505, -46.6333];

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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Renderiza os HUDs como Círculos Coloridos */}
        {MOCK_HUDS.map((hud: HUD) => {
          const theme = getThemeColors(hud.category);

          return (
            <Circle
              key={hud.id}
              center={[hud.coordinates.lat, hud.coordinates.lng]}
              pathOptions={{
                color: theme.secondary, // Borda
                fillColor: theme.primary, // Preenchimento Pastel
                fillOpacity: 0.6,
              }}
              radius={40} // 40 metros de raio (Simulando o polígono)
            >
              <Popup>
                <div className="text-center">
                  <span className="text-2xl block mb-1">{hud.emoji}</span>
                  <strong className="text-gray-800">{hud.nickname}</strong>
                  <p className="text-xs text-gray-500 m-0">{hud.formalName}</p>
                  <div className="mt-2 text-xs font-bold text-blue-600">
                    {hud.activeUsers} pessoas aqui
                  </div>
                </div>
              </Popup>
            </Circle>
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
      <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-[400]">
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
