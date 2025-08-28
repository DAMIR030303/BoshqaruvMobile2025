/**
 * Boshqaruv - Responsive Card Komponenti
 * Web va mobil uchun moslashtirilgan card
 * 
 * @author Damir Nurmurodov
 * @version 1.0.0
 * @created 2025
 */

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Platform,
  TouchableOpacity,
  ViewStyle,
  TextStyle 
} from 'react-native';

import { theme } from '../theme';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled' | 'flat';
  size?: 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  headerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  variant = 'elevated',
  size = 'medium',
  padding = 'medium',
  onPress,
  disabled = false,
  style,
  titleStyle,
  subtitleStyle,
  headerStyle,
  contentStyle,
}) => {
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  
  const getCardLayout = () => {
    if (!isWeb) return 'mobile';
    
    if (width >= theme.breakpoints.desktop) {
      return 'desktop';
    } else if (width >= theme.breakpoints.tablet) {
      return 'tablet';
    }
    return 'mobile';
  };
  
  const cardLayout = getCardLayout();
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          container: styles.elevatedContainer,
          shadow: styles.elevatedShadow,
        };
      case 'outlined':
        return {
          container: styles.outlinedContainer,
          shadow: null,
        };
      case 'filled':
        return {
          container: styles.filledContainer,
          shadow: null,
        };
      case 'flat':
        return {
          container: styles.flatContainer,
          shadow: null,
        };
      default:
        return {
          container: styles.elevatedContainer,
          shadow: styles.elevatedShadow,
        };
    }
  };
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          title: styles.smallTitle,
          subtitle: styles.smallSubtitle,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          title: styles.largeTitle,
          subtitle: styles.largeSubtitle,
        };
      default:
        return {
          container: styles.mediumContainer,
          title: styles.mediumTitle,
          subtitle: styles.mediumSubtitle,
        };
    }
  };
  
  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return styles.noPadding;
      case 'small':
        return styles.smallPadding;
      case 'large':
        return styles.largePadding;
      default:
        return styles.mediumPadding;
    }
  };
  
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const paddingStyles = getPaddingStyles();
  
  if (onPress) {
    return (
      <TouchableOpacity
        style={[
          styles.baseCard,
          variantStyles.container,
          sizeStyles.container,
          variantStyles.shadow,
          disabled && styles.disabled,
          cardLayout === 'desktop' && styles.desktopCard,
          cardLayout === 'tablet' && styles.tabletCard,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {(title || subtitle) && (
          <View style={[styles.header, headerStyle]}>
            {title && (
              <Text style={[
                styles.title,
                sizeStyles.title,
                titleStyle,
              ]}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={[
                styles.subtitle,
                sizeStyles.subtitle,
                subtitleStyle,
              ]}>
                {subtitle}
              </Text>
            )}
          </View>
        )}
        
        <View style={[
          styles.content,
          paddingStyles,
          contentStyle,
        ]}>
          {children}
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <View
      style={[
        styles.baseCard,
        variantStyles.container,
        sizeStyles.container,
        variantStyles.shadow,
        disabled && styles.disabled,
        cardLayout === 'desktop' && styles.desktopCard,
        cardLayout === 'tablet' && styles.tabletCard,
        style,
      ]}
    >
      {(title || subtitle) && (
        <View style={[styles.header, headerStyle]}>
          {title && (
            <Text style={[
              styles.title,
              sizeStyles.title,
              titleStyle,
            ]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={[
              styles.subtitle,
              sizeStyles.subtitle,
              subtitleStyle,
            ]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
      
      <View style={[
        styles.content,
        paddingStyles,
        contentStyle,
      ]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseCard: {
    borderRadius: 12,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  
  // Variant styles
  elevatedContainer: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  elevatedShadow: {
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  outlinedContainer: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  
  filledContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  
  flatContainer: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  
  // Size styles
  smallContainer: {
    minHeight: 80,
  },
  smallTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  smallSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  
  mediumContainer: {
    minHeight: 120,
  },
  mediumTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  mediumSubtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  
  largeContainer: {
    minHeight: 160,
  },
  largeTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  largeSubtitle: {
    fontSize: 18,
    fontWeight: '400',
  },
  
  // Padding styles
  noPadding: {
    padding: 0,
  },
  
  smallPadding: {
    padding: 12,
  },
  
  mediumPadding: {
    padding: 16,
  },
  
  largePadding: {
    padding: 24,
  },
  
  // Layout styles
  desktopCard: {
    minWidth: 300,
  },
  
  tabletCard: {
    minWidth: 250,
  },
  
  // Header styles
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  
  title: {
    color: theme.colors.text,
    marginBottom: 4,
  },
  
  subtitle: {
    color: theme.colors.textSecondary,
  },
  
  // Content styles
  content: {
    flex: 1,
  },
  
  // State styles
  disabled: {
    opacity: 0.5,
  },
});

export default Card;
