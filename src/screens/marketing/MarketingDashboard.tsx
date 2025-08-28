// Marketing Manager Dashboard
// "Navoiyda Bugun" loyihasi Marketing boshqaruvchisi uchun asosiy ekran

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

const MarketingDashboard = ({ navigation }: any) => {
  const user = useAppSelector(state => state.auth.user);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats] = useState({
    dailyPosts: 16,
    dailyVideos: 12,
    totalFollowers: 125000,
    engagementRate: 8.5,
    monthlyReach: 2500000,
    contentQuality: 94.2,
    activeCampaigns: 5,
    weeklyGrowth: 12.8,
  });

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    switch (tabName) {
      case 'dashboard':
        // Dashboard - hozirgi ekran
        break;
      case 'instagram':
        Alert.alert('Instagram Boshqaruvi', 'Kuniga 15-18 ta post yuklash va nazorat qilish');
        break;
      case 'video':
        Alert.alert('Video Montaj', 'Kuniga 10-15 ta video (reels) montaj qilish');
        break;
      case 'content':
        Alert.alert('Kontent Monitoring', 'Post va reels natijalarini kuzatish va tahlil qilish');
        break;
      case 'strategy':
        Alert.alert('Marketing Strategiya', 'Kampaniyalar natijalarini monitoring va yangi strategiyalar');
        break;
      case 'profile':
        navigation.navigate('MarketingProfile');
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
                Xush kelibsiz, {user?.name || 'Shaxriddin'}!
              </Text>
              <Text style={styles.roleText}>Marketing Boshqaruvchisi</Text>
              <Text style={styles.subtitleText}>
                "Navoiyda Bugun" loyihasi marketing va kontent boshqaruvi
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Marketing Statistikasi</Text>

          <View style={styles.statsGrid}>
            <StatCard
              title="Kunlik Postlar"
              value={stats.dailyPosts}
              subtitle={`Hedef: 15-18 ta`}
              color={colors.primary}
              onPress={() => Alert.alert('Kunlik Postlar', `${stats.dailyPosts} ta post yuklandi`)}
            />

            <StatCard
              title="Kunlik Videolar"
              value={stats.dailyVideos}
              subtitle={`Hedef: 10-15 ta`}
              color={colors.success}
              onPress={() => Alert.alert('Kunlik Videolar', `${stats.dailyVideos} ta video montaj qilindi`)}
            />

            <StatCard
              title="Followers"
              value={`${(stats.totalFollowers / 1000).toFixed(1)}K`}
              subtitle={`O'sish: +${stats.weeklyGrowth}%`}
              color={colors.warning}
              onPress={() => Alert.alert('Followers', `${stats.totalFollowers.toLocaleString()} ta follower`)}
            />
          </View>

          <View style={styles.statsGrid}>
            <StatCard
              title="Engagement"
              value={`${stats.engagementRate}%`}
              subtitle={`Yuqori sifat`}
              color={colors.info}
              onPress={() => Alert.alert('Engagement', `${stats.engagementRate}% engagement rate`)}
            />

            <StatCard
              title="Aylik Reach"
              value={`${(stats.monthlyReach / 1000000).toFixed(1)}M`}
              subtitle={`Auditoriya`}
              color={colors.secondary}
              onPress={() => Alert.alert('Aylik Reach', `${stats.monthlyReach.toLocaleString()} ta ko'rish`)}
            />

            <StatCard
              title="Kontent Sifati"
              value={`${stats.contentQuality}%`}
              subtitle={`Yuqori standart`}
              color={colors.success}
              onPress={() => Alert.alert('Kontent Sifati', `${stats.contentQuality}% sifat ko'rsatkichi`)}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Asosiy Vazifalar</Text>

          <View style={styles.actionsGrid}>
            <ActionCard
              title="Instagram Boshqaruvi"
              subtitle="Kuniga 15-18 ta post yuklash va nazorat qilish"
              icon="📱"
              color={colors.primary}
              onPress={() => handleTabPress('instagram')}
            />

            <ActionCard
              title="Video Montaj"
              subtitle="Kuniga 10-15 ta video (reels) montaj qilish"
              icon="🎬"
              color={colors.secondary}
              onPress={() => handleTabPress('video')}
            />

            <ActionCard
              title="Kontent Monitoring"
              subtitle="Post va reels natijalarini kuzatish va tahlil qilish"
              icon="📊"
              color={colors.info}
              onPress={() => handleTabPress('content')}
            />

            <ActionCard
              title="Marketing Strategiya"
              subtitle="Kampaniyalar natijalarini monitoring va yangi strategiyalar"
              icon="🎯"
              color={colors.warning}
              onPress={() => handleTabPress('strategy')}
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
                <Text style={styles.activityText}>Kunlik 16 ta post yuklandi - Instagram</Text>
                <Text style={styles.activityTime}>Bugun 18:00</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: colors.primary }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>12 ta video montaj qilindi - Reels</Text>
                <Text style={styles.activityTime}>Bugun 17:30</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: colors.warning }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Haftalik kontent reja tayyorlandi</Text>
                <Text style={styles.activityTime}>Kecha 19:00</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: colors.info }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>GPT yordamida 25 ta caption tayyorlandi</Text>
                <Text style={styles.activityTime}>Kecha 18:30</Text>
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
          icon="📱"
          label="Instagram"
          isActive={activeTab === 'instagram'}
          onPress={() => handleTabPress('instagram')}
        />
        <TabButton
          icon="🎬"
          label="Video"
          isActive={activeTab === 'video'}
          onPress={() => handleTabPress('video')}
        />
        <TabButton
          icon="📊"
          label="Monitoring"
          isActive={activeTab === 'content'}
          onPress={() => handleTabPress('content')}
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
    marginBottom: spacing.md,
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

export default MarketingDashboard;
