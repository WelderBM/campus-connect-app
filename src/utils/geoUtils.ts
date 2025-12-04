import type { Coordinates } from "@/types/geo";

const EARTH_RADIUS_KM = 6371;

/**
 * Calcula a distância Haversine entre dois pontos em quilômetros.
 */
export const calculateDistance = (p1: Coordinates, p2: Coordinates): number => {
  const [lat1, lon1] = p1;
  const [lat2, lon2] = p2;

  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
};

/**
 * Verifica se um ponto está dentro do raio de alcance de um centro.
 */
export const isWithinRadius = (
  currentPosition: Coordinates,
  center: Coordinates,
  radiusKm: number
): boolean => {
  const distance = calculateDistance(currentPosition, center);
  return distance <= radiusKm;
};

/**
 * Verifica se um ponto está dentro de um polígono usando o algoritmo Ray Casting.
 */
export const isWithinPolygon = (
  point: Coordinates,
  polygon: Coordinates[]
): boolean => {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
};
