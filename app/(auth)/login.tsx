import { Link } from "expo-router";
import { View } from "react-native";

import { Button } from "../../src/components/ui/Button";
import { Card } from "../../src/components/ui/Card";
import { Input } from "../../src/components/ui/Input";
import { SectionHeader } from "../../src/components/ui/SectionHeader";
import { useTheme } from "../../src/theme/useTheme";

export default function LoginScreen() {
  const t = useTheme();
  return (
    <View
      style={{
        flex: 1,
        padding: t.spacing(4),
        justifyContent: "center",
        backgroundColor: t.colors.bg,
      }}
    >
      <View style={{ width: "100%", maxWidth: 420, alignSelf: "center" }}>
        <SectionHeader title="Welcome back" subtitle="Sign in to continue" />
        <Card style={{ marginTop: t.spacing(3), padding: t.spacing(4) }}>
          <Input label="Email" placeholder="you@example.com" keyboardType="email-address" />
          <View style={{ height: t.spacing(3) }} />
          <Input label="Password" placeholder="••••••••" secureTextEntry />
          <View style={{ height: t.spacing(4) }} />
          <Link href="/(app)/dashboard" asChild>
            <Button variant="primary" title="Continue" />
          </Link>
        </Card>
      </View>
    </View>
  );
}

