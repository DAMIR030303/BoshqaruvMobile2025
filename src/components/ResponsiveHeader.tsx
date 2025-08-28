// Boshqaruv - Responsive Header Komponenti
// Web va mobil uchun moslashtirilgan header

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';

import { theme } from '../theme';

interface ResponsiveHeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: {
    icon?: string;
    label?: string;
    onPress: () => void;
  };
  rightActions?: Array<{
    icon?: string;
    label?: string;
    onPress: () => void;
  }>;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  title,
  subtitle,
  leftAction,
  rightActions = [],
  showBackButton = false,
  onBackPress,
}) => {
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  
  const getHeaderLayout = () => {
    if (!isWeb) return 'mobile';
    
    if (width >= theme.breakpoints.desktop) {
      return 'desktop';
    } else if (width >= theme.breakpoints.tablet) {
      return 'tablet';
    }
    return 'mobile';
  };
  
  const headerLayout = getHeaderLayout();
  
  const renderActionButton = (action: { icon?: string; label?: string; onPress: () => void }, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.actionButton,
          headerLayout === 'desktop' && styles.desktopActionButton,
        ]}
        onPress={action.onPress}
      >
        {action.icon && (
          <Text style={[
            styles.actionIcon,
            headerLayout === 'desktop' && styles.desktopActionIcon,
          ]}>
            {action.icon}
          </Text>
        )}
        {action.label && headerLayout !== 'mobile' && (
          <Text style={[
            styles.actionLabel,
            headerLayout === 'desktop' && styles.desktopActionLabel,
          ]}>
            {action.label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[
      styles.header,
      headerLayout === 'desktop' && styles.desktopHeader,
      headerLayout === 'tablet' && styles.tabletHeader,
    ]}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {showBackButton && onBackPress && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        
        {leftAction && renderActionButton(leftAction, -1)}
        
        <View style={styles.titleContainer}>
          <Text style={[
            styles.title,
            headerLayout === 'desktop' && styles.desktopTitle,
          ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[
              styles.subtitle,
              headerLayout === 'desktop' && styles.desktopSubtitle,
            ]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      
      {/* Right Section */}
      <View style={styles.rightSection}>
        {rightActions.map(renderActionButton)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomColor: theme.colors.divider,
    borderBottomWidth: 1,
    elevation: 2,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }),
    minHeight: 60,
  },
  
  desktopHeader: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    minHeight: 80,
  },
  
  tabletHeader: {
    paddingHorizontal: theme.spacing.xl,
    minHeight: 70,
  },
  
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  backButton: {
    marginRight: theme.spacing.md,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  
  backIcon: {
    fontSize: 20,
    color: theme.colors.primary,
  },
  
  titleContainer: {
    flex: 1,
  },
  
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
  },
  
  desktopTitle: {
    fontSize: theme.typography.fontSize.xl,
  },
  
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    marginTop: 2,
  },
  
  desktopSubtitle: {
    fontSize: theme.typography.fontSize.base,
    marginTop: 4,
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'transparent',
  },
  
  desktopActionButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.borderRadius.md,
  },
  
  actionIcon: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  
  desktopActionIcon: {
    fontSize: 16,
  },
  
  actionLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  
  desktopActionLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
  },
});

export default ResponsiveHeader;