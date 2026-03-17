import React, { useEffect, useMemo, useRef } from "react";
import { Animated, View } from "react-native";

import { useTheme } from "../../theme/useTheme";

export function LoadingSkeleton({
  height = 16,
  width = "100%",
}: {
  height?: number;
  width?: number | `${number}%`;
}) {
  const t = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });
  const bg = useMemo(() => (t.isDark ? "rgba(255,255,255,0.08)" : "rgba(11,18,32,0.06)"), [t.isDark]);

  return (
    <View
      style={{
        width,
        height,
        borderRadius: t.radii.lg,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: t.colors.border,
        backgroundColor: t.colors.surface,
      }}
    >
      <Animated.View style={{ flex: 1, backgroundColor: bg, opacity }} />
    </View>
  );
}

