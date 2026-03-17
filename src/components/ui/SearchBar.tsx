import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "../../theme/useTheme";
import { Input } from "./Input";

function Magnifier({ color }: { color: string }) {
  return (
    <Text style={{ color, fontSize: 16, fontWeight: "800" }} accessibilityElementsHidden>
      ⌕
    </Text>
  );
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search…",
}: {
  value?: string;
  onChangeText?: (v: string) => void;
  placeholder?: string;
}) {
  const t = useTheme();
  return (
    <View>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        left={<Magnifier color={t.colors.textMuted} />}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}

