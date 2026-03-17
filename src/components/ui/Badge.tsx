import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "../../theme/useTheme";

export function Badge({
  text,
  bg,
  fg,
}: {
  text: string;
  bg: string;
  fg: string;
}) {
  const t = useTheme();
  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: t.radii.pill,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: t.colors.border,
      }}
    >
      <Text style={{ color: fg, fontSize: t.typography.size.xs, fontWeight: "800" }}>{text}</Text>
    </View>
  );
}

