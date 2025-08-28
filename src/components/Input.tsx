// Boshqaruv - Responsive Input Komponenti
// Web va mobil uchun moslashtirilgan input field

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Dimensions, 
  Platform,
  TouchableOpacity,
  ViewStyle,
  TextStyle 
} from 'react-native';

import { theme } from '../theme';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'phone';
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'filled' | 'underlined';
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: string;
  onIconPress?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  type = 'text',
  size = 'medium',
  variant = 'outlined',
  error,
  helperText,
  disabled = false,
  required = false,
  icon,
  onIconPress,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  style,
  inputStyle,
  labelStyle,
}) => {
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const getInputLayout = () => {
    if (!isWeb) return 'mobile';
    
    if (width >= theme.breakpoints.desktop) {
      return 'desktop';
    } else if (width >= theme.breakpoints.tablet) {
      return 'tablet';
    }
    return 'mobile';
  };
  
  const inputLayout = getInputLayout();
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          container: styles.outlinedContainer,
          input: styles.outlinedInput,
          focused: styles.outlinedFocused,
          error: styles.outlinedError,
        };
      case 'filled':
        return {
          container: styles.filledContainer,
          input: styles.filledInput,
          focused: styles.filledFocused,
          error: styles.filledError,
        };
      case 'underlined':
        return {
          container: styles.underlinedContainer,
          input: styles.underlinedInput,
          focused: styles.underlinedFocused,
          error: styles.underlinedError,
        };
      default:
        return {
          container: styles.outlinedContainer,
          input: styles.outlinedInput,
          focused: styles.outlinedFocused,
          error: styles.outlinedError,
        };
    }
  };
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          input: styles.smallInput,
          label: styles.smallLabel,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          input: styles.largeInput,
          label: styles.largeLabel,
        };
      default:
        return {
          container: styles.mediumContainer,
          input: styles.mediumInput,
          label: styles.mediumLabel,
        };
    }
  };
  
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  
  const getInputType = () => {
    if (type === 'password') {
      return 'default';
    }
    if (type === 'email') return 'email-address';
    if (type === 'phone') return 'phone-pad';
    if (type === 'number') return 'numeric';
    return 'default';
  };
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text style={[
          styles.label,
          sizeStyles.label,
          required && styles.requiredLabel,
          labelStyle,
        ]}>
          {label}
          {required && <Text style={styles.requiredStar}> *</Text>}
        </Text>
      )}
      
      <View style={[
        styles.container,
        variantStyles.container,
        sizeStyles.container,
        isFocused && variantStyles.focused,
        error ? variantStyles.error : undefined,
        disabled && styles.disabled,
        inputLayout === 'desktop' && styles.desktopContainer,
        inputLayout === 'tablet' && styles.tabletContainer,
      ]}>
        <TextInput
          style={[
            styles.input,
            variantStyles.input,
            sizeStyles.input,
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={type === 'password' && !showPassword}
          keyboardType={getInputType()}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          autoCorrect={type === 'email' ? false : true}
        />
        
        {icon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onIconPress || (type === 'password' ? togglePasswordVisibility : undefined)}
            disabled={!onIconPress && type !== 'password'}
          >
            <Text style={styles.icon}>
              {type === 'password' ? (showPassword ? '👁️' : '👁️‍🗨️') : icon}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {(error || helperText) && (
        <Text style={[
          styles.helperText,
          error ? styles.errorText : undefined,
        ]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  
  // Variant styles
  outlinedContainer: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border,
  },
  outlinedInput: {
    color: theme.colors.text,
  },
  outlinedFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  outlinedError: {
    borderColor: theme.colors.error,
  },
  
  filledContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderColor: 'transparent',
  },
  filledInput: {
    color: theme.colors.text,
  },
  filledFocused: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  filledError: {
    borderColor: theme.colors.error,
    borderWidth: 1,
  },
  
  underlinedContainer: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  underlinedInput: {
    color: theme.colors.text,
  },
  underlinedFocused: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 2,
  },
  underlinedError: {
    borderBottomColor: theme.colors.error,
  },
  
  // Size styles
  smallContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  smallInput: {
    fontSize: 14,
  },
  smallLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  
  mediumContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  mediumInput: {
    fontSize: 16,
  },
  mediumLabel: {
    fontSize: 14,
    marginBottom: 6,
  },
  
  largeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 52,
  },
  largeInput: {
    fontSize: 18,
  },
  largeLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  
  // Layout styles
  desktopContainer: {
    minHeight: 48,
  },
  
  tabletContainer: {
    minHeight: 44,
  },
  
  // Input styles
  input: {
    flex: 1,
    color: theme.colors.text,
    fontWeight: '400',
  },
  
  // Icon styles
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  
  icon: {
    fontSize: 18,
    color: theme.colors.textSecondary,
  },
  
  // Label styles
  label: {
    color: theme.colors.text,
    fontWeight: '500',
    marginBottom: 4,
  },
  
  requiredLabel: {
    fontWeight: '600',
  },
  
  requiredStar: {
    color: theme.colors.error,
  },
  
  // Helper text styles
  helperText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
    marginLeft: 4,
  },
  
  errorText: {
    color: theme.colors.error,
  },
  
  // State styles
  disabled: {
    opacity: 0.5,
  },
});

export default Input;
