// Boshqaruv - Responsive Hook
// Web va mobil uchun responsive utilities

import { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';

import { theme } from '../theme';

interface ResponsiveInfo {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  isWeb: boolean;
  orientation: 'portrait' | 'landscape';
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'wide';
}

const useResponsive = (): ResponsiveInfo => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;
  const isWeb = Platform.OS === 'web';
  
  // Breakpoint logic
  const isMobile = width < theme.breakpoints.tablet;
  const isTablet = width >= theme.breakpoints.tablet && width < theme.breakpoints.desktop;
  const isDesktop = width >= theme.breakpoints.desktop && width < theme.breakpoints.wide;
  const isWide = width >= theme.breakpoints.wide;
  
  // Current breakpoint
  const getBreakpoint = (): 'mobile' | 'tablet' | 'desktop' | 'wide' => {
    if (isWide) return 'wide';
    if (isDesktop) return 'desktop';
    if (isTablet) return 'tablet';
    return 'mobile';
  };
  
  // Orientation
  const orientation: 'portrait' | 'landscape' = width > height ? 'landscape' : 'portrait';

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    isWeb,
    orientation,
    breakpoint: getBreakpoint(),
  };
};

export default useResponsive;

// Additional utility hooks
export const useBreakpoint = () => {
  const { breakpoint } = useResponsive();
  return breakpoint;
};

export const useIsMobile = () => {
  const { isMobile } = useResponsive();
  return isMobile;
};

export const useIsTablet = () => {
  const { isTablet } = useResponsive();
  return isTablet;
};

export const useIsDesktop = () => {
  const { isDesktop } = useResponsive();
  return isDesktop;
};

export const useIsWeb = () => {
  const { isWeb } = useResponsive();
  return isWeb;
};

// Responsive value hook
export const useResponsiveValue = <T>(values: {
  mobile: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
}): T => {
  const { breakpoint } = useResponsive();
  
  switch (breakpoint) {
    case 'wide':
      return values.wide ?? values.desktop ?? values.tablet ?? values.mobile;
    case 'desktop':
      return values.desktop ?? values.tablet ?? values.mobile;
    case 'tablet':
      return values.tablet ?? values.mobile;
    case 'mobile':
    default:
      return values.mobile;
  }
};

// Responsive style hook
export const useResponsiveStyle = <T>(styles: {
  mobile: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
}): T => {
  return useResponsiveValue(styles);
};

// Grid columns hook
export const useResponsiveColumns = (columns?: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  wide?: number;
}): number => {
  return useResponsiveValue({
    mobile: columns?.mobile ?? 1,
    tablet: columns?.tablet ?? 2,
    desktop: columns?.desktop ?? 3,
    wide: columns?.wide ?? 4,
  });
};

// Spacing hook
export const useResponsiveSpacing = (spacing?: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  wide?: number;
}): number => {
  return useResponsiveValue({
    mobile: spacing?.mobile ?? theme.spacing.md,
    tablet: spacing?.tablet ?? theme.spacing.lg,
    desktop: spacing?.desktop ?? theme.spacing.xl,
    wide: spacing?.wide ?? theme.spacing.xl,
  });
};

// Font size hook
export const useResponsiveFontSize = (fontSize?: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  wide?: number;
}): number => {
  return useResponsiveValue({
    mobile: fontSize?.mobile ?? theme.typography.fontSize.base,
    tablet: fontSize?.tablet ?? theme.typography.fontSize.lg,
    desktop: fontSize?.desktop ?? theme.typography.fontSize.xl,
    wide: fontSize?.wide ?? theme.typography.fontSize.xl,
  });
};