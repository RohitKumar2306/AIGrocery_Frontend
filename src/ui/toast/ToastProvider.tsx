import React, { createContext, useCallback, useMemo, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

import { useTheme } from "../../theme/useTheme";

export type ToastVariant = "default" | "success" | "warning" | "danger";
export type Toast = {
  id: string;
  title: string;
  message?: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastApi = {
  show: (toast: Omit<Toast, "id">) => void;
  hide: (id: string) => void;
};

export const ToastContext = createContext<ToastApi | null>(null);

function variantStyles(variant: ToastVariant, t: ReturnType<typeof useTheme>) {
  if (variant === "success") return { bg: "rgba(34,197,94,0.16)", fg: t.colors.text };
  if (variant === "warning") return { bg: "rgba(251,191,36,0.18)", fg: t.colors.text };
  if (variant === "danger") return { bg: "rgba(248,113,113,0.18)", fg: t.colors.text };
  return { bg: t.colors.surface, fg: t.colors.text };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hide = useCallback((id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const show = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const entry: Toast = { id, variant: "default", durationMs: 2800, ...toast };
      setToasts((prev) => [entry, ...prev].slice(0, 3));
      const duration = entry.durationMs ?? 2800;
      if (duration > 0) setTimeout(() => hide(id), duration);
    },
    [hide]
  );

  const api = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: Platform.OS === "web" ? 16 : 8,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <View pointerEvents="box-none" style={{ width: "100%", maxWidth: 520, paddingHorizontal: 16, gap: 8 }}>
          {toasts.map((toast) => {
            const v = variantStyles(toast.variant ?? "default", t);
            return (
              <Pressable
                key={toast.id}
                onPress={() => hide(toast.id)}
                style={{
                  backgroundColor: v.bg,
                  borderColor: t.colors.border,
                  borderWidth: 1,
                  borderRadius: t.radii.lg,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  ...t.shadow.sm,
                }}
              >
                <Text style={{ color: v.fg, fontSize: t.typography.size.md, fontWeight: "700" }}>
                  {toast.title}
                </Text>
                {!!toast.message && (
                  <Text style={{ color: t.colors.textMuted, marginTop: 2, fontSize: t.typography.size.sm }}>
                    {toast.message}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </ToastContext.Provider>
  );
}

