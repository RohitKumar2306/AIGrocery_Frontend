import React, { useMemo, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Link, usePathname, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useResponsive } from "../hooks/useResponsive";
import { useTheme } from "../theme/useTheme";
import { Drawer } from "../components/ui/Drawer";
import { Button } from "../components/ui/Button";
import { SearchBar } from "../components/ui/SearchBar";
import { useToast } from "../ui/toast/useToast";

type NavItem = { href: string; label: string; icon: string };

const NAV: NavItem[] = [
  { href: "/(app)/dashboard", label: "Home", icon: "⌂" },
  { href: "/(auth)/login", label: "Auth", icon: "⎋" },
];

function NavButton({ item, active }: { item: NavItem; active: boolean }) {
  const t = useTheme();
  return (
    <Link href={item.href} asChild>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: t.radii.lg,
          backgroundColor: active ? t.colors.surface2 : "transparent",
        }}
      >
        <Text style={{ color: active ? t.colors.primary : t.colors.textMuted, fontSize: 16, fontWeight: "900" }}>
          {item.icon}
        </Text>
        <Text style={{ color: active ? t.colors.text : t.colors.textMuted, fontSize: t.typography.size.sm, fontWeight: "800" }}>
          {item.label}
        </Text>
      </Pressable>
    </Link>
  );
}

function DrawerNavButton({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate: () => void;
}) {
  const t = useTheme();
  return (
    <Link href={item.href} asChild onPress={onNavigate}>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: t.radii.lg,
          backgroundColor: active ? t.colors.surface2 : "transparent",
        }}
      >
        <Text style={{ color: t.colors.textMuted, fontSize: 16, fontWeight: "900" }}>{item.icon}</Text>
        <Text style={{ color: active ? t.colors.text : t.colors.textMuted, fontSize: t.typography.size.sm, fontWeight: "800" }}>
          {item.label}
        </Text>
      </Pressable>
    </Link>
  );
}

export function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const t = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isLg, isSm } = useResponsive();
  const isDesktop = isLg;
  const isMobile = isSm;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toast = useToast();

  const activeHref = useMemo(() => {
    const match = NAV.find((x) => pathname?.startsWith(x.href));
    return match?.href ?? "/(app)/dashboard";
  }, [pathname]);

  const sidebarW = useRef(new Animated.Value(280)).current;
  const setCollapsed = (next: boolean) => {
    setSidebarCollapsed(next);
    Animated.timing(sidebarW, {
      toValue: next ? 84 : 280,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      {/* Top navbar */}
      <View
        style={{
          paddingTop: insets.top + 10,
          paddingHorizontal: t.spacing(4),
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: t.colors.border,
          backgroundColor: t.colors.surface,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {!isDesktop ? (
            <Pressable
              onPress={() => setDrawerOpen(true)}
              style={{
                width: 40,
                height: 40,
                borderRadius: t.radii.lg,
                borderWidth: 1,
                borderColor: t.colors.border,
                backgroundColor: t.colors.surface2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "900", color: t.colors.text }}>≡</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setCollapsed(!sidebarCollapsed)}
              style={{
                width: 40,
                height: 40,
                borderRadius: t.radii.lg,
                borderWidth: 1,
                borderColor: t.colors.border,
                backgroundColor: t.colors.surface2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "900", color: t.colors.text }}>{sidebarCollapsed ? "›" : "‹"}</Text>
            </Pressable>
          )}

          <View style={{ flex: 1 }}>
            <Text style={{ color: t.colors.text, fontSize: t.typography.size.lg, fontWeight: "900" }}>{title}</Text>
            <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.xs, marginTop: 2, fontWeight: "700" }}>
              Smart grocery shopping
            </Text>
          </View>

          {!isMobile && (
            <View style={{ flex: 1.2 }}>
              <SearchBar placeholder="Search products, stores, brands…" />
            </View>
          )}

          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              title="Toast"
              variant="secondary"
              size="sm"
              onPress={() => toast.show({ title: "Saved", message: "Your preferences were updated.", variant: "success" })}
            />
            <Button
              title="Logout"
              variant="ghost"
              size="sm"
              onPress={() => router.push("/(auth)/login")}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Desktop sidebar */}
        {isDesktop && (
          <Animated.View
            style={{
              width: sidebarW,
              padding: t.spacing(4),
              borderRightWidth: 1,
              borderRightColor: t.colors.border,
              backgroundColor: t.colors.surface,
            }}
          >
            {!sidebarCollapsed && (
              <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.xs, fontWeight: "800", marginBottom: 10 }}>
                NAVIGATION
              </Text>
            )}
            <View style={{ gap: 6 }}>
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} asChild>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: sidebarCollapsed ? "center" : "flex-start",
                      gap: sidebarCollapsed ? 0 : 10,
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderRadius: t.radii.lg,
                      backgroundColor: item.href === activeHref ? t.colors.surface2 : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        color: item.href === activeHref ? t.colors.primary : t.colors.textMuted,
                        fontSize: 16,
                        fontWeight: "900",
                      }}
                    >
                      {item.icon}
                    </Text>
                    {!sidebarCollapsed && (
                      <Text
                        style={{
                          color: item.href === activeHref ? t.colors.text : t.colors.textMuted,
                          fontSize: t.typography.size.sm,
                          fontWeight: "800",
                        }}
                      >
                        {item.label}
                      </Text>
                    )}
                  </Pressable>
                </Link>
              ))}
            </View>
            {!sidebarCollapsed && (
              <View style={{ marginTop: t.spacing(6) }}>
                <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.xs, fontWeight: "800" }}>TIP</Text>
                <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.sm, marginTop: 6 }}>
                  Use filters to narrow results and compare savings.
                </Text>
              </View>
            )}
          </Animated.View>
        )}

        {/* Main content */}
        <View style={{ flex: 1, padding: t.spacing(4), paddingBottom: isMobile ? 86 : t.spacing(4) }}>
          <View style={{ width: "100%", maxWidth: 1200, alignSelf: "center" }}>{children}</View>
        </View>
      </View>

      {/* Mobile bottom nav */}
      {isMobile && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            paddingBottom: Math.max(insets.bottom, 10),
            paddingTop: 10,
            paddingHorizontal: 16,
            borderTopWidth: 1,
            borderTopColor: t.colors.border,
            backgroundColor: t.colors.surface,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            {NAV.map((item) => {
              const active = item.href === activeHref;
              return (
                <Link key={item.href} href={item.href} asChild>
                  <Pressable style={{ alignItems: "center", gap: 6, paddingHorizontal: 8, paddingVertical: 6 }}>
                    <Text style={{ color: active ? t.colors.primary : t.colors.textMuted, fontWeight: "900" }}>{item.icon}</Text>
                    <Text style={{ color: active ? t.colors.primary : t.colors.textMuted, fontSize: 12, fontWeight: "800" }}>
                      {item.label}
                    </Text>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        </View>
      )}

      {/* Mobile drawer nav */}
      {!isDesktop && (
        <Drawer visible={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Text style={{ color: t.colors.text, fontSize: t.typography.size.lg, fontWeight: "900" }}>Menu</Text>
          <View style={{ height: t.spacing(3) }} />
          <View style={{ gap: 6 }}>
            {NAV.map((item) => (
              <DrawerNavButton
                key={item.href}
                item={item}
                active={item.href === activeHref}
                onNavigate={() => setDrawerOpen(false)}
              />
            ))}
          </View>
        </Drawer>
      )}
    </View>
  );
}

