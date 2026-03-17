import React from "react";

import { useTheme } from "../../theme/useTheme";
import { Badge } from "./Badge";

export function SavingsBadge({ text }: { text: string }) {
  const t = useTheme();
  return <Badge text={text} bg={"rgba(34,197,94,0.16)"} fg={t.colors.text} />;
}

