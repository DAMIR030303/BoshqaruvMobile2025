// Boshqaruv - Loading Spinner Komponenti
// Web va mobil uchun moslashtirilgan loading indicator

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Platform,
  ActivityIndicator,
  ViewStyle 
} from 'react-native';

import { theme } from '../theme';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
  color?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  text,
  variant = 'spinner',
  color,
  fullScreen = false,
  style,
}) => {
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  
  const getSpinnerLayout = () => {
    if (!isWeb) return 'mobile';
    
    if (width >= theme.breakpoints.desktop) {
      return 'desktop';
    } else if (width >= theme.breakpoints.tablet) {
      return 'tablet';
    }
    return 'mobile';
  };
  
  const spinnerLayout = getSpinnerLayout();
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          spinner: styles.smallSpinner,
          text: styles.smallText,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          spinner: styles.largeSpinner,
          text: styles.largeText,
        };
      default:
        return {
          container: styles.mediumContainer,
          spinner: styles.mediumSpinner,
          text: styles.mediumText,
        };
    }
  };
  
  const sizeStyles = getSizeStyles();
  const spinnerColor = color || theme.colors.primary;
  
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: spinnerColor },
                  index === 0 ? styles.dot0 : index === 1 ? styles.dot1 : styles.dot2,
                ]}
              />
            ))}
          </View>
        );
      case 'pulse':
        return (
          <View style={[styles.pulseContainer, { backgroundColor: spinnerColor }]} />
        );
      default:
        return (
          <ActivityIndicator 
            size={size === 'small' ? 'small' : 'large'} 
            color={spinnerColor} 
          />
        );
    }
  };
  
  if (fullScreen) {
    return (
      <View style={[styles.fullScreenContainer, style]}>
        <View style={[styles.fullScreenContent, sizeStyles.container]}>
          {renderSpinner()}
          {text && (
            <Text style={[styles.fullScreenText, sizeStyles.text]}>
              {text}
            </Text>
          )}
        </View>
      </View>
    );
  }
  
  return (
    <View style={[
      styles.container,
      sizeStyles.container,
      spinnerLayout === 'desktop' && styles.desktopContainer,
      spinnerLayout === 'tablet' && styles.tabletContainer,
      style,
    ]}>
      {renderSpinner()}
      {text && (
        <Text style={[
          styles.text,
          sizeStyles.text,
          spinnerLayout === 'desktop' && styles.desktopText,
        ]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Container styles
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  
  fullScreenContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: 16,
    padding: 32,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  
  // Size styles
  smallContainer: {
    padding: 12,
  },
  smallSpinner: {
    marginBottom: 8,
  },
  smallText: {
    fontSize: 12,
  },
  
  mediumContainer: {
    padding: 16,
  },
  mediumSpinner: {
    marginBottom: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  
  largeContainer: {
    padding: 24,
  },
  largeSpinner: {
    marginBottom: 16,
  },
  largeText: {
    fontSize: 16,
  },
  
  // Layout styles
  desktopContainer: {
    minWidth: 200,
  },
  
  tabletContainer: {
    minWidth: 150,
  },
  
  // Text styles
  text: {
    color: theme.colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  fullScreenText: {
    color: theme.colors.text,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },
  
  desktopText: {
    fontSize: 18,
  },
  
  // Dots animation styles
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  
  dot0: {
    opacity: 0.3,
    transform: [{ scale: 0.8 }],
  },
  
  dot1: {
    opacity: 0.6,
    transform: [{ scale: 0.9 }],
  },
  
  dot2: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  
  // Pulse animation styles
  pulseContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.6,
  },
});

export default LoadingSpinner;
