import React from "react";
import { Modal as RNModal, Pressable, View } from "react-native";

import { useTheme } from "../../theme/useTheme";

export function Drawer({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const t = useTheme();
  return (
    <RNModal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            inset: 0 as any,
            backgroundColor: "rgba(0,0,0,0.35)",
          }}
        />
        <View
          style={{
            backgroundColor: t.colors.surface,
            borderTopLeftRadius: t.radii.xl,
            borderTopRightRadius: t.radii.xl,
            borderColor: t.colors.border,
            borderWidth: 1,
            padding: t.spacing(4),
            minHeight: 220,
          }}
        >
          <View
            style={{
              alignSelf: "center",
              width: 56,
              height: 5,
              borderRadius: 999,
              backgroundColor: t.colors.border,
              marginBottom: t.spacing(3),
            }}
          />
          {children}
        </View>
      </View>
    </RNModal>
  );
}

