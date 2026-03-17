import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Button } from "../../../src/components/ui/Button";
import { Card } from "../../../src/components/ui/Card";
import { Drawer } from "../../../src/components/ui/Drawer";
import { EmptyState } from "../../../src/components/ui/EmptyState";
import { FilterChips } from "../../../src/components/ui/FilterChips";
import { Input } from "../../../src/components/ui/Input";
import { Modal } from "../../../src/components/ui/Modal";
import { PriceBadge } from "../../../src/components/ui/PriceBadge";
import { ProductRow } from "../../../src/components/ui/ProductRow";
import { SavingsBadge } from "../../../src/components/ui/SavingsBadge";
import { SectionHeader } from "../../../src/components/ui/SectionHeader";
import { DashboardShell } from "../../../src/layouts/DashboardShell";
import { GROCERY_CATEGORIES, getListById, type GroceryCategory } from "../../../src/stores/groceryListStore";
import { useGroceryListStore } from "../../../src/stores/groceryListStore";
import { useTheme } from "../../../src/theme/useTheme";

export default function ListDetailsScreen() {
  const t = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const listId = params.id ?? "";

  const list = useGroceryListStore((s) => getListById(s, listId));
  const renameList = useGroceryListStore((s) => s.renameList);
  const deleteList = useGroceryListStore((s) => s.deleteList);
  const addItem = useGroceryListStore((s) => s.addItem);
  const updateItem = useGroceryListStore((s) => s.updateItem);
  const removeItem = useGroceryListStore((s) => s.removeItem);
  const bumpQuantity = useGroceryListStore((s) => s.bumpQuantity);
  const toggleFavorite = useGroceryListStore((s) => s.toggleFavorite);
  const togglePriority = useGroceryListStore((s) => s.togglePriority);

  const [renaming, setRenaming] = useState(false);
  const [draftName, setDraftName] = useState(list?.name ?? "");

  const [addOpen, setAddOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState("1");
  const [newItemCat, setNewItemCat] = useState<GroceryCategory>("Other");

  const [catPickerOpen, setCatPickerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => ["All", ...GROCERY_CATEGORIES], []);

  if (!list) {
    return (
      <DashboardShell title="List not found">
        <EmptyState
          title="This list no longer exists"
          subtitle="Go back to My Lists to create a new one."
          action={
            <Button title="Back to My Lists" variant="primary" onPress={() => router.replace("/(app)/lists")} />
          }
        />
      </DashboardShell>
    );
  }

  const items = list.items
    .filter((it) => (activeCategory === "All" ? true : it.category === activeCategory))
    .sort((a, b) => Number(b.isPriority) - Number(a.isPriority) || Number(b.isFavorite) - Number(a.isFavorite) || b.updatedAt - a.updatedAt);

  return (
    <DashboardShell title={list.name}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <SectionHeader title={list.name} subtitle={`${list.items.length} items`} />
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button title="Rename" variant="secondary" size="sm" onPress={() => { setDraftName(list.name); setRenaming(true); }} />
          <Button title="+ Add" variant="primary" size="sm" onPress={() => setAddOpen(true)} />
        </View>
      </View>

      <View style={{ height: t.spacing(3) }} />

      <FilterChips
        value={activeCategory}
        options={categories.map((c) => ({ key: c, label: c }))}
        onChange={setActiveCategory}
      />

      <View style={{ height: t.spacing(3) }} />

      {items.length === 0 ? (
        <EmptyState title="No items yet" subtitle="Add your first grocery item to prepare for comparison." action={<Button title="Add Item" variant="primary" onPress={() => setAddOpen(true)} />} />
      ) : (
        <Card>
          <View style={{ gap: 10 }}>
            {items.map((it) => (
              <View key={it.id} style={{ borderRadius: t.radii.lg, borderWidth: 1, borderColor: t.colors.border, padding: 12, backgroundColor: t.colors.surface }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: t.colors.text, fontSize: t.typography.size.md, fontWeight: "900" }}>{it.name}</Text>
                    <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.xs, marginTop: 4 }}>
                      {it.category} {it.isPriority ? "• Priority" : ""} {it.isFavorite ? "• Favorite" : ""}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Pressable
                      onPress={() => bumpQuantity(list.id, it.id, -1)}
                      style={{ width: 34, height: 34, borderRadius: t.radii.lg, borderWidth: 1, borderColor: t.colors.border, alignItems: "center", justifyContent: "center", backgroundColor: t.colors.surface2 }}
                    >
                      <Text style={{ color: t.colors.text, fontWeight: "900" }}>−</Text>
                    </Pressable>
                    <Text style={{ color: t.colors.text, fontWeight: "900", minWidth: 18, textAlign: "center" }}>{it.quantity}</Text>
                    <Pressable
                      onPress={() => bumpQuantity(list.id, it.id, +1)}
                      style={{ width: 34, height: 34, borderRadius: t.radii.lg, borderWidth: 1, borderColor: t.colors.border, alignItems: "center", justifyContent: "center", backgroundColor: t.colors.surface2 }}
                    >
                      <Text style={{ color: t.colors.text, fontWeight: "900" }}>+</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={{ height: 10 }} />

                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "space-between", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                    <Pressable onPress={() => togglePriority(list.id, it.id)}>
                      <SavingsBadge text={it.isPriority ? "Priority" : "Mark priority"} />
                    </Pressable>
                    <Pressable onPress={() => toggleFavorite(list.id, it.id)}>
                      <PriceBadge text={it.isFavorite ? "★ Favorite" : "☆ Favorite"} />
                    </Pressable>
                    <Pressable onPress={() => updateItem(list.id, it.id, { checked: !it.checked })}>
                      <PriceBadge text={it.checked ? "Checked" : "Not checked"} />
                    </Pressable>
                  </View>
                  <Pressable onPress={() => removeItem(list.id, it.id)}>
                    <Text style={{ color: t.colors.danger, fontWeight: "900" }}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </Card>
      )}

      {/* Sticky bottom action */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: 16,
          backgroundColor: "transparent",
        }}
        pointerEvents="box-none"
      >
        <View style={{ width: "100%", maxWidth: 1200, alignSelf: "center" }}>
          <View
            style={{
              backgroundColor: t.colors.surface,
              borderColor: t.colors.border,
              borderWidth: 1,
              borderRadius: t.radii.xl,
              padding: 12,
              ...t.shadow.sm,
              shadowOpacity: 0.08,
            }}
          >
            <Button title="Compare Prices" variant="primary" onPress={() => {}} />
            <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.xs, marginTop: 8 }}>
              (Comparison flow comes next — this prepares the list.)
            </Text>
          </View>
        </View>
      </View>

      {/* Rename modal */}
      <Modal visible={renaming} onClose={() => setRenaming(false)}>
        <SectionHeader title="Rename list" subtitle="Keep it short and recognizable." />
        <View style={{ height: t.spacing(3) }} />
        <Input label="Name" value={draftName} onChangeText={setDraftName} />
        <View style={{ height: t.spacing(4) }} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={() => setRenaming(false)} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Save"
              variant="primary"
              onPress={() => {
                renameList(list.id, draftName);
                setRenaming(false);
              }}
            />
          </View>
        </View>
        <View style={{ height: t.spacing(3) }} />
        <Button
          title="Delete list"
          variant="danger"
          onPress={() => {
            deleteList(list.id);
            setRenaming(false);
            router.replace("/(app)/lists");
          }}
        />
      </Modal>

      {/* Add item modal */}
      <Modal visible={addOpen} onClose={() => setAddOpen(false)}>
        <SectionHeader title="Add item" subtitle="Lightweight and mobile-friendly." />
        <View style={{ height: t.spacing(3) }} />
        <Input label="Item name" placeholder="Bananas" value={newItemName} onChangeText={setNewItemName} />
        <View style={{ height: t.spacing(3) }} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Input
              label="Qty"
              value={newItemQty}
              onChangeText={setNewItemQty}
              keyboardType="number-pad"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.sm, marginBottom: 6, fontWeight: "600" }}>
              Category
            </Text>
            <Pressable
              onPress={() => setCatPickerOpen(true)}
              style={{
                backgroundColor: t.colors.surface,
                borderColor: t.colors.border,
                borderWidth: 1,
                borderRadius: t.radii.lg,
                paddingVertical: 12,
                paddingHorizontal: 12,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: t.colors.text, fontWeight: "900" }}>{newItemCat}</Text>
            </Pressable>
          </View>
        </View>
        <View style={{ height: t.spacing(4) }} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Button title="Cancel" variant="secondary" onPress={() => setAddOpen(false)} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Add"
              variant="primary"
              onPress={() => {
                const name = newItemName.trim();
                if (!name) return;
                const qty = Math.max(1, Number(newItemQty || "1") || 1);
                addItem(list.id, { name, quantity: qty, category: newItemCat });
                setNewItemName("");
                setNewItemQty("1");
                setNewItemCat("Other");
                setAddOpen(false);
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Category picker drawer */}
      <Drawer visible={catPickerOpen} onClose={() => setCatPickerOpen(false)}>
        <SectionHeader title="Pick a category" subtitle="Helps with comparison later." />
        <View style={{ height: t.spacing(2) }} />
        <ScrollView contentContainerStyle={{ gap: 10 }}>
          {GROCERY_CATEGORIES.map((c) => (
            <Pressable
              key={c}
              onPress={() => {
                setNewItemCat(c);
                setCatPickerOpen(false);
              }}
              style={{
                borderWidth: 1,
                borderColor: t.colors.border,
                borderRadius: t.radii.lg,
                paddingVertical: 12,
                paddingHorizontal: 12,
                backgroundColor: c === newItemCat ? t.colors.surface2 : t.colors.surface,
              }}
            >
              <Text style={{ color: t.colors.text, fontWeight: "900" }}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </Drawer>
    </DashboardShell>
  );
}

