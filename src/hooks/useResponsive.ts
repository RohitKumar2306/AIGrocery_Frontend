import { useWindowDimensions } from "react-native";

import { breakpoints } from "../theme/tokens";

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isSm = width < breakpoints.md;
  const isMd = width >= breakpoints.md && width < breakpoints.lg;
  const isLg = width >= breakpoints.lg;
  return { width, height, isSm, isMd, isLg };
}

