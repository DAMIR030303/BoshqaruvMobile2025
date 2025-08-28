// Boshqaruv - Register Screen
// Ro'yxatdan o'tish ekrani

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, typography, spacing } from '../../theme';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ro'yxatdan o'tish</Text>
      <Text style={styles.subtitle}>Bu ekran keyinchalik yaratiladi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
});

export default RegisterScreen;
