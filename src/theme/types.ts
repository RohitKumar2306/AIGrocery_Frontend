import type { ColorTokens } from "./tokens";

export type Theme = {
  isDark: boolean;
  colors: ColorTokens;
  spacing: (step: keyof typeof import("./tokens").spacing) => number;
  radii: typeof import("./tokens").radii;
  typography: typeof import("./tokens").typography;
  shadow: {
    sm: {
      shadowColor: string;
      shadowOpacity: number;
      shadowRadius: number;
      shadowOffset: { width: number; height: number };
      elevation: number;
    };
  };
};

