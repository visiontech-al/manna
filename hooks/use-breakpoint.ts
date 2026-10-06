import { useWindowDimensions } from 'react-native';

import { BREAKPOINTS } from '@/constants/app';

/** Layout flags from the current window width. Re-renders on resize / rotation. */
export function useBreakpoint() {
  const { width } = useWindowDimensions();

  return {
    width,
    /** Tablet landscape, browser window, desktop. */
    isWide: width >= BREAKPOINTS.wide,
    isDesktop: width >= BREAKPOINTS.desktop,
  };
}
