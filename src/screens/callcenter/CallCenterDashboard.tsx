// Call-center Operator Dashboard
// "Navoiyda Bugun" loyihasi Call-center operatori uchun asosiy ekran

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

const CallCenterDashboard = ({ navigation }: any) => {
  const user = useAppSelector(state => state.auth.user);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats] = useState({
    totalCalls: 45,
    incomingCalls: 28,
    outgoingCalls: 17,
    leadsProcessed: 12,
    salesCompleted: 8,
    customerSatisfaction: 4.8,
    dailyTarget: 50,
    weeklyTarget: 250,
  });

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    switch (tabName) {
      case 'dashboard':
        // Dashboard - hozirgi ekran
        break;
      case 'crm':
        Alert.alert('CRM Tizimi', 'AMO CRM tizimi va lidlar boshqaruvi');
        break;
      case 'calls':
        Alert.alert('Qo\'ng\'iroqlar', 'Qo\'ng\'iroqlar tarixi va statistikasi');
        break;
      case 'sales':
        Alert.alert('Sotuvlar', 'Sotuvlar va natijalar');
        break;
      case 'profile':
        navigation.navigate('CallCenterProfile');
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
                Xush kelibsiz, {user?.name || 'Madina'}!
              </Text>
              <Text style={styles.roleText}>Call-center Operatori</Text>
              <Text style={styles.subtitleText}>
                "Navoiyda Bugun" loyihasi mijozlar bilan aloqa
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Bugungi Statistika</Text>
          
          <View style={styles.statsGrid}>
            <StatCard
              title="Jami Qo'ng'iroqlar"
              value={stats.totalCalls}
              subtitle={`Maqsad: ${stats.dailyTarget}`}
              color={colors.primary}
              onPress={() => Alert.alert('Qo\'ng\'iroqlar', `${stats.totalCalls} ta qo'ng'iroq bugun amalga oshirildi`)}
            />
            
            <StatCard
              title="Lidlar"
              value={stats.leadsProcessed}
              subtitle={`Sotuvlar: ${stats.salesCompleted}`}
              color={colors.success}
              onPress={() => Alert.alert('Lidlar', `${stats.leadsProcessed} ta lid qayta ishlangan`)}
            />
            
            <StatCard
              title="Mijoz Mamnuniyati"
              value={stats.customerSatisfaction}
              subtitle="5 yulduzdan"
              color={colors.warning}
              onPress={() => Alert.alert('Mamnuniyat', `${stats.customerSatisfaction}/5 mijozlar mamnun`)}
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
              title="Qo'ng'iroqlar"
              subtitle="Kiruvchi va chiquvchi qo'ng'iroqlar"
              icon="📞"
              color={colors.secondary}
              onPress={() => handleTabPress('calls')}
            />
            
            <ActionCard
              title="Sotuvlar"
              subtitle="Sotuvlar va natijalar"
              icon="💰"
              color={colors.info}
              onPress={() => handleTabPress('sales')}
            />
            
            <ActionCard
              title="Mijozlar"
              subtitle="Mijozlar bilan aloqa"
              icon="👥"
              color={colors.success}
              onPress={() => Alert.alert('Mijozlar', 'Mijozlar bilan aloqa va xizmat ko\'rsatish')}
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
                <Text style={styles.activityText}>Yangi mijoz bilan bog'lanish amalga oshirildi</Text>
                <Text style={styles.activityTime}>Bugun 16:45</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: colors.primary }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Lid CRM tizimiga qo'shildi</Text>
                <Text style={styles.activityTime}>Bugun 15:30</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: colors.warning }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Sotuv yakunlandi - 2,500,000 so'm</Text>
                <Text style={styles.activityTime}>Bugun 14:15</Text>
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
          icon="📞"
          label="Qo'ng'iroqlar"
          isActive={activeTab === 'calls'}
          onPress={() => handleTabPress('calls')}
        />
        <TabButton
          icon="💰"
          label="Sotuvlar"
          isActive={activeTab === 'sales'}
          onPress={() => handleTabPress('sales')}
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

export default CallCenterDashboard;
