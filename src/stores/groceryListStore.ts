import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { id } from "../utils/id";

export type GroceryCategory =
  | "Produce"
  | "Dairy"
  | "Meat"
  | "Pantry"
  | "Frozen"
  | "Bakery"
  | "Snacks"
  | "Beverages"
  | "Household"
  | "Other";

export const GROCERY_CATEGORIES: GroceryCategory[] = [
  "Produce",
  "Dairy",
  "Meat",
  "Pantry",
  "Frozen",
  "Bakery",
  "Snacks",
  "Beverages",
  "Household",
  "Other",
];

export type GroceryItem = {
  id: string;
  name: string;
  quantity: number;
  category: GroceryCategory;
  isPriority: boolean;
  isFavorite: boolean;
  checked: boolean;
  createdAt: number;
  updatedAt: number;
};

export type GroceryList = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  items: GroceryItem[];
};

type StoreState = {
  lists: GroceryList[];

  createList: (name: string) => string;
  renameList: (listId: string, name: string) => void;
  deleteList: (listId: string) => void;

  addItem: (listId: string, item: { name: string; quantity?: number; category?: GroceryCategory }) => string;
  updateItem: (listId: string, itemId: string, patch: Partial<Pick<GroceryItem, "name" | "quantity" | "category" | "isPriority" | "isFavorite" | "checked">>) => void;
  removeItem: (listId: string, itemId: string) => void;
  bumpQuantity: (listId: string, itemId: string, delta: number) => void;

  toggleFavorite: (listId: string, itemId: string) => void;
  togglePriority: (listId: string, itemId: string) => void;
};

const storage = {
  getItem: async (key: string) => {
    if (Platform.OS === "web") return globalThis.localStorage?.getItem(key) ?? null;
    return await AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") return globalThis.localStorage?.setItem(key, value);
    return await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    if (Platform.OS === "web") return globalThis.localStorage?.removeItem(key);
    return await AsyncStorage.removeItem(key);
  },
};

function now() {
  return Date.now();
}

export const useGroceryListStore = create<StoreState>()(
  persist(
    (set, get) => ({
      lists: [],

      createList: (name) => {
        const listId = id("list");
        const ts = now();
        const list: GroceryList = { id: listId, name: name.trim() || "New list", createdAt: ts, updatedAt: ts, items: [] };
        set((s) => ({ lists: [list, ...s.lists] }));
        return listId;
      },
      renameList: (listId, name) => {
        set((s) => ({
          lists: s.lists.map((l) => (l.id === listId ? { ...l, name: name.trim() || l.name, updatedAt: now() } : l)),
        }));
      },
      deleteList: (listId) => {
        set((s) => ({ lists: s.lists.filter((l) => l.id !== listId) }));
      },

      addItem: (listId, item) => {
        const itemId = id("item");
        const ts = now();
        const entry: GroceryItem = {
          id: itemId,
          name: item.name.trim(),
          quantity: Math.max(1, item.quantity ?? 1),
          category: item.category ?? "Other",
          isPriority: false,
          isFavorite: false,
          checked: false,
          createdAt: ts,
          updatedAt: ts,
        };
        set((s) => ({
          lists: s.lists.map((l) =>
            l.id === listId ? { ...l, updatedAt: ts, items: [entry, ...l.items] } : l
          ),
        }));
        return itemId;
      },
      updateItem: (listId, itemId, patch) => {
        const ts = now();
        set((s) => ({
          lists: s.lists.map((l) => {
            if (l.id !== listId) return l;
            return {
              ...l,
              updatedAt: ts,
              items: l.items.map((it) => (it.id === itemId ? { ...it, ...patch, updatedAt: ts } : it)),
            };
          }),
        }));
      },
      removeItem: (listId, itemId) => {
        const ts = now();
        set((s) => ({
          lists: s.lists.map((l) => (l.id === listId ? { ...l, updatedAt: ts, items: l.items.filter((it) => it.id !== itemId) } : l)),
        }));
      },
      bumpQuantity: (listId, itemId, delta) => {
        const { updateItem } = get();
        const list = get().lists.find((l) => l.id === listId);
        const item = list?.items.find((it) => it.id === itemId);
        if (!item) return;
        updateItem(listId, itemId, { quantity: Math.max(1, item.quantity + delta) });
      },
      toggleFavorite: (listId, itemId) => {
        const list = get().lists.find((l) => l.id === listId);
        const item = list?.items.find((it) => it.id === itemId);
        if (!item) return;
        get().updateItem(listId, itemId, { isFavorite: !item.isFavorite });
      },
      togglePriority: (listId, itemId) => {
        const list = get().lists.find((l) => l.id === listId);
        const item = list?.items.find((it) => it.id === itemId);
        if (!item) return;
        get().updateItem(listId, itemId, { isPriority: !item.isPriority });
      },
    }),
    {
      name: "aigrocery:groceryLists:v1",
      // @ts-expect-error zustand persist storage typing is broader than our adapter
      storage,
      // Persist only serializable data; actions are recreated on init.
      // @ts-expect-error zustand persist typing expects full state here
      partialize: (state) => ({ lists: state.lists }),
      version: 1,
    }
  )
);

export function getListById(state: Pick<StoreState, "lists">, listId: string) {
  return state.lists.find((l) => l.id === listId);
}

