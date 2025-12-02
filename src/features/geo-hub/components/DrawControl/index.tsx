import React from "react";
import { EditControl } from "react-leaflet-draw";
import { FeatureGroup } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";

const fixDrawIcons = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
};
fixDrawIcons();

interface DrawControlProps {
  onPolygonCreated: (coords: [number, number][]) => void;
}

export const DrawControl: React.FC<DrawControlProps> = ({
  onPolygonCreated,
}) => {
  const handleCreated = (e: any) => {
    const type = e.layerType;
    const layer = e.layer;

    if (type === "polygon" || type === "rectangle") {
      const rawLatLngs = layer.getLatLngs();

      const latLngs = Array.isArray(rawLatLngs[0]) ? rawLatLngs[0] : rawLatLngs;

      const formattedCoords = latLngs.map((coord: any) => [
        coord.lat,
        coord.lng,
      ]);

      console.log("Desenho capturado:", formattedCoords);
      onPolygonCreated(formattedCoords);
    }
  };

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={handleCreated}
        draw={{
          polyline: false,
          marker: false,
          circlemarker: false,
          circle: false,
          rectangle: {
            shapeOptions: { color: "#E76F51", weight: 3 },
          },
          polygon: {
            shapeOptions: { color: "#457B9D", weight: 3 },
            allowIntersection: false,
            showArea: true,
          },
        }}
        edit={{
          edit: false,
          remove: false,
        }}
      />
    </FeatureGroup>
  );
};
