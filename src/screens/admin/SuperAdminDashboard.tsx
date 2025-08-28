// Boshqaruv - Super Admin Dashboard
// Super Admin uchun asosiy boshqaruv ekrani

import React, { useState } from 'react';
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

const SuperAdminDashboard = ({ navigation }: any) => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats] = useState({
    totalEmployees: 12, // 1 Super Admin + 1 Admin + 10 Xodim
    activeEmployees: 11,
    pendingTasks: 8,
    completedTasks: 15,
    totalRevenue: 25000000, // 25 million so'm
    monthlyGrowth: 12.5,
  });

  const handleAddEmployee = () => {
    // Xodim qo'shish ekraniga o'tish
    navigation.navigate('AddEmployee');
  };

  const handleManageEmployees = () => {
    // Xodimlar boshqaruvi ekraniga o'tish
    Alert.alert('Xodimlar Boshqaruvi', 'Bu funksiya keyin qo\'shiladi');
  };

  const handleSystemSettings = () => {
    // Tizim sozlamalari ekraniga o'tish
    Alert.alert('Tizim Sozlamalari', 'Bu funksiya keyin qo\'shiladi');
  };

  const handleReports = () => {
    // Hisobotlar ekraniga o'tish
    Alert.alert('Hisobotlar', 'Bu funksiya keyin qo\'shiladi');
  };

  const handleDesignSystem = () => {
    // Design System ekraniga o'tish
    navigation.navigate('DesignSystem');
  };

  const handleLogout = () => {
    // Chiqish
    Alert.alert(
      'Chiqish',
      'Haqiqatan ham chiqmoqchimisiz?',
      [
        {
          text: 'Bekor',
          style: 'cancel',
        },
        {
          text: 'Chiqish',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    switch (tabName) {
      case 'dashboard':
        // Dashboard - hozirgi ekran
        break;
      case 'employees':
        handleManageEmployees();
        break;
      case 'settings':
        handleSystemSettings();
        break;
      case 'reports':
        handleReports();
        break;
      case 'profile':
        navigation.navigate('Profile');
        break;
    }
  };

  const StatCard = ({ title, value, subtitle, color, onPress }: any) => (
    <TouchableOpacity style={[styles.statCard, { borderLeftColor: color }]} onPress={onPress}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const ActionCard = ({ title, subtitle, icon, onPress, color }: any) => (
    <TouchableOpacity style={[styles.actionCard, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.actionIcon}>
        <Text style={styles.actionIconText}>{icon}</Text>
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const TabButton = ({ icon, label, isActive, onPress }: any) => (
    <TouchableOpacity 
      style={[styles.tabButton, isActive && styles.tabButtonActive]} 
      onPress={onPress}
    >
      <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>{icon}</Text>
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>
                Xush kelibsiz, {user?.name || 'Super Admin'}!
              </Text>
              <Text style={styles.roleText}>Super Administrator</Text>
              <Text style={styles.subtitleText}>
                Tizim boshqaruvi va monitoring
              </Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Chiqish</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Tizim Statistikasi</Text>
          
          <View style={styles.statsGrid}>
            <StatCard
              title="Jami Xodimlar"
              value={stats.totalEmployees}
              subtitle={`Faol: ${stats.activeEmployees}`}
              color={colors.primary}
              onPress={() => Alert.alert('Xodimlar', `${stats.totalEmployees} ta xodim tizimda ro'yxatdan o'tgan`)}
            />
            
            <StatCard
              title="Vazifalar"
              value={stats.pendingTasks}
              subtitle={`Bajarilgan: ${stats.completedTasks}`}
              color={colors.success}
              onPress={() => Alert.alert('Vazifalar', `${stats.pendingTasks} ta vazifa kutilmoqda`)}
            />
            
            <StatCard
              title="Oylik Daromad"
              value={`${(stats.totalRevenue / 1000000).toFixed(1)}M`}
              subtitle={`O'sish: +${stats.monthlyGrowth}%`}
              color={colors.warning}
              onPress={() => Alert.alert('Moliyaviy', `${stats.totalRevenue.toLocaleString()} so'm oylik daromad`)}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Tezkor Amallar</Text>
          
          <View style={styles.actionsGrid}>
            <ActionCard
              title="Xodim Qo'shish"
              subtitle="Yangi xodimni tizimga qo'shish"
              icon="👤+"
              color={colors.primary}
              onPress={handleAddEmployee}
            />
            
            <ActionCard
              title="Xodimlar Boshqaruvi"
              subtitle="Mavjud xodimlarni boshqarish"
              icon="👥"
              color={colors.secondary}
              onPress={handleManageEmployees}
            />
            
            <ActionCard
              title="Tizim Sozlamalari"
              subtitle="Tizim parametrlarini sozlash"
              icon="⚙️"
              color={colors.info}
              onPress={handleSystemSettings}
            />
            
            <ActionCard
              title="Hisobotlar"
              subtitle="KPI va hisobotlarni ko'rish"
              icon="📊"
              color={colors.success}
              onPress={handleReports}
            />
            
            <ActionCard
              title="Design System"
              subtitle="Figma integratsiya va dizayn tizimi"
              icon="🎨"
              color={colors.accent}
              onPress={handleDesignSystem}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>So'nggi Faollik</Text>
          
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: colors.success }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Yangi xodim qo'shildi</Text>
                <Text style={styles.activityTime}>Bugun 14:30</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: colors.primary }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Vazifa bajarildi</Text>
                <Text style={styles.activityTime}>Bugun 12:15</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: colors.warning }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Tizim yangilandi</Text>
                <Text style={styles.activityTime}>Kecha 18:00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom padding for bottom navigation */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TabButton
          icon="🏠"
          label="Dashboard"
          isActive={activeTab === 'dashboard'}
          onPress={() => handleTabPress('dashboard')}
        />
        <TabButton
          icon="👥"
          label="Xodimlar"
          isActive={activeTab === 'employees'}
          onPress={() => handleTabPress('employees')}
        />
        <TabButton
          icon="⚙️"
          label="Sozlamalar"
          isActive={activeTab === 'settings'}
          onPress={() => handleTabPress('settings')}
        />
        <TabButton
          icon="📊"
          label="Hisobotlar"
          isActive={activeTab === 'reports'}
          onPress={() => handleTabPress('reports')}
        />
        <TabButton
          icon="👤"
          label="Profil"
          isActive={activeTab === 'profile'}
          onPress={() => handleTabPress('profile')}
        />
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
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.primary,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.background,
    marginBottom: spacing.xs,
  },
  roleText: {
    fontSize: typography.fontSize.base,
    color: colors.background,
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  subtitleText: {
    fontSize: typography.fontSize.sm,
    color: colors.background,
    opacity: 0.8,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  logoutButtonText: {
    color: colors.background,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  statsSection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    marginHorizontal: spacing.xs,
    ...shadows.sm,
  },
  statTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  statSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.muted,
  },
  actionsSection: {
    padding: spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actionIconText: {
    fontSize: typography.fontSize.lg,
  },
  actionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.background,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.background,
    opacity: 0.8,
    textAlign: 'center',
  },
  activitySection: {
    padding: spacing.lg,
  },
  activityList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  activityTime: {
    fontSize: typography.fontSize.sm,
    color: colors.muted,
  },
  bottomPadding: {
    height: 120,
  },
  // Bottom Navigation Styles
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    ...shadows.lg,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  tabButtonActive: {
    backgroundColor: colors.primaryContainer,
  },
  tabIcon: {
    fontSize: typography.fontSize.xl,
    marginBottom: spacing.xs,
  },
  tabIconActive: {
    color: colors.primary,
  },
  tabLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.muted,
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
});

export default SuperAdminDashboard;
