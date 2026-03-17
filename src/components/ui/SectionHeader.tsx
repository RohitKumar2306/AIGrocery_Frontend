import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "../../theme/useTheme";

export function SectionHeader({
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
    <View style={{ flexDirection: "row", alignItems: subtitle ? "flex-end" : "center", justifyContent: "space-between" }}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text style={{ color: t.colors.text, fontSize: t.typography.size.xl, fontWeight: "800" }}>{title}</Text>
        {!!subtitle && (
          <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.sm, marginTop: 4 }}>{subtitle}</Text>
        )}
      </View>
      {!!right && <View>{right}</View>}
    </View>
  );
}

