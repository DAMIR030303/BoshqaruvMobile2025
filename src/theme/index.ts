// Boshqaruv - Theme Tizimi
// Barcha theme komponentlarini eksport qilish

export * from './colors';
export * from './typography';

// Asosiy theme obyekti
import { colors } from './colors';
import { typography, spacing, borderRadius, shadows, breakpoints, mediaQueries, responsiveSpacing, grid } from './typography';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  mediaQueries,
  responsiveSpacing,
  grid,
  
  // Material Design 3 theme
  roundness: borderRadius.md,
  
  // Animation durations
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  }
};

export type Theme = typeof theme;
export default theme;
