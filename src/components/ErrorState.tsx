// Boshqaruv - Error State Komponenti
// Web va mobil uchun moslashtirilgan error display

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Platform,
  ViewStyle 
} from 'react-native';

import { theme } from '../theme';

import Button from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: string;
  variant?: 'error' | 'warning' | 'info' | 'empty';
  size?: 'small' | 'medium' | 'large';
  showRetry?: boolean;
  showAction?: boolean;
  actionText?: string;
  onRetry?: () => void;
  onAction?: () => void;
  style?: ViewStyle;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  icon,
  variant = 'error',
  size = 'medium',
  showRetry = false,
  showAction = false,
  actionText = 'Boshqa narsa qilish',
  onRetry,
  onAction,
  style,
}) => {
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  
  const getErrorLayout = () => {
    if (!isWeb) return 'mobile';
    
    if (width >= theme.breakpoints.desktop) {
      return 'desktop';
    } else if (width >= theme.breakpoints.tablet) {
      return 'tablet';
    }
    return 'mobile';
  };
  
  const errorLayout = getErrorLayout();
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'error':
        return {
          container: styles.errorContainer,
          icon: styles.errorIcon,
          title: styles.errorTitle,
          message: styles.errorMessage,
        };
      case 'warning':
        return {
          container: styles.warningContainer,
          icon: styles.warningIcon,
          title: styles.warningTitle,
          message: styles.warningMessage,
        };
      case 'info':
        return {
          container: styles.infoContainer,
          icon: styles.infoIcon,
          title: styles.infoTitle,
          message: styles.infoMessage,
        };
      case 'empty':
        return {
          container: styles.emptyContainer,
          icon: styles.emptyIcon,
          title: styles.emptyTitle,
          message: styles.emptyMessage,
        };
      default:
        return {
          container: styles.errorContainer,
          icon: styles.errorIcon,
          title: styles.errorTitle,
          message: styles.errorMessage,
        };
    }
  };
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          icon: styles.smallIcon,
          title: styles.smallTitle,
          message: styles.smallMessage,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          icon: styles.largeIcon,
          title: styles.largeTitle,
          message: styles.largeMessage,
        };
      default:
        return {
          container: styles.mediumContainer,
          icon: styles.mediumIcon,
          title: styles.mediumTitle,
          message: styles.mediumMessage,
        };
    }
  };
  
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  
  const getDefaultIcon = () => {
    if (icon) return icon;
    
    switch (variant) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'empty':
        return '📭';
      default:
        return '❌';
    }
  };
  
  const getDefaultTitle = () => {
    if (title) return title;
    
    switch (variant) {
      case 'error':
        return 'Xatolik yuz berdi';
      case 'warning':
        return 'Ogohlantirish';
      case 'info':
        return 'Ma\'lumot';
      case 'empty':
        return 'Ma\'lumot topilmadi';
      default:
        return 'Xatolik yuz berdi';
    }
  };
  
  const getDefaultMessage = () => {
    if (message) return message;
    
    switch (variant) {
      case 'error':
        return 'Kechirasiz, biror xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.';
      case 'warning':
        return 'E\'tibor bering, bu ogohlantirish xabari.';
      case 'info':
        return 'Bu ma\'lumot sizga foydali bo\'lishi mumkin.';
      case 'empty':
        return 'Hozircha hech qanday ma\'lumot mavjud emas.';
      default:
        return 'Kechirasiz, biror xatolik yuz berdi.';
    }
  };
  
  return (
    <View style={[
      styles.container,
      variantStyles.container,
      sizeStyles.container,
      errorLayout === 'desktop' && styles.desktopContainer,
      errorLayout === 'tablet' && styles.tabletContainer,
      style,
    ]}>
      <Text style={[
        styles.icon,
        variantStyles.icon,
        sizeStyles.icon,
      ]}>
        {getDefaultIcon()}
      </Text>
      
      <Text style={[
        styles.title,
        variantStyles.title,
        sizeStyles.title,
        errorLayout === 'desktop' && styles.desktopTitle,
      ]}>
        {getDefaultTitle()}
      </Text>
      
      <Text style={[
        styles.message,
        variantStyles.message,
        sizeStyles.message,
        errorLayout === 'desktop' && styles.desktopMessage,
      ]}>
        {getDefaultMessage()}
      </Text>
      
      <View style={styles.actions}>
        {showRetry && onRetry && (
          <Button
            title="Qaytadan urinish"
            variant="outline"
            size="medium"
            onPress={onRetry}
            style={styles.retryButton}
          />
        )}
        
        {showAction && onAction && (
          <Button
            title={actionText}
            variant="primary"
            size="medium"
            onPress={onAction}
            style={styles.actionButton}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderRadius: 12,
  },
  
  // Variant styles
  errorContainer: {
    backgroundColor: theme.colors.errorLight,
    borderColor: theme.colors.error,
    borderWidth: 1,
  },
  errorIcon: {
    color: theme.colors.error,
  },
  errorTitle: {
    color: theme.colors.error,
  },
  errorMessage: {
    color: theme.colors.errorDark,
  },
  
  warningContainer: {
    backgroundColor: theme.colors.warningLight,
    borderColor: theme.colors.warning,
    borderWidth: 1,
  },
  warningIcon: {
    color: theme.colors.warning,
  },
  warningTitle: {
    color: theme.colors.warning,
  },
  warningMessage: {
    color: theme.colors.warningDark,
  },
  
  infoContainer: {
    backgroundColor: theme.colors.infoLight,
    borderColor: theme.colors.info,
    borderWidth: 1,
  },
  infoIcon: {
    color: theme.colors.info,
  },
  infoTitle: {
    color: theme.colors.info,
  },
  infoMessage: {
    color: theme.colors.infoDark,
  },
  
  emptyContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  emptyIcon: {
    color: theme.colors.textSecondary,
  },
  emptyTitle: {
    color: theme.colors.text,
  },
  emptyMessage: {
    color: theme.colors.textSecondary,
  },
  
  // Size styles
  smallContainer: {
    padding: 16,
  },
  smallIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  smallTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  smallMessage: {
    fontSize: 14,
    marginBottom: 16,
  },
  
  mediumContainer: {
    padding: 24,
  },
  mediumIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  mediumTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  mediumMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  
  largeContainer: {
    padding: 32,
  },
  largeIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  largeTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  largeMessage: {
    fontSize: 18,
    marginBottom: 24,
  },
  
  // Layout styles
  desktopContainer: {
    minWidth: 400,
    padding: 40,
  },
  
  tabletContainer: {
    minWidth: 300,
    padding: 32,
  },
  
  // Icon styles
  icon: {
    textAlign: 'center',
  },
  
  // Title styles
  title: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  
  desktopTitle: {
    fontSize: 24,
  },
  
  // Message styles
  message: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  
  desktopMessage: {
    fontSize: 18,
    lineHeight: 26,
  },
  
  // Actions styles
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  
  retryButton: {
    minWidth: 120,
  },
  
  actionButton: {
    minWidth: 120,
  },
});

export default ErrorState;
