import React, { createContext, useMemo } from "react";
import { useColorScheme } from "react-native";

import { colorsDark, colorsLight, radii, spacing, typography } from "./tokens";
import type { Theme } from "./types";

export const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({
  children,
  forceScheme,
}: {
  children: React.ReactNode;
  forceScheme?: "light" | "dark";
}) {
  const scheme = useColorScheme();
  const isDark = (forceScheme ?? scheme) === "dark";

  const theme = useMemo<Theme>(() => {
    const colors = isDark ? colorsDark : colorsLight;
    return {
      isDark,
      colors,
      radii,
      typography,
      spacing: (step) => spacing[step],
      shadow: {
        sm: {
          shadowColor: colors.shadow,
          shadowOpacity: 0.2,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 8 },
          elevation: 6,
        },
      },
    };
  }, [isDark]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

