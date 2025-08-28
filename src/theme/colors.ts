// Boshqaruv - Rang Palitra
// Android Material Design 3 asosida

export const colors = {
  // Asosiy ranglar
  primary: '#2563EB',        // Asosiy ko'k rang
  primaryVariant: '#1D4ED8', // Kuchliroq ko'k
  primaryContainer: '#DBEAFE', // Primary container
  secondary: '#10B981',      // Yashil (muvaffaqiyat)
  secondaryVariant: '#059669',
  secondaryContainer: '#D1FAE5', // Secondary container
  warning: '#F59E0B',        // Sariq (ogohlantirish)
  warningVariant: '#D97706',
  warningContainer: '#FEF3C7', // Warning container
  danger: '#EF4444',         // Qizil (xavfli)
  dangerVariant: '#DC2626',
  dangerContainer: '#FEE2E2', // Danger container
  
  // Neutral ranglar
  background: '#FFFFFF',     // Light mode fon
  backgroundDark: '#0B1220', // Dark mode fon
  surface: '#F8FAFC',
  surfaceDark: '#1E293B',
  foreground: '#0B1220',     // Matn rangi
  foregroundDark: '#F1F5F9',
  muted: '#94A3B8',          // Ikkinchi darajali matn
  mutedDark: '#64748B',
  
  // Android specific
  ripple: '#E2E8F0',
  divider: '#E2E8F0',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Status ranglar
  success: '#10B981',
  info: '#3B82F6',
  error: '#EF4444',
  accent: '#8B5CF6',  // Purple accent color for design system
  
  // Text ranglar
  text: '#0B1220',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  white: '#FFFFFF',
  
  // Background ranglar
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  
  // Border ranglar
  border: '#E2E8F0',
  
  // Shadow ranglar
  shadow: '#000000',
  
  // Light variants
  primaryLight: '#DBEAFE',
  secondaryLight: '#D1FAE5',
  warningLight: '#FEF3C7',
  errorLight: '#FEE2E2',
  infoLight: '#DBEAFE',
  
  // Dark variants
  primaryDark: '#1E40AF',
  secondaryDark: '#047857',
  warningDark: '#B45309',
  errorDark: '#B91C1C',
  infoDark: '#1D4ED8'
};

export type ColorScheme = 'light' | 'dark';

export const getColors = (scheme: ColorScheme) => {
  if (scheme === 'dark') {
    return {
      ...colors,
      background: colors.backgroundDark,
      surface: colors.surfaceDark,
      foreground: colors.foregroundDark,
      muted: colors.mutedDark,
    };
  }
  return colors;
};
