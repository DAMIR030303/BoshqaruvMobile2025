// Direktor Dashboard
// "Navoiyda Bugun" loyihasi Direktori uchun asosiy ekran

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

import { useAppSelector } from '../../store/hooks';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

const DirectorDashboard = ({ navigation }: any) => {
  const user = useAppSelector(state => state.auth.user);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats] = useState({
    totalEmployees: 10,
    activeProjects: 3,
    pendingTasks: 12,
    completedTasks: 28,
    monthlyRevenue: 18000000, // 18 million so'm
    monthlyGrowth: 8.5,
  });



  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    switch (tabName) {
      case 'dashboard':
        // Dashboard - hozirgi ekran
        break;
      case 'crm':
        Alert.alert('CRM Tizimi', 'AMO CRM tizimi boshqaruvi');
        break;
      case 'marketing':
        Alert.alert('Marketing', 'Marketing va kontent strategiyasi');
        break;
      case 'finance':
        Alert.alert('Moliyaviy', 'Moliyaviy boshqaruv va hisobotlar');
        break;
      case 'profile':
        navigation.navigate('DirectorProfile');
        break;
    }
  };

  const handleDesignSystem = () => {
    // Design System ekraniga o'tish
    navigation.navigate('DesignSystem');
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
                Xush kelibsiz, {user?.name || 'Direktor'}!
              </Text>
              <Text style={styles.roleText}>Loyiha Direktori</Text>
              <Text style={styles.subtitleText}>
                "Navoiyda Bugun" loyihasi boshqaruvi
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Loyiha Statistikasi</Text>
          
          <View style={styles.statsGrid}>
            <StatCard
              title="Jami Xodimlar"
              value={stats.totalEmployees}
              subtitle={`Faol: ${stats.totalEmployees}`}
              color={colors.primary}
              onPress={() => Alert.alert('Xodimlar', `${stats.totalEmployees} ta xodim loyihada ishlayapti`)}
            />
            
            <StatCard
              title="Faol Loyihalar"
              value={stats.activeProjects}
              subtitle={`Vazifalar: ${stats.pendingTasks}`}
              color={colors.success}
              onPress={() => Alert.alert('Loyihalar', `${stats.activeProjects} ta loyiha faol holatda`)}
            />
            
            <StatCard
              title="Oylik Daromad"
              value={`${(stats.monthlyRevenue / 1000000).toFixed(1)}M`}
              subtitle={`O'sish: +${stats.monthlyGrowth}%`}
              color={colors.warning}
              onPress={() => Alert.alert('Moliyaviy', `${stats.monthlyRevenue.toLocaleString()} so'm oylik daromad`)}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Asosiy Vazifalar</Text>
          
          <View style={styles.actionsGrid}>
            <ActionCard
              title="CRM Boshqaruvi"
              subtitle="AMO CRM tizimi va lidlar"
              icon="📊"
              color={colors.primary}
              onPress={() => handleTabPress('crm')}
            />
            
            <ActionCard
              title="Marketing"
              subtitle="Strategiya va kampaniyalar"
              icon="📢"
              color={colors.secondary}
              onPress={() => handleTabPress('marketing')}
            />
            
            <ActionCard
              title="Moliyaviy"
              subtitle="Hisob-kitob va hisobotlar"
              icon="💰"
              color={colors.info}
              onPress={() => handleTabPress('finance')}
            />
            
            <ActionCard
              title="Xodimlar"
              subtitle="Jamoani boshqarish"
              icon="👥"
              color={colors.success}
              onPress={() => Alert.alert('Xodimlar', 'Xodimlar boshqaruvi')}
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
                <Text style={styles.activityText}>Marketing kampaniyasi boshlandi</Text>
                <Text style={styles.activityTime}>Bugun 15:30</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: colors.primary }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>CRM hisobot tayyorlandi</Text>
                <Text style={styles.activityTime}>Bugun 13:15</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: colors.warning }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Moliyaviy hisobot ko'rib chiqildi</Text>
                <Text style={styles.activityTime}>Kecha 17:00</Text>
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
          icon="📊"
          label="CRM"
          isActive={activeTab === 'crm'}
          onPress={() => handleTabPress('crm')}
        />
        <TabButton
          icon="📢"
          label="Marketing"
          isActive={activeTab === 'marketing'}
          onPress={() => handleTabPress('marketing')}
        />
        <TabButton
          icon="💰"
          label="Moliyaviy"
          isActive={activeTab === 'finance'}
          onPress={() => handleTabPress('finance')}
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
    justifyContent: 'center',
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

export default DirectorDashboard;
