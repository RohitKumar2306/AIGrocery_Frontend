import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { useTheme } from "../../theme/useTheme";
import { PressableScale } from "./PressableScale";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  left,
  right,
}: {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}) {
  const t = useTheme();
  const isDisabled = disabled || loading;

  const paddingY = size === "sm" ? 10 : size === "lg" ? 14 : 12;
  const paddingX = size === "sm" ? 12 : size === "lg" ? 16 : 14;
  const fontSize = size === "sm" ? t.typography.size.sm : t.typography.size.md;

  const stylesByVariant: Record<ButtonVariant, { bg: string; border: string; text: string }> = {
    primary: { bg: t.colors.primary, border: "transparent", text: t.colors.primaryText },
    secondary: { bg: t.colors.surface2, border: t.colors.border, text: t.colors.text },
    ghost: { bg: "transparent", border: "transparent", text: t.colors.text },
    danger: { bg: t.colors.danger, border: "transparent", text: "#FFFFFF" },
  };

  const s = stylesByVariant[variant];

  return (
    <PressableScale
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      pressedScale={0.985}
      style={({ pressed }) => [
        {
          opacity: isDisabled ? 0.55 : pressed ? 0.95 : 1,
          backgroundColor: s.bg,
          borderColor: s.border,
          borderWidth: variant === "secondary" ? 1 : 0,
          borderRadius: t.radii.lg,
          paddingVertical: paddingY,
          paddingHorizontal: paddingX,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={s.text} />
      ) : (
        <>
          {!!left && <View style={{ marginLeft: -2 }}>{left}</View>}
          <Text style={{ color: s.text, fontWeight: "700", fontSize }}>{title}</Text>
          {!!right && <View style={{ marginRight: -2 }}>{right}</View>}
        </>
      )}
    </PressableScale>
  );
}

