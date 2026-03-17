import React, { useMemo, useState } from "react";
import { Platform, Text, TextInput, TextInputProps, View } from "react-native";

import { useTheme } from "../../theme/useTheme";

export function Input({
  label,
  hint,
  error,
  left,
  right,
  containerStyle,
  ...props
}: TextInputProps & {
  label?: string;
  hint?: string;
  error?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  containerStyle?: any;
}) {
  const t = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? t.colors.danger
    : focused
      ? t.colors.primary
      : t.colors.border;

  const helper = error ?? hint;
  const helperColor = error ? t.colors.danger : t.colors.textMuted;

  const inputStyle = useMemo(
    () => ({
      flex: 1,
      color: t.colors.text,
      fontSize: t.typography.size.md,
      paddingVertical: Platform.OS === "web" ? 10 : 12,
      paddingHorizontal: 12,
      outlineStyle: "none" as any,
    }),
    [t]
  );

  return (
    <View style={containerStyle}>
      {!!label && (
        <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.sm, marginBottom: 6, fontWeight: "600" }}>
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: t.colors.surface,
          borderColor,
          borderWidth: 1,
          borderRadius: t.radii.lg,
          ...t.shadow.sm,
          shadowOpacity: 0.06,
          elevation: 1,
        }}
      >
        {!!left && <View style={{ paddingLeft: 12 }}>{left}</View>}
        <TextInput
          {...props}
          placeholderTextColor={t.colors.textMuted}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          style={[inputStyle, props.style as any]}
        />
        {!!right && <View style={{ paddingRight: 12 }}>{right}</View>}
      </View>
      {!!helper && (
        <Text style={{ color: helperColor, fontSize: t.typography.size.xs, marginTop: 6 }}>
          {helper}
        </Text>
      )}
    </View>
  );
}

