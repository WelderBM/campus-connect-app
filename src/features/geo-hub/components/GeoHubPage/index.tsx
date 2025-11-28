import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
import {
  MOCK_HUDS,
  MOCK_UNIVERSITIES_LIST,
  MOCK_UNIVERSITY,
} from "@/services/mockData";
import type { HUD, University } from "@/types";
import { getThemeColors } from "@/utils/themeHelpers";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Link } from "react-router-dom";
import { HudPopupContent } from "../HudPopupContent";
import { useState } from "react";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const GeoHubPage: React.FC = () => {
  const centerPosition: [number, number] = [2.833227, -60.693891];
  const MIN_ZOOM_LEVEL_FOR_HUDS = 14;

  const VisualizationLayer: React.FC = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom());
      },
    });

    const [zoomLevel, setZoomLevel] = useState(map.getZoom());

    if (zoomLevel >= MIN_ZOOM_LEVEL_FOR_HUDS) {
      return <>{MOCK_HUDS.map((hud: HUD) => {})}</>;
    } else {
      return (
        <>
          {MOCK_UNIVERSITIES_LIST.map((uni: University) => (
            <Marker
              key={uni.id}
              position={uni.centerCoordinates as [number, number]}
            >
              <Popup>
                <div className="text-center">
                  <strong className="text-gray-800 block text-lg">
                    {uni.shortName}
                  </strong>
                  <p className="text-xs text-gray-500">{uni.name}</p>
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
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] w-full relative">
      <MapContainer
        center={centerPosition}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {MOCK_HUDS.map((hud: HUD) => {
          const theme = getThemeColors(hud.category);
          const isMyUniversity = hud.universityId === MOCK_UNIVERSITY.id;

          return (
            <Polygon
              key={hud.id}
              positions={hud.polygonCoordinates}
              pathOptions={{
                color: theme.secondary,
                fillColor: theme.primary,
                weight: 2,
                fillOpacity: 0.7,
              }}
            >
              <Popup>
                <HudPopupContent hud={hud} isMyUniversity={isMyUniversity} />
              </Popup>
            </Polygon>
          );
        })}
        <VisualizationLayer />
      </MapContainer>
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
