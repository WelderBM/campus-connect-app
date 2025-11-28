import React from "react";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";

const createButtonIcon = (className: string) => {
  const Icon = L.Icon.extend({
    options: {
      iconUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/images/${className}.png`,
      iconRetinaUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/images/${className}-2x.png`,
      shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/images/marker-shadow.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    },
  });
  return new Icon();
};

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
      const latLngs = layer
        .getLatLngs()[0]
        .map((coord: L.LatLng) => [coord.lat, coord.lng]);
      onPolygonCreated(latLngs);
    }
  };

  return (
    <EditControl
      position="topright"
      onCreated={handleCreated}
      draw={{
        polyline: false,
        marker: false,
        circlemarker: false,
        circle: false,
        rectangle: { shapeOptions: { color: "#E76F51" } },
        polygon: { shapeOptions: { color: "#457B9D" } },
      }}
      edit={{
        edit: false,
        remove: false,
      }}
    />
  );
};
