// Boshqaruv - Responsive Navigation Komponenti
// Web va mobil uchun moslashtirilgan navigation

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';

import { theme } from '../theme';

interface NavigationItem {
  key: string;
  label: string;
  icon?: string;
  onPress: () => void;
}

interface ResponsiveNavigationProps {
  items: NavigationItem[];
  activeKey?: string;
  variant?: 'bottom' | 'sidebar' | 'top';
}

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({
  items,
  activeKey,
  variant = 'bottom'
}) => {
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const [currentActiveKey] = useState(activeKey || items[0]?.key);
  
  // Web da katta ekranlarda sidebar, kichik ekranlarda bottom navigation
  const getNavigationType = () => {
    if (!isWeb) return 'bottom';
    
    if (width >= theme.breakpoints.desktop) {
      return variant === 'bottom' ? 'sidebar' : variant;
    } else if (width >= theme.breakpoints.tablet) {
      return variant === 'sidebar' ? 'top' : variant;
    }
    return 'bottom';
  };
  
  const navigationType = getNavigationType();
  
  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = currentActiveKey === item.key;
    
    return (
      <TouchableOpacity
        key={item.key}
        style={[
          styles.navItem,
          navigationType === 'sidebar' && styles.sidebarItem,
          navigationType === 'top' && styles.topItem,
          isActive && styles.activeItem,
          isActive && navigationType === 'sidebar' && styles.activeSidebarItem,
        ]}
        onPress={item.onPress}
      >
        {item.icon && (
          <View style={[
            styles.iconContainer,
            navigationType === 'sidebar' && styles.sidebarIcon,
          ]}>
            <Text style={[styles.icon, isActive && styles.activeIcon]}>
              {item.icon}
            </Text>
          </View>
        )}
        <Text style={[
          styles.label,
          navigationType === 'sidebar' && styles.sidebarLabel,
          isActive && styles.activeLabel,
        ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
  
  if (navigationType === 'sidebar') {
    return (
      <View style={styles.sidebar}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>Boshqaruv</Text>
        </View>
        <View style={styles.sidebarContent}>
          {items.map(renderNavigationItem)}
        </View>
      </View>
    );
  }
  
  if (navigationType === 'top') {
    return (
      <View style={styles.topNavigation}>
        <View style={styles.topNavContent}>
          {items.map(renderNavigationItem)}
        </View>
      </View>
    );
  }
  
  // Bottom navigation (default)
  return (
    <View style={styles.bottomNavigation}>
      {items.map(renderNavigationItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  // Bottom Navigation
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.divider,
    borderTopWidth: 1,
    height: 90,
    paddingBottom: 30,
    paddingTop: 12,
    paddingHorizontal: 16,
    elevation: 12,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.15)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    }),
  },
  
  // Sidebar Navigation
  sidebar: {
    width: 280,
    backgroundColor: theme.colors.surface,
    borderRightColor: theme.colors.divider,
    borderRightWidth: 1,
    height: '100%',
    elevation: 4,
    ...(Platform.OS === 'web' ? {
      boxShadow: '2px 0px 8px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    }),
  },
  
  sidebarHeader: {
    padding: theme.spacing.lg,
    borderBottomColor: theme.colors.divider,
    borderBottomWidth: 1,
  },
  
  sidebarTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  
  sidebarContent: {
    flex: 1,
    paddingTop: theme.spacing.md,
  },
  
  // Top Navigation
  topNavigation: {
    backgroundColor: theme.colors.surface,
    borderBottomColor: theme.colors.divider,
    borderBottomWidth: 1,
    elevation: 4,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }),
  },
  
  topNavContent: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  
  // Navigation Items
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
  },
  
  sidebarItem: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    marginHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  
  topItem: {
    flex: 0,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  
  activeItem: {
    backgroundColor: theme.colors.primary + '20',
  },
  
  activeSidebarItem: {
    backgroundColor: theme.colors.primary + '15',
  },
  
  // Icons and Labels
  iconContainer: {
    marginBottom: theme.spacing.xs,
  },
  
  sidebarIcon: {
    marginBottom: 0,
    marginRight: theme.spacing.md,
  },
  
  icon: {
    fontSize: 24,
    color: theme.colors.muted,
  },
  
  activeIcon: {
    color: theme.colors.primary,
  },
  
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    textAlign: 'center',
  },
  
  sidebarLabel: {
    fontSize: theme.typography.fontSize.base,
    textAlign: 'left',
  },
  
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
});

export default ResponsiveNavigation;