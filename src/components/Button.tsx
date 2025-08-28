// Boshqaruv - Responsive Button Komponenti
// Web va mobil uchun moslashtirilgan button

import React from 'react';
import { 
  TouchableOpacity, 
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle 
} from 'react-native';

import { theme } from '../theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconPosition?: 'left' | 'right';
  testID?: string;
  containerStyle?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  testID,
  containerStyle,
  textStyle,
}) => {

  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
        };
      case 'secondary':
        return {
          container: styles.secondaryContainer,
          text: styles.secondaryText,
        };
      case 'outline':
        return {
          container: styles.outlineContainer,
          text: styles.outlineText,
        };
      case 'danger':
        return {
          container: styles.dangerContainer,
          text: styles.dangerText,
        };
      case 'ghost':
        return {
          container: styles.ghostContainer,
          text: styles.ghostText,
        };
      default:
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
        };
    }
  };
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          text: styles.smallText,
          icon: styles.smallIcon,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          text: styles.largeText,
          icon: styles.largeIcon,
        };
      default:
        return {
          container: styles.mediumContainer,
          text: styles.mediumText,
          icon: styles.mediumIcon,
        };
    }
  };
  
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  
  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        variantStyles.container,
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        disabled && styles.disabledContainer,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : theme.colors.white}
          testID="loading-indicator"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Text style={[
              sizeStyles.icon,
              styles.iconLeft,
              variantStyles.text,
            ]}>
              {icon}
            </Text>
          )}
          
          <Text style={[
            sizeStyles.text,
            variantStyles.text,
            disabled && styles.disabledText,
            textStyle,
          ]}>
            {title}
          </Text>
          
          {icon && iconPosition === 'right' && (
            <Text style={[
              sizeStyles.icon,
              styles.iconRight,
              variantStyles.text,
            ]}>
              {icon}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

// Oddiy style obyektlar - StyleSheet ga bog'liq emas
const styles = {
  baseButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  
  // Variant styles
  primaryContainer: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  primaryText: {
    color: theme.colors.white,
  },
  
  secondaryContainer: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  secondaryText: {
    color: theme.colors.white,
  },
  
  outlineContainer: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  
  dangerContainer: {
    backgroundColor: theme.colors.error,
    borderColor: theme.colors.error,
  },
  dangerText: {
    color: theme.colors.white,
  },
  
  ghostContainer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  ghostText: {
    color: theme.colors.primary,
  },
  
  // Size styles
  smallContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minHeight: 32,
  },
  smallText: {
    fontSize: 12,
    fontWeight: '500' as const,
  },
  smallIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  
  mediumContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40,
  },
  mediumText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  mediumIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  
  largeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 48,
  },
  largeText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  largeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  
  // Layout styles
  fullWidth: {
    width: '100%' as const,
  },
  
  // Icon styles
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  
  // Disabled styles
  disabledContainer: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
  
  // Loading styles
  loadingContainer: {
    opacity: 0.8,
  },
  
  // Error styles
  errorContainer: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
  },
};

export default Button;
