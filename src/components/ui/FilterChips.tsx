import React from "react";
import { ScrollView, Text } from "react-native";

import { useTheme } from "../../theme/useTheme";
import { PressableScale } from "./PressableScale";

export type ChipOption = { key: string; label: string };

export function FilterChips({
  options,
  value,
  onChange,
}: {
  options: ChipOption[];
  value?: string;
  onChange: (key: string) => void;
}) {
  const t = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
      {options.map((opt) => {
        const selected = opt.key === value;
        return (
          <PressableScale
            key={opt.key}
            onPress={() => onChange(opt.key)}
            style={{
              backgroundColor: selected ? t.colors.primary : t.colors.surface,
              borderColor: selected ? "transparent" : t.colors.border,
              borderWidth: 1,
              borderRadius: t.radii.pill,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: selected ? t.colors.primaryText : t.colors.text, fontWeight: "800", fontSize: t.typography.size.sm }}>
              {opt.label}
            </Text>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

