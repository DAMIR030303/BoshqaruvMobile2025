// Boshqaruv - Dashboard Screen
// Asosiy dashboard ekrani - yangi komponentlar bilan

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ResponsiveContainer, ResponsiveGrid, Button, Card, ResponsiveHeader } from '../../components';
import useResponsive, { useResponsiveValue, useResponsiveColumns } from '../../hooks/useResponsive';
import { useAppSelector } from '../../store/hooks';
import { colors, spacing, typography } from '../../theme';

const DashboardScreen = () => {
  const user = useAppSelector(state => state.auth.user);
  const { isWeb, isDesktop, isMobile } = useResponsive();
  
  // Responsive values
  const kpiColumns = useResponsiveColumns({ mobile: 1, tablet: 2, desktop: 3 });
  const actionColumns = useResponsiveColumns({ mobile: 2, tablet: 3, desktop: 4 });
  const containerPadding = useResponsiveValue({
    mobile: spacing.lg,
    tablet: spacing.xl,
    desktop: spacing['2xl'],
  });

  const kpiData = {
    attendance: {
      present: 45,
      late: 3,
      absent: 2,
      total: 50,
      percentage: 90,
      color: colors.success,
      icon: '👥',
    },
    tasks: {
      completed: 28,
      inProgress: 12,
      pending: 8,
      total: 48,
      completionRate: 58,
      color: colors.primary,
      icon: '✅',
    },
    penalties: {
      active: 5,
      resolved: 15,
      total: 20,
      resolutionRate: 75,
      color: colors.warning,
      icon: '⚠️',
    },
    performance: {
      score: 85,
      level: 'Yaxshi',
      trend: '+5%',
      color: colors.info,
      icon: '📈',
    },
  };

  const quickActions = [
    {
      title: 'Davomat',
      subtitle: 'Bugungi davomat',
      icon: '📅',
      action: () => console.log('Davomat'),
      color: colors.primary,
    },
    {
      title: 'Vazifalar',
      subtitle: 'Vazifalarni ko\'rish',
      icon: '📋',
      action: () => console.log('Vazifalar'),
      color: colors.success,
    },
    {
      title: 'Hisobot',
      subtitle: 'Haftalik hisobot',
      icon: '📊',
      action: () => console.log('Hisobot'),
      color: colors.info,
    },
    {
      title: 'Sozlamalar',
      subtitle: 'Profil sozlamalari',
      icon: '⚙️',
      action: () => console.log('Sozlamalar'),
      color: colors.secondary,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'task',
      title: 'Yangi vazifa qo\'shildi',
      description: 'Marketing loyihasi uchun vazifa',
      time: '2 soat oldin',
      icon: '📝',
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Davomat tasdiqlandi',
      description: 'Bugungi davomat tasdiqlandi',
      time: '4 soat oldin',
      icon: '✅',
    },
    {
      id: 3,
      type: 'notification',
      title: 'Yangi xabar',
      description: 'Jamoaviy yig\'ilish haqida',
      time: '6 soat oldin',
      icon: '🔔',
    },
  ];

  const KPICard = ({ title, value, subtitle, color, icon, trend }: any) => (
    <Card
      variant="elevated"
      size="medium"
      style={styles.kpiCard}
    >
      <View style={styles.kpiContent}>
        <View style={styles.kpiHeader}>
          <Text style={styles.kpiIcon}>{icon}</Text>
          <View style={[styles.kpiIndicator, { backgroundColor: color }]} />
        </View>
        <Text style={styles.kpiTitle}>{title}</Text>
        <Text style={styles.kpiValue}>{value}</Text>
        <Text style={styles.kpiSubtitle}>{subtitle}</Text>
        {trend && (
          <Text style={[styles.kpiTrend, { color: trend.startsWith('+') ? colors.success : colors.error }]}>
            {trend}
          </Text>
        )}
      </View>
    </Card>
  );

  const QuickActionCard = ({ title, subtitle, icon, action, color }: any) => (
    <Card
      variant="outlined"
      size="small"
      onPress={action}
      style={styles.actionCard}
    >
      <View style={styles.actionContent}>
        <Text style={[styles.actionIcon, { color }]}>{icon}</Text>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>
    </Card>
  );

  const ActivityItem = ({ type: _type, title, description, time, icon }: any) => (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Text style={styles.activityIconText}>{icon}</Text>
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityDescription}>{description}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ResponsiveContainer>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={[
            styles.contentContainer,
            isWeb && isDesktop && styles.desktopContent
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <ResponsiveHeader
            title="Dashboard"
            subtitle={`Xush kelibsiz, ${user?.name || 'Foydalanuvchi'}!`}
            rightActions={[
              {
                icon: '🔔',
                label: 'Xabarlar',
                onPress: () => console.log('Xabarlar'),
              },
              {
                icon: '⚙️',
                label: 'Sozlamalar',
                onPress: () => console.log('Sozlamalar'),
              },
            ]}
          />

          {/* KPI Cards */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Asosiy Ko'rsatkichlar</Text>
            <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap={spacing.md}>
              <KPICard
                title="Davomat"
                value={`${kpiData.attendance.percentage}%`}
                subtitle={`${kpiData.attendance.present}/${kpiData.attendance.total} xodim`}
                color={kpiData.attendance.color}
                icon={kpiData.attendance.icon}
                trend="+2%"
              />
              <KPICard
                title="Vazifalar"
                value={`${kpiData.tasks.completionRate}%`}
                subtitle={`${kpiData.tasks.completed}/${kpiData.tasks.total} bajarildi`}
                color={kpiData.tasks.color}
                icon={kpiData.tasks.icon}
                trend="+8%"
              />
              <KPICard
                title="Jarimalar"
                value={`${kpiData.penalties.resolutionRate}%`}
                subtitle={`${kpiData.penalties.resolved}/${kpiData.penalties.total} hal qilindi`}
                color={kpiData.penalties.color}
                icon={kpiData.penalties.icon}
                trend="-3%"
              />
              <KPICard
                title="Samaradorlik"
                value={kpiData.performance.score}
                subtitle={kpiData.performance.level}
                color={kpiData.performance.color}
                icon={kpiData.performance.icon}
                trend="+5%"
              />
            </ResponsiveGrid>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tezkor Amallar</Text>
            <ResponsiveGrid columns={{ mobile: 2, tablet: 3, desktop: 4 }} gap={spacing.md}>
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </ResponsiveGrid>
          </View>

          {/* Recent Activities */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>So'nggi Faolliklar</Text>
              <Button
                title="Barchasini ko'rish"
                variant="ghost"
                size="small"
                onPress={() => console.log('Barcha faolliklar')}
              />
            </View>
            <Card variant="outlined" padding="none">
              {recentActivities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ActivityItem {...activity} />
                  {index < recentActivities.length - 1 && (
                    <View style={styles.activityDivider} />
                  )}
                </React.Fragment>
              ))}
            </Card>
          </View>

          {/* Performance Chart Placeholder */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>O\'tgan Hafta Samaradorligi</Text>
            <Card variant="filled" size="large">
              <View style={styles.chartPlaceholder}>
                <Text style={styles.chartPlaceholderText}>📊</Text>
                <Text style={styles.chartPlaceholderTitle}>Grafik ko'rsatiladi</Text>
                <Text style={styles.chartPlaceholderSubtitle}>
                  Bu yerda haftalik samaradorlik grafigi ko'rsatiladi
                </Text>
              </View>
            </Card>
          </View>
        </ScrollView>
      </ResponsiveContainer>
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
  
  contentContainer: {
    padding: spacing.lg,
  },
  
  desktopContent: {
    padding: spacing['2xl'],
  },
  
  section: {
    marginBottom: spacing.xl,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  sectionTitle: {
    fontSize: typography.h4,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  
  // KPI Cards
  kpiCard: {
    minHeight: 120,
  },
  
  kpiContent: {
    alignItems: 'center',
    padding: spacing.md,
  },
  
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  kpiIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  
  kpiIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  kpiTitle: {
    fontSize: typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  kpiValue: {
    fontSize: typography.h3,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  kpiSubtitle: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  kpiTrend: {
    fontSize: typography.caption,
    fontWeight: '600',
  },
  
  // Action Cards
  actionCard: {
    minHeight: 100,
  },
  
  actionContent: {
    alignItems: 'center',
    padding: spacing.md,
  },
  
  actionIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  
  actionTitle: {
    fontSize: typography.body1,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  actionSubtitle: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  // Activity Items
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  
  activityIconText: {
    fontSize: 18,
  },
  
  activityContent: {
    flex: 1,
  },
  
  activityTitle: {
    fontSize: typography.body1,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  
  activityDescription: {
    fontSize: typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  
  activityTime: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  
  activityDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  
  // Chart Placeholder
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    minHeight: 200,
  },
  
  chartPlaceholderText: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  
  chartPlaceholderTitle: {
    fontSize: typography.h5,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  
  chartPlaceholderSubtitle: {
    fontSize: typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default DashboardScreen;
