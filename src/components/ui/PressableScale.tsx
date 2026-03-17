import React, { useMemo, useState } from "react";
import { Pressable, PressableProps, ViewStyle } from "react-native";

export function PressableScale({
  style,
  pressedScale = 0.98,
  ...props
}: PressableProps & { pressedScale?: number }) {
  const [pressed, setPressed] = useState(false);

  const baseStyle = useMemo<ViewStyle>(
    () => ({
      transform: [{ scale: pressed ? pressedScale : 1 }],
    }),
    [pressed, pressedScale]
  );

  return (
    <Pressable
      {...props}
      onPressIn={(e) => {
        setPressed(true);
        props.onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        props.onPressOut?.(e);
      }}
      style={[baseStyle, style as any]}
    />
  );
}

