import React from "react";

import { useTheme } from "../../theme/useTheme";
import { Badge } from "./Badge";

export function PriceBadge({ text }: { text: string }) {
  const t = useTheme();
  return <Badge text={text} bg={t.colors.surface2} fg={t.colors.text} />;
}

