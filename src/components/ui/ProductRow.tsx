import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "../../theme/useTheme";

export function ProductRow({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 }}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text style={{ color: t.colors.text, fontSize: t.typography.size.md, fontWeight: "700" }}>{title}</Text>
        {!!subtitle && (
          <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.sm, marginTop: 2 }}>{subtitle}</Text>
        )}
      </View>
      {!!right && <View style={{ alignItems: "flex-end" }}>{right}</View>}
    </View>
  );
}

