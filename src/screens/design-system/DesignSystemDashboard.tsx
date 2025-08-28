// Boshqaruv - Design System Dashboard
// Figma integratsiyasi asosiy dashboard sahifasi

import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ResponsiveContainer } from '../../components/ResponsiveContainer';
import { ResponsiveGrid } from '../../components/ResponsiveGrid';
import { theme } from '../../theme';

interface ComponentLibraryItem {
  id: string;
  name: string;
  category: string;
  figmaNodeId?: string;
  lastModified: string;
  status: 'synced' | 'outdated' | 'new';
}

interface DesignToken {
  id: string;
  name: string;
  category: 'color' | 'typography' | 'spacing' | 'border' | 'shadow';
  value: string;
  platform: string;
  lastSync: string;
}

interface SyncStatus {
  lastSync: string;
  status: 'success' | 'error' | 'syncing';
  componentsCount: number;
  tokensCount: number;
  conflicts: number;
}

const DesignSystemDashboard: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'components' | 'tokens' | 'sync'>('components');
  const [components, setComponents] = useState<ComponentLibraryItem[]>([]);
  const [tokens, setTokens] = useState<DesignToken[]>([]);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    lastSync: '2024-01-15 14:30',
    status: 'success',
    componentsCount: 24,
    tokensCount: 156,
    conflicts: 0
  });

  useEffect(() => {
    // Mock data - bu yerda Figma API dan ma'lumotlar olinadi
    setComponents([
      {
        id: '1',
        name: 'PrimaryButton',
        category: 'buttons',
        figmaNodeId: '1:23',
        lastModified: '2024-01-15 12:00',
        status: 'synced'
      },
      {
        id: '2',
        name: 'TextInput',
        category: 'inputs',
        figmaNodeId: '1:24',
        lastModified: '2024-01-14 16:30',
        status: 'outdated'
      },
      {
        id: '3',
        name: 'NavigationCard',
        category: 'cards',
        lastModified: '2024-01-15 10:15',
        status: 'new'
      }
    ]);

    setTokens([
      {
        id: '1',
        name: 'primary-blue',
        category: 'color',
        value: '#2563EB',
        platform: 'react-native',
        lastSync: '2024-01-15 14:30'
      },
      {
        id: '2',
        name: 'heading-large',
        category: 'typography',
        value: '32px',
        platform: 'react-native',
        lastSync: '2024-01-15 14:30'
      },
      {
        id: '3',
        name: 'spacing-md',
        category: 'spacing',
        value: '16px',
        platform: 'react-native',
        lastSync: '2024-01-15 14:30'
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced':
      case 'success':
        return theme.colors.success;
      case 'outdated':
      case 'error':
        return theme.colors.warning;
      case 'new':
      case 'syncing':
        return theme.colors.info;
      default:
        return theme.colors.muted;
    }
  };

  const renderTabButton = (tab: 'components' | 'tokens' | 'sync', title: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && styles.activeTabButton
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[
        styles.tabButtonText,
        activeTab === tab && styles.activeTabButtonText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderComponentCard = (component: ComponentLibraryItem) => (
    <View key={component.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{component.name}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(component.status) }
        ]}>
          <Text style={styles.statusText}>{component.status}</Text>
        </View>
      </View>
      <Text style={styles.cardSubtitle}>{component.category}</Text>
      <Text style={styles.cardMeta}>Oxirgi o'zgarish: {component.lastModified}</Text>
      {component.figmaNodeId && (
        <Text style={styles.cardMeta}>Figma ID: {component.figmaNodeId}</Text>
      )}
    </View>
  );

  const renderTokenCard = (token: DesignToken) => (
    <View key={token.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{token.name}</Text>
        <View style={styles.tokenPreview}>
          {token.category === 'color' ? (
            <View style={[
              styles.colorPreview,
              { backgroundColor: token.value }
            ]} />
          ) : (
            <Text style={styles.tokenValue}>{token.value}</Text>
          )}
        </View>
      </View>
      <Text style={styles.cardSubtitle}>{token.category}</Text>
      <Text style={styles.cardMeta}>Platform: {token.platform}</Text>
      <Text style={styles.cardMeta}>Oxirgi sinxronizatsiya: {token.lastSync}</Text>
    </View>
  );

  const renderSyncStatus = () => (
    <View style={styles.syncContainer}>
      <View style={styles.syncHeader}>
        <Text style={styles.sectionTitle}>Sinxronizatsiya Holati</Text>
        <TouchableOpacity style={styles.syncButton}>
          <Text style={styles.syncButtonText}>Sinxronlash</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.syncStatsContainer}>
        <View style={styles.syncStat}>
          <Text style={styles.syncStatNumber}>{syncStatus.componentsCount}</Text>
          <Text style={styles.syncStatLabel}>Komponentlar</Text>
        </View>
        <View style={styles.syncStat}>
          <Text style={styles.syncStatNumber}>{syncStatus.tokensCount}</Text>
          <Text style={styles.syncStatLabel}>Tokenlar</Text>
        </View>
        <View style={styles.syncStat}>
          <Text style={styles.syncStatNumber}>{syncStatus.conflicts}</Text>
          <Text style={styles.syncStatLabel}>Konfliktlar</Text>
        </View>
      </View>

      <View style={styles.syncStatusCard}>
        <View style={styles.syncStatusHeader}>
          <Text style={styles.syncStatusTitle}>Oxirgi Sinxronizatsiya</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(syncStatus.status) }
          ]}>
            <Text style={styles.statusText}>{syncStatus.status}</Text>
          </View>
        </View>
        <Text style={styles.syncStatusTime}>{syncStatus.lastSync}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveContainer>
        <View style={styles.header}>
          <Text style={styles.title}>Dizayn Tizimi</Text>
          <Text style={styles.subtitle}>Figma integratsiyasi va komponentlar kutubxonasi</Text>
        </View>

        <View style={styles.tabContainer}>
          {renderTabButton('components', 'Komponentlar')}
          {renderTabButton('tokens', 'Tokenlar')}
          {renderTabButton('sync', 'Sinxronizatsiya')}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === 'components' && (
            <ResponsiveGrid>
              {components.map(renderComponentCard)}
            </ResponsiveGrid>
          )}

          {activeTab === 'tokens' && (
            <ResponsiveGrid>
              {tokens.map(renderTokenCard)}
            </ResponsiveGrid>
          )}

          {activeTab === 'sync' && renderSyncStatus()}
        </ScrollView>
      </ResponsiveContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.muted,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  tabButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  activeTabButton: {
    backgroundColor: theme.colors.primary,
  },
  tabButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    fontWeight: theme.typography.fontWeight.medium,
  },
  activeTabButtonText: {
    color: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
    flex: 1,
  },
  cardSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
  },
  cardMeta: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.background,
    fontWeight: theme.typography.fontWeight.medium,
  },
  tokenPreview: {
    alignItems: 'center',
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  tokenValue: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.muted,
    fontFamily: theme.typography.fontFamily.mono,
  },
  syncContainer: {
    flex: 1,
  },
  syncHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  syncButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  syncButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  syncStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
  },
  syncStat: {
    alignItems: 'center',
  },
  syncStatNumber: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  syncStatLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
  },
  syncStatusCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  syncStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  syncStatusTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
  },
  syncStatusTime: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
  },
});

export default DesignSystemDashboard;