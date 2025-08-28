// Super Admin Profile Screen
// Super Admin uchun profil va chiqish ekrani

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

const ProfileScreen = ({ navigation }: any) => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Chiqish',
      'Haqiqatan ham chiqmoqchimisiz?',
      [
        { text: 'Bekor', style: 'cancel' },
        { text: 'Chiqish', style: 'destructive', onPress: () => dispatch(logout()) },
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Orqaga</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Chiqish</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>👑</Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Super Administrator'}</Text>
          <Text style={styles.userRole}>Super Administrator</Text>
          <Text style={styles.userStatus}>Online</Text>
        </View>

        {/* System Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tizim Ma'lumotlari</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tizim versiyasi:</Text>
              <Text style={styles.infoValue}>v1.0.0</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Oxirgi yangilanish:</Text>
              <Text style={styles.infoValue}>Bugun 14:30</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <Text style={styles.infoValue}>Faol</Text>
            </View>
          </View>
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.primary,
  },
  backButton: {
    padding: spacing.sm,
  },
  backButtonText: {
    color: colors.background,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.background,
  },
  logoutButton: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    ...shadows.sm,
  },
  logoutButtonText: {
    color: colors.background,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  userInfoSection: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.surface,
    margin: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  userRole: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  userStatus: {
    fontSize: typography.fontSize.sm,
    color: colors.success,
    fontWeight: typography.fontWeight.medium,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
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
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md,
  },
  responsibilityCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  responsibilityTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  responsibilityText: {
    fontSize: typography.fontSize.sm,
    color: colors.foreground,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 120,
  },
});

export default ProfileScreen;
