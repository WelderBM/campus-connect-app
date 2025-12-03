import React from "react";
import { useAppContext } from "@/context/AppContext";
import { GeoHubPage } from "../2Dmap";
import { Map3D } from "../3Dmap";

export const MapHandler: React.FC = () => {
  const { filterLevel, currentUniversityId } = useAppContext();

  if (filterLevel === "GLOBAL" || filterLevel === "NATIONAL") {
    return <Map3D university={} />;
  }

  return <GeoHubPage />;
};
