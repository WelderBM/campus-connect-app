import type { ThemeKey } from "../themes";
import type { JSX } from "react";

export interface University {
  id: string;
  name: string;
  shortName: string;
  countryFlag: JSX.Element;
  continentColor: string;
  backgroundImage?: string;
  state: string;
  centerCoordinates: [number, number];
}

export interface HUD {
  id: string;
  universityId: string;
  formalName: string;
  nickname: string;
  emoji: string;
  category: ThemeKey;
  polygonCoordinates: [number, number][];
  activeUsers: number;
}
