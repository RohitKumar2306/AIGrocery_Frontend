import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "../../theme/useTheme";

export function EmptyState({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  const t = useTheme();
  return (
    <View
      style={{
        backgroundColor: t.colors.surface,
        borderColor: t.colors.border,
        borderWidth: 1,
        borderRadius: t.radii.xl,
        padding: t.spacing(4),
        alignItems: "center",
      }}
    >
      <Text style={{ color: t.colors.text, fontSize: t.typography.size.md, fontWeight: "800" }}>{title}</Text>
      {!!subtitle && (
        <Text style={{ color: t.colors.textMuted, marginTop: 6, fontSize: t.typography.size.sm, textAlign: "center" }}>
          {subtitle}
        </Text>
      )}
      {!!action && <View style={{ marginTop: t.spacing(3) }}>{action}</View>}
    </View>
  );
}

