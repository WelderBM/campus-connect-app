import type { Coordinates, PolygonCoordinates } from "@/types";

export const isWithinRadius = (
  current: Coordinates,
  center: Coordinates,
  radiusKm: number
): boolean => {
  const R = 6371;
  const lat1 = current[0] * (Math.PI / 180);
  const lat2 = center[0] * (Math.PI / 180);
  const deltaLat = (center[0] - current[0]) * (Math.PI / 180);
  const deltaLon = (center[1] - current[1]) * (Math.PI / 180);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceKm = R * c;

  return distanceKm <= radiusKm;
};

export const isWithinPolygon = (
  point: Coordinates,
  polygon: PolygonCoordinates
): boolean => {
  const x = point[0];
  const y = point[1];

  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};
