import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { DashboardShell } from "../../src/layouts/DashboardShell";
import { Card } from "../../src/components/ui/Card";
import { EmptyState } from "../../src/components/ui/EmptyState";
import { FilterChips } from "../../src/components/ui/FilterChips";
import { LoadingSkeleton } from "../../src/components/ui/LoadingSkeleton";
import { PriceBadge } from "../../src/components/ui/PriceBadge";
import { ProductRow } from "../../src/components/ui/ProductRow";
import { SavingsBadge } from "../../src/components/ui/SavingsBadge";
import { SearchBar } from "../../src/components/ui/SearchBar";
import { SectionHeader } from "../../src/components/ui/SectionHeader";
import { StoreCard } from "../../src/components/ui/StoreCard";
import { useResponsive } from "../../src/hooks/useResponsive";
import { useGroceryListStore } from "../../src/stores/groceryListStore";
import { useTheme } from "../../src/theme/useTheme";

export default function DashboardScreen() {
  const t = useTheme();
  const { isLg, isSm } = useResponsive();
  const columns = isLg ? 2 : 1;
  const lists = useGroceryListStore((s) => s.lists);
  const activeLists = lists.slice(0, 3);

  return (
    <DashboardShell title="Dashboard">
      <View style={{ flexDirection: isLg ? "row" : "column", alignItems: isLg ? "flex-end" : "stretch", gap: t.spacing(3) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.xs, fontWeight: "900", letterSpacing: 1 }}>
            OVERVIEW
          </Text>
          <Text style={{ color: t.colors.text, fontSize: t.typography.size["2xl"], fontWeight: "900", marginTop: 6 }}>
            Smart deals, fast.
          </Text>
          <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.md, marginTop: 6, maxWidth: 560 }}>
            Compare prices across stores, track savings, and build your cart with confidence.
          </Text>
        </View>
        {isSm && (
          <View style={{ marginTop: t.spacing(2) }}>
            <SearchBar placeholder="Search products, stores, brands…" />
          </View>
        )}
      </View>

      <View style={{ height: t.spacing(4) }} />

      <View style={{ flexDirection: columns === 2 ? "row" : "column", gap: t.spacing(3) }}>
        <Card style={{ flex: 1 }}>
          <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.xs, fontWeight: "900", letterSpacing: 1 }}>
            TODAY
          </Text>
          <Text style={{ color: t.colors.text, fontSize: t.typography.size.xl, fontWeight: "900", marginTop: 8 }}>
            $12.40 saved
          </Text>
          <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.sm, marginTop: 6 }}>
            Based on your recent comparisons and deals.
          </Text>
          <View style={{ height: t.spacing(3) }} />
          <LoadingSkeleton height={10} />
          <View style={{ height: t.spacing(2) }} />
          <LoadingSkeleton height={10} width="82%" />
          <View style={{ height: t.spacing(2) }} />
          <LoadingSkeleton height={10} width="64%" />
        </Card>

        <Card style={{ flex: 1 }}>
          <SectionHeader
            title="Compare now"
            subtitle="Jump into a list and prepare for comparison"
            right={
              <Link href="/(app)/lists" asChild>
                <Pressable
                  style={{
                    backgroundColor: t.colors.surface2,
                    borderColor: t.colors.border,
                    borderWidth: 1,
                    borderRadius: t.radii.lg,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                  }}
                >
                  <Text style={{ color: t.colors.text, fontWeight: "900" }}>My Lists</Text>
                </Pressable>
              </Link>
            }
          />
          <View style={{ height: t.spacing(2) }} />
          {activeLists.length === 0 ? (
            <EmptyState
              title="No active lists"
              subtitle="Create a grocery list to start comparing prices."
              action={
                <Link href="/(app)/lists/create" asChild>
                  <Pressable
                    style={{
                      backgroundColor: t.colors.primary,
                      borderRadius: t.radii.lg,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                    }}
                  >
                    <Text style={{ color: t.colors.primaryText, fontWeight: "900" }}>Create List</Text>
                  </Pressable>
                </Link>
              }
            />
          ) : (
            <View style={{ gap: 10 }}>
              {activeLists.map((l) => (
                <Link key={l.id} href={`/(app)/lists/${l.id}`} asChild>
                  <Pressable>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: t.colors.border,
                        borderRadius: t.radii.lg,
                        padding: 12,
                        backgroundColor: t.colors.surface,
                      }}
                    >
                      <Text style={{ color: t.colors.text, fontWeight: "900" }}>{l.name}</Text>
                      <Text style={{ color: t.colors.textMuted, marginTop: 4, fontSize: t.typography.size.xs }}>
                        {l.items.length} items • Updated {new Date(l.updatedAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </Pressable>
                </Link>
              ))}
              <Link href="/(app)/lists" asChild>
                <Pressable style={{ alignSelf: "flex-start", paddingVertical: 6 }}>
                  <Text style={{ color: t.colors.primary, fontWeight: "900" }}>View all lists →</Text>
                </Pressable>
              </Link>
            </View>
          )}
        </Card>
      </View>

      <View style={{ height: t.spacing(4) }} />

      <View style={{ flexDirection: columns === 2 ? "row" : "column", gap: t.spacing(3), alignItems: "flex-start" }}>
        <View style={{ flex: 1, width: "100%" }}>
          <SectionHeader title="Top deals" subtitle="Best price drops right now" />
          <View style={{ height: t.spacing(2) }} />
          <Card>
            <ProductRow
              title="Organic Bananas"
              subtitle="1 lb • By Nature’s Best"
              right={
                <View style={{ flexDirection: "row", gap: t.spacing(2) }}>
                  <SavingsBadge text="Save 15%" />
                  <PriceBadge text="$1.29" />
                </View>
              }
            />
            <View style={{ height: 8 }} />
            <ProductRow title="Whole Milk" subtitle="1 gal • Farm Fresh" right={<PriceBadge text="$3.49" />} />
            <View style={{ height: 8 }} />
            <ProductRow
              title="Cage-free eggs"
              subtitle="12 ct • Sunrise Farms"
              right={
                <View style={{ flexDirection: "row", gap: t.spacing(2) }}>
                  <SavingsBadge text="Save 10%" />
                  <PriceBadge text="$4.29" />
                </View>
              }
            />
          </Card>
        </View>

        <View style={{ flex: 1, width: "100%" }}>
          <SectionHeader title="Tracked stores" subtitle="Placeholder (connect store tracking next)" />
          <View style={{ height: t.spacing(2) }} />
          <View style={{ gap: t.spacing(2) }}>
            <StoreCard name="FreshMart" etaText="25–35 min" subtitle="Open until 10pm" />
            <StoreCard name="Green Grocer" etaText="15–25 min" subtitle="Free delivery over $35" />
            <StoreCard name="Value Depot" etaText="35–45 min" subtitle="Pickup available" />
          </View>
        </View>
      </View>

      <View style={{ height: t.spacing(4) }} />

      <Card>
        <SectionHeader title="Recent alerts" subtitle="Placeholder (price drops, stock, favorites)" />
        <View style={{ height: t.spacing(2) }} />
        <EmptyState title="No alerts yet" subtitle="Alerts will show here once store tracking is enabled." />
      </Card>
    </DashboardShell>
  );
}

