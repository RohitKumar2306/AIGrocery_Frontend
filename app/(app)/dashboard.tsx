import { Text, View } from "react-native";

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
import { useTheme } from "../../src/theme/useTheme";

export default function DashboardScreen() {
  const t = useTheme();
  const { isLg, isSm } = useResponsive();
  const columns = isLg ? 2 : 1;

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
          <SectionHeader title="Filters" subtitle="Narrow results fast" />
          <View style={{ height: t.spacing(2) }} />
          <FilterChips
            value="deals"
            options={[
              { key: "deals", label: "Deals" },
              { key: "fresh", label: "Fresh" },
              { key: "nearby", label: "Nearby" },
              { key: "top", label: "Top rated" },
            ]}
            onChange={() => {}}
          />
          <View style={{ height: t.spacing(3) }} />
          <EmptyState title="No filters applied" subtitle="Select a chip to filter items." />
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
          <SectionHeader title="Stores" subtitle="Fast delivery near you" />
          <View style={{ height: t.spacing(2) }} />
          <View style={{ gap: t.spacing(2) }}>
            <StoreCard name="FreshMart" etaText="25–35 min" subtitle="Open until 10pm" />
            <StoreCard name="Green Grocer" etaText="15–25 min" subtitle="Free delivery over $35" />
            <StoreCard name="Value Depot" etaText="35–45 min" subtitle="Pickup available" />
          </View>
        </View>
      </View>
    </DashboardShell>
  );
}

