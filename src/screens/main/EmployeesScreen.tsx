// Boshqaruv - Employees Screen
// Xodimlar boshqaruvi ekrani

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, typography, spacing } from '../../theme';

const EmployeesScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Xodimlar</Text>
        <Text style={styles.subtitle}>Bu yerda xodimlar ro'yxati ko'rinadi</Text>
        
        {/* Bottom padding - bottom navigation uchun */}
        <View style={styles.bottomPadding} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.muted,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 120, // Bottom navigation uchun qo'shimcha bo'sh joy (oshirildi)
  },
});

export default EmployeesScreen;
