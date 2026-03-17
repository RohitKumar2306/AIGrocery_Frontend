import { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Button } from "../../../src/components/ui/Button";
import { Card } from "../../../src/components/ui/Card";
import { Input } from "../../../src/components/ui/Input";
import { SectionHeader } from "../../../src/components/ui/SectionHeader";
import { DashboardShell } from "../../../src/layouts/DashboardShell";
import { useGroceryListStore } from "../../../src/stores/groceryListStore";
import { useTheme } from "../../../src/theme/useTheme";

export default function CreateListScreen() {
  const t = useTheme();
  const router = useRouter();
  const createList = useGroceryListStore((s) => s.createList);
  const [name, setName] = useState("");

  return (
    <DashboardShell title="Create List">
      <View style={{ width: "100%", maxWidth: 720, alignSelf: "center" }}>
        <SectionHeader title="Create a list" subtitle="Give it a name, then add items." />
        <View style={{ height: t.spacing(3) }} />
        <Card>
          <Input label="List name" placeholder="Weekly groceries" value={name} onChangeText={setName} />
          <View style={{ height: t.spacing(4) }} />
          <Button
            title="Create"
            variant="primary"
            onPress={() => {
              const id = createList(name);
              router.replace(`/(app)/lists/${id}`);
            }}
          />
          <View style={{ height: t.spacing(2) }} />
          <Text style={{ color: t.colors.textMuted, fontSize: t.typography.size.xs }}>
            Tip: you can rename your list later from the list details screen.
          </Text>
        </Card>
      </View>
    </DashboardShell>
  );
}

