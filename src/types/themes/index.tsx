export const THEME_COLORS = {
  ACADEMIC: {
    primary: "#A8DADC",
    secondary: "#457B9D",
    label: "Acadêmico",
  },
  SERVICE: {
    primary: "#C7E8CA",
    secondary: "#2A9D8F",
    label: "Serviço",
  },
  LEISURE: {
    primary: "#FADECB",
    secondary: "#E76F51",
    label: "Lazer",
  },
  SPORTS: { primary: "#D3D3D3", secondary: "#555555", label: "Esportes" },
  GENERAL: { primary: "#EFEFEF", secondary: "#AAAAAA", label: "Geral" },
} as const;

export type ThemeKey = keyof typeof THEME_COLORS;
