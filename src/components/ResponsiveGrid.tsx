// Boshqaruv - Responsive Grid Komponenti
// Web versiyasi uchun responsive grid tizimi

import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';

import { theme } from '../theme';

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: number;
}

interface GridItemProps {
  children: React.ReactNode;
  span?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = theme.spacing.md
}) => {
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  
  const getCurrentColumns = () => {
    // Agar columns number bo'lsa, uni qaytarish
    if (typeof columns === 'number') {
      return columns;
    }
    
    // Object bo'lsa, responsive logic
    if (width >= theme.breakpoints.desktop) {
      return columns?.desktop || 3;
    } else if (width >= theme.breakpoints.tablet) {
      return columns?.tablet || 2;
    }
    return columns?.mobile || 1;
  };

  const gridStyle = {
    ...styles.grid,
    gap: isWeb ? gap : undefined,
    flexDirection: isWeb ? ('row' as const) : ('column' as const),
    flexWrap: isWeb ? ('wrap' as const) : ('nowrap' as const),
  };

  // Web uchun CSS Grid ishlatish
  if (isWeb) {
    const webGridStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(${getCurrentColumns()}, 1fr)`,
      gap: gap,
      width: '100%',
    };
    
    return (
      <View style={[styles.container, webGridStyle as any]}>
        {children}
      </View>
    );
  }

  return (
    <View style={gridStyle}>
      {children}
    </View>
  );
};

const GridItem: React.FC<GridItemProps> = ({
  children,
  span = { mobile: 1, tablet: 1, desktop: 1 }
}) => {
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  
  const getCurrentSpan = () => {
    if (width >= theme.breakpoints.desktop) {
      return span.desktop || 1;
    } else if (width >= theme.breakpoints.tablet) {
      return span.tablet || 1;
    }
    return span.mobile || 1;
  };

  const itemStyle = {
    ...styles.gridItem,
    gridColumn: isWeb ? `span ${getCurrentSpan()}` : undefined,
  };

  return (
    <View style={itemStyle as any}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    width: '100%',
  },
  gridItem: {
    flex: 1,
  },
});

export { ResponsiveGrid, GridItem };
export default ResponsiveGrid;