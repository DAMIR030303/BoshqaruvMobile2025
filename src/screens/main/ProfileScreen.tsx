// Boshqaruv - Profile Screen
// Foydalanuvchi profili ekrani

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Foydalanuvchi'}</Text>
          <Text style={styles.userRole}>
            {user?.role === 'admin' && 'Administrator'}
            {user?.role === 'manager' && 'Manager'}
            {user?.role === 'marketolog' && 'Marketing Boshqaruvchisi'}
            {user?.role === 'user' && 'Xodim'}
          </Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{(user as any)?.email || 'email@example.com'}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Telefon</Text>
            <Text style={styles.infoValue}>{(user as any)?.phone || '+998 90 123 45 67'}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Lavozim</Text>
            <Text style={styles.infoValue}>
              {user?.role === 'admin' && 'Tizim Administratori'}
              {user?.role === 'manager' && 'Boshqaruvchi'}
              {user?.role === 'marketolog' && 'Marketing Mutaxassisi'}
              {user?.role === 'user' && 'Xodim'}
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Chiqish</Text>
        </TouchableOpacity>
        
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
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  avatarText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.background,
  },
  userName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  userRole: {
    fontSize: typography.fontSize.base,
    color: colors.muted,
  },
  profileInfo: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    color: colors.muted,
    fontWeight: typography.fontWeight.medium,
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    fontWeight: typography.fontWeight.medium,
  },
  logoutButton: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  logoutButtonText: {
    color: colors.background,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  bottomPadding: {
    height: 120, // Bottom navigation uchun qo'shimcha bo'sh joy (oshirildi)
  },
});

export default ProfileScreen;
