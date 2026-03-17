export type ColorTokens = {
  bg: string;
  surface: string;
  surface2: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryText: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
};

export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  fontFamily: {
    regular: "System",
    medium: "System",
    semibold: "System",
    mono: "Courier",
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    "2xl": 28,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 26,
    xl: 30,
    "2xl": 36,
  },
} as const;

export const colorsLight: ColorTokens = {
  bg: "#F6F7FB",
  surface: "#FFFFFF",
  surface2: "#F0F2F8",
  text: "#0B1220",
  textMuted: "#5B6477",
  border: "rgba(11,18,32,0.10)",
  primary: "#3B82F6",
  primaryText: "#FFFFFF",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#EF4444",
  shadow: "rgba(0,0,0,0.20)",
};

export const colorsDark: ColorTokens = {
  bg: "#070A12",
  surface: "#0E1424",
  surface2: "#111B31",
  text: "#F2F5FF",
  textMuted: "#A8B1C7",
  border: "rgba(242,245,255,0.10)",
  primary: "#60A5FA",
  primaryText: "#081124",
  success: "#22C55E",
  warning: "#FBBF24",
  danger: "#F87171",
  shadow: "rgba(0,0,0,0.60)",
};

