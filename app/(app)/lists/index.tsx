import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { Card } from "../../../src/components/ui/Card";
import { EmptyState } from "../../../src/components/ui/EmptyState";
import { SectionHeader } from "../../../src/components/ui/SectionHeader";
import { DashboardShell } from "../../../src/layouts/DashboardShell";
import { useResponsive } from "../../../src/hooks/useResponsive";
import { useGroceryListStore } from "../../../src/stores/groceryListStore";
import { useTheme } from "../../../src/theme/useTheme";

export default function MyListsScreen() {
  const t = useTheme();
  const { isLg } = useResponsive();
  const lists = useGroceryListStore((s) => s.lists);

  return (
    <DashboardShell title="My Lists">
      <View style={{ flexDirection: isLg ? "row" : "column", alignItems: isLg ? "center" : "stretch", gap: t.spacing(3) }}>
        <SectionHeader title="My Lists" subtitle="Create a list, add items, then compare prices." />
        <View style={{ flex: 1 }} />
        <Link href="/(app)/lists/create" asChild>
          <Pressable
            style={{
              alignSelf: isLg ? "auto" : "stretch",
              backgroundColor: t.colors.primary,
              borderRadius: t.radii.lg,
              paddingVertical: 12,
              paddingHorizontal: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: t.colors.primaryText, fontWeight: "900" }}>+ Create List</Text>
          </Pressable>
        </Link>
      </View>

      <View style={{ height: t.spacing(4) }} />

      {lists.length === 0 ? (
        <EmptyState
          title="No lists yet"
          subtitle="Create your first grocery list to start tracking items."
          action={
            <Link href="/(app)/lists/create" asChild>
              <Pressable
                style={{
                  backgroundColor: t.colors.surface2,
                  borderColor: t.colors.border,
                  borderWidth: 1,
                  borderRadius: t.radii.lg,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
              >
                <Text style={{ color: t.colors.text, fontWeight: "900" }}>Create a list</Text>
              </Pressable>
            </Link>
          }
        />
      ) : (
        <View style={{ gap: t.spacing(3) }}>
          {lists.map((list) => {
            const itemCount = list.items.length;
            const priorityCount = list.items.filter((x) => x.isPriority).length;
            const favCount = list.items.filter((x) => x.isFavorite).length;
            return (
              <Link key={list.id} href={`/(app)/lists/${list.id}`} asChild>
                <Pressable>
                  <Card style={{ padding: t.spacing(4) }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: t.colors.text, fontSize: t.typography.size.xl, fontWeight: "900" }}>
                          {list.name}
                        </Text>
                        <Text style={{ color: t.colors.textMuted, marginTop: 6, fontSize: t.typography.size.sm }}>
                          {itemCount} items • {priorityCount} priority • {favCount} favorites
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: t.colors.surface2,
                          borderColor: t.colors.border,
                          borderWidth: 1,
                          borderRadius: t.radii.pill,
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                        }}
                      >
                        <Text style={{ color: t.colors.text, fontWeight: "900" }}>Open</Text>
                      </View>
                    </View>
                  </Card>
                </Pressable>
              </Link>
            );
          })}
        </View>
      )}
    </DashboardShell>
  );
}

