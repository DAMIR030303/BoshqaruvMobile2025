// Boshqaruv - Tipografiya va Spacing
// Android Material Design 3 asosida

export const typography = {
  // Android system fonts
  fontFamily: {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium', 
    semibold: 'Roboto-Medium',
    bold: 'Roboto-Bold',
    mono: 'RobotoMono-Regular'
  },
  
  // Font sizes (dp)
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36
  },
  
  // Heading sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  
  // Body sizes
  body1: 16,
  body2: 14,
  caption: 12,
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75
  },
  
  // Font weights - React Native compatible
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    ultralight: '100' as const,
    thin: '200' as const,
    // Numeric values for React Native
    '100': 100,
    '200': 200,
    '300': 300,
    '400': 400,
    '500': 500,
    '600': 600,
    '700': 700,
    '800': 800,
    '900': 900
  } as const
};

export const spacing = {
  xs: 4,    // 4dp
  sm: 8,    // 8dp  
  md: 16,   // 16dp
  lg: 24,   // 24dp
  xl: 32,   // 32dp
  '2xl': 48, // 48dp
  '3xl': 64  // 64dp
};

export const borderRadius = {
  none: 0,
  sm: 8,    // 8dp
  md: 12,   // 12dp
  lg: 16,   // 16dp
  xl: 20,   // 20dp
  full: 9999 // Doiraviy
};

// Oddiy shadow'lar - Platform ga bog'liq emas
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  }
};

// Responsive breakpoints for web
export const breakpoints = {
  mobile: 0,      // 0px va yuqori (mobile-first)
  tablet: 768,    // 768px va yuqori (tablet)
  desktop: 1024,  // 1024px va yuqori (desktop)
  wide: 1440      // 1440px va yuqori (wide screen)
};

// Media queries
export const mediaQueries = {
  mobile: `@media (min-width: ${breakpoints.mobile}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
  wide: `@media (min-width: ${breakpoints.wide}px)`,
  // Max-width queries
  mobileOnly: `@media (max-width: ${breakpoints.tablet - 1}px)`,
  tabletOnly: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
};

// Responsive spacing
export const responsiveSpacing = {
  container: {
    mobile: spacing.md,
    tablet: spacing.lg,
    desktop: spacing.xl
  },
  section: {
    mobile: spacing.lg,
    tablet: spacing.xl,
    desktop: spacing['2xl']
  }
};

// Grid system
export const grid = {
  columns: 12,
  gutter: {
    mobile: spacing.sm,
    tablet: spacing.md,
    desktop: spacing.lg
  },
  container: {
    mobile: '100%',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px'
  }
};

// Typography types
export type FontWeight = typeof typography.fontWeight[keyof typeof typography.fontWeight];
export type FontSize = typeof typography.fontSize[keyof typeof typography.fontSize];
export type Spacing = typeof spacing[keyof typeof spacing];
export type BorderRadius = typeof borderRadius[keyof typeof borderRadius];
