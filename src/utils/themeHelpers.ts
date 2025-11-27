// src/utils/themeHelpers.ts
import { type ThemeKey, THEME_COLORS } from "../types";

interface ThemeClasses {
  border: string;
  bg: string;
  text: string;
  tagBg: string;
}

export const getThemeClasses = (category: ThemeKey): ThemeClasses => {
  const mapping: Record<ThemeKey, ThemeClasses> = {
    ACADEMIC: {
      border: "border-academic-secondary",
      bg: "bg-white",
      text: "text-academic-secondary",
      tagBg: "bg-academic-primary",
    },
    SERVICE: {
      border: "border-service-secondary",
      bg: "bg-white",
      text: "text-service-secondary",
      tagBg: "bg-service-primary",
    },
    LEISURE: {
      border: "border-leisure-secondary",
      bg: "bg-white",
      text: "text-leisure-secondary",
      tagBg: "bg-leisure-primary",
    },
  };

  return mapping[category] || mapping.ACADEMIC;
};

export const getThemeColors = (category: ThemeKey) => {
  return THEME_COLORS[category] || THEME_COLORS.ACADEMIC;
};
