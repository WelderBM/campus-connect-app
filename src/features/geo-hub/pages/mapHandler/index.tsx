// src/features/geo-hub/pages/index.tsx
import { useAppContext } from "@/context/AppContext";
import { GlobalViewPage } from "../3Dmap";
import { GeoHubPage } from "../2Dmap";

export const MapHandler = () => {
  const { filterLevel } = useAppContext();

  if (filterLevel === "GLOBAL" || filterLevel === "NATIONAL") {
    return <GlobalViewPage />;
  } else {
    return <GeoHubPage />;
  }
};
