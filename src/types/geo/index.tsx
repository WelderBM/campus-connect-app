import type { JSX } from "react";
import type { ThemeKey } from "../themes";

export type Coordinates = [number, number];

export interface University {
  id: string;
  name: string;
  shortName: string;
  countryFlag: JSX.Element;
  continentColor: string;
  backgroundImage?: string;
  state: string;
  centerCoordinates: Coordinates;
  proximityRadiusKm: number;
}

export interface HUD {
  id: string;
  universityId: string;
  formalName: string;
  nickname: string;
  emoji: string;
  category: ThemeKey;
  polygonCoordinates: Coordinates[];
  activeUsers: number;
}
