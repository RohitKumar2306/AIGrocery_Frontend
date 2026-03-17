import React from "react";
import { View, ViewProps } from "react-native";

import { useTheme } from "../../theme/useTheme";

export function Card({ style, ...props }: ViewProps) {
  const t = useTheme();
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: t.colors.surface,
          borderColor: t.colors.border,
          borderWidth: 1,
          borderRadius: t.radii.xl,
          padding: t.spacing(4),
          ...t.shadow.sm,
          shadowOpacity: 0.08,
        },
        style as any,
      ]}
    />
  );
}

