import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "../../theme/useTheme";
import { Card } from "./Card";

export function StoreCard({
  name,
  subtitle,
  etaText,
}: {
  name: string;
  subtitle?: string;
  etaText?: string;
}) {
  const t = useTheme();
  return (
    <Card style={{ padding: t.spacing(4) }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ color: t.colors.text, fontSize: t.typography.size.lg, fontWeight: "800" }}>{name}</Text>
          {!!subtitle && (
            <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.sm, marginTop: 4 }}>{subtitle}</Text>
          )}
        </View>
        {!!etaText && (
          <View
            style={{
              backgroundColor: t.colors.surface2,
              borderColor: t.colors.border,
              borderWidth: 1,
              borderRadius: t.radii.pill,
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: t.colors.text, fontSize: t.typography.size.sm, fontWeight: "700" }}>{etaText}</Text>
          </View>
        )}
      </View>
    </Card>
  );
}

