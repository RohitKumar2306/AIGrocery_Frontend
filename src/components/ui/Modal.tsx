import React from "react";
import { Modal as RNModal, Pressable, View } from "react-native";

import { useTheme } from "../../theme/useTheme";

export function Modal({
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
    <RNModal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: "center", padding: t.spacing(4) }}>
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
            width: "100%",
            maxWidth: 560,
            alignSelf: "center",
            backgroundColor: t.colors.surface,
            borderColor: t.colors.border,
            borderWidth: 1,
            borderRadius: t.radii.xl,
            padding: t.spacing(4),
            ...t.shadow.sm,
          }}
        >
          {children}
        </View>
      </View>
    </RNModal>
  );
}

