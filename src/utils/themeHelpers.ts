import { THEME_COLORS, type ThemeKey } from "@/types";

export interface ThemeClasses {
  bg: string;
  text: string;
  border: string;
  tagBg: string;
}

export const getThemeClasses = (category: ThemeKey): ThemeClasses => {
  const theme = THEME_COLORS[category];

  return {
    bg: `bg-[${theme.primary}]`,
    text: `text-[${theme.secondary}]`,
    border: `border-[${theme.secondary}]`,
    tagBg: `bg-[${theme.secondary}]/10`,
  };
};
