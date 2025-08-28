// Boshqaruv - Sync Center
// Figma va kod o'rtasidagi o'zgarishlarni kuzatish va konfliktlarni hal qilish

import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  RefreshControl,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ResponsiveContainer } from '../../components/ResponsiveContainer';
import { theme } from '../../theme';

interface SyncItem {
  id: string;
  type: 'component' | 'token' | 'style';
  name: string;
  status: 'synced' | 'modified' | 'conflict' | 'new' | 'deleted';
  figmaValue?: any;
  codeValue?: any;
  lastSync: string;
  lastModified: string;
  modifiedBy: string;
  description?: string;
}

interface SyncHistory {
  id: string;
  timestamp: string;
  type: 'sync' | 'conflict_resolved' | 'manual_update';
  itemsCount: number;
  status: 'success' | 'failed' | 'partial';
  details: string;
}

interface ConflictResolution {
  itemId: string;
  resolution: 'use_figma' | 'use_code' | 'merge' | 'skip';
  mergedValue?: any;
}

const SyncCenter: React.FC = () => {
  const navigation = useNavigation();
  const [syncItems, setSyncItems] = useState<SyncItem[]>([]);
  const [syncHistory, setSyncHistory] = useState<SyncHistory[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [selectedConflict, setSelectedConflict] = useState<SyncItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadSyncData();
  }, []);

  const loadSyncData = () => {
    // Mock sync items data
    const mockSyncItems: SyncItem[] = [
      {
        id: '1',
        type: 'component',
        name: 'PrimaryButton',
        status: 'conflict',
        figmaValue: {
          backgroundColor: '#007AFF',
          borderRadius: 8,
          padding: { horizontal: 16, vertical: 12 }
        },
        codeValue: {
          backgroundColor: '#0066CC',
          borderRadius: 6,
          padding: { horizontal: 20, vertical: 14 }
        },
        lastSync: '2024-01-14 10:30',
        lastModified: '2024-01-15 14:20',
        modifiedBy: 'Designer (Figma)',
        description: 'Asosiy tugma komponenti'
      },
      {
        id: '2',
        type: 'token',
        name: 'colors.primary',
        status: 'modified',
        figmaValue: '#007AFF',
        codeValue: '#0066CC',
        lastSync: '2024-01-14 10:30',
        lastModified: '2024-01-15 12:15',
        modifiedBy: 'Developer (Code)',
        description: 'Asosiy rang'
      },
      {
        id: '3',
        type: 'token',
        name: 'spacing.lg',
        status: 'synced',
        figmaValue: 24,
        codeValue: 24,
        lastSync: '2024-01-15 09:00',
        lastModified: '2024-01-15 09:00',
        modifiedBy: 'System',
        description: 'Katta bo\'shliq'
      },
      {
        id: '4',
        type: 'component',
        name: 'TextInput',
        status: 'new',
        figmaValue: {
          borderWidth: 1,
          borderColor: '#E5E5E7',
          borderRadius: 8,
          padding: { horizontal: 12, vertical: 10 }
        },
        lastSync: 'Hech qachon',
        lastModified: '2024-01-15 16:45',
        modifiedBy: 'Designer (Figma)',
        description: 'Yangi matn kiritish maydoni'
      },
      {
        id: '5',
        type: 'style',
        name: 'typography.heading1',
        status: 'deleted',
        codeValue: {
          fontSize: 32,
          fontWeight: 'bold',
          lineHeight: 40
        },
        lastSync: '2024-01-10 14:20',
        lastModified: '2024-01-15 11:30',
        modifiedBy: 'Designer (Figma)',
        description: 'Birinchi daraja sarlavha'
      }
    ];

    const mockSyncHistory: SyncHistory[] = [
      {
        id: '1',
        timestamp: '2024-01-15 09:00',
        type: 'sync',
        itemsCount: 15,
        status: 'success',
        details: '15 ta element muvaffaqiyatli sinxronlashtirildi'
      },
      {
        id: '2',
        timestamp: '2024-01-14 16:30',
        type: 'conflict_resolved',
        itemsCount: 3,
        status: 'success',
        details: '3 ta konflikt hal qilindi'
      },
      {
        id: '3',
        timestamp: '2024-01-14 10:30',
        type: 'sync',
        itemsCount: 12,
        status: 'partial',
        details: '12 ta elementdan 8 tasi sinxronlashtirildi, 4 ta konflikt'
      },
      {
        id: '4',
        timestamp: '2024-01-13 14:15',
        type: 'manual_update',
        itemsCount: 5,
        status: 'success',
        details: '5 ta element qo\'lda yangilandi'
      }
    ];

    setSyncItems(mockSyncItems);
    setSyncHistory(mockSyncHistory);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    loadSyncData();
    setIsRefreshing(false);
  };

  const handleSyncAll = async () => {
    setSyncInProgress(true);
    
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const updatedItems = syncItems.map(item => {
      if (item.status === 'modified' || item.status === 'new') {
        return {
          ...item,
          status: 'synced' as const,
          codeValue: item.figmaValue,
          lastSync: new Date().toLocaleString('uz-UZ')
        };
      }
      return item;
    });
    
    setSyncItems(updatedItems);
    setSyncInProgress(false);
    Alert.alert('Muvaffaqiyat', 'Barcha elementlar sinxronlashtirildi');
  };

  const handleSyncSelected = async () => {
    if (selectedItems.size === 0) {
      Alert.alert('Xato', 'Iltimos, sinxronlashtirish uchun elementlarni tanlang');
      return;
    }

    setSyncInProgress(true);
    
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedItems = syncItems.map(item => {
      if (selectedItems.has(item.id) && item.status !== 'conflict') {
        return {
          ...item,
          status: 'synced' as const,
          codeValue: item.figmaValue,
          lastSync: new Date().toLocaleString('uz-UZ')
        };
      }
      return item;
    });
    
    setSyncItems(updatedItems);
    setSelectedItems(new Set());
    setSyncInProgress(false);
    Alert.alert('Muvaffaqiyat', `${selectedItems.size} ta element sinxronlashtirildi`);
  };

  const handleConflictResolve = (resolution: ConflictResolution) => {
    if (!selectedConflict) return;

    const updatedItems = syncItems.map(item => {
      if (item.id === resolution.itemId) {
        let newValue;
        switch (resolution.resolution) {
          case 'use_figma':
            newValue = item.figmaValue;
            break;
          case 'use_code':
            newValue = item.codeValue;
            break;
          case 'merge':
            newValue = resolution.mergedValue;
            break;
          default:
            return item;
        }
        
        return {
          ...item,
          status: 'synced' as const,
          codeValue: newValue,
          figmaValue: newValue,
          lastSync: new Date().toLocaleString('uz-UZ')
        };
      }
      return item;
    });
    
    setSyncItems(updatedItems);
    setShowConflictModal(false);
    setSelectedConflict(null);
    Alert.alert('Muvaffaqiyat', 'Konflikt hal qilindi');
  };

  const toggleItemSelection = (itemId: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return theme.colors.success;
      case 'modified': return theme.colors.warning;
      case 'conflict': return theme.colors.danger;
      case 'new': return theme.colors.info;
      case 'deleted': return theme.colors.muted;
      default: return theme.colors.muted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'synced': return 'Sinxronlashgan';
      case 'modified': return 'O\'zgartirilgan';
      case 'conflict': return 'Konflikt';
      case 'new': return 'Yangi';
      case 'deleted': return 'O\'chirilgan';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'component': return '🧩';
      case 'token': return '🎨';
      case 'style': return '✨';
      default: return '📄';
    }
  };

  const filteredItems = syncItems.filter(item => 
    filterStatus === 'all' || item.status === filterStatus
  );

  const conflictItems = syncItems.filter(item => item.status === 'conflict');
  const modifiedItems = syncItems.filter(item => item.status === 'modified' || item.status === 'new');

  const renderSyncItem = (item: SyncItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.syncItem,
        selectedItems.has(item.id) && styles.selectedSyncItem
      ]}
      onPress={() => {
        if (item.status === 'conflict') {
          setSelectedConflict(item);
          setShowConflictModal(true);
        } else {
          toggleItemSelection(item.id);
        }
      }}
    >
      <View style={styles.itemHeader}>
        <View style={styles.itemInfo}>
          <View style={styles.itemTitleRow}>
            <Text style={styles.itemIcon}>{getTypeIcon(item.type)}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) }
            ]}>
              <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
            </View>
          </View>
          
          {item.description && (
            <Text style={styles.itemDescription}>{item.description}</Text>
          )}
        </View>
        
        {item.status !== 'conflict' && (
          <View style={[
            styles.checkbox,
            selectedItems.has(item.id) && styles.checkedCheckbox
          ]} />
        )}
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemMeta}>Oxirgi sinx: {item.lastSync}</Text>
        <Text style={styles.itemMeta}>O'zgartirgan: {item.modifiedBy}</Text>
        <Text style={styles.itemMeta}>Vaqt: {item.lastModified}</Text>
      </View>
      
      {item.status === 'conflict' && (
        <View style={styles.conflictIndicator}>
          <Text style={styles.conflictText}>Konfliktni hal qilish uchun bosing</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderHistoryItem = (item: SyncHistory) => (
    <View key={item.id} style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyType}>
          {item.type === 'sync' ? '🔄' : item.type === 'conflict_resolved' ? '✅' : '✏️'}
          {' '}
          {item.type === 'sync' ? 'Sinxronlash' : 
           item.type === 'conflict_resolved' ? 'Konflikt hal qilindi' : 'Qo\'lda yangilash'}
        </Text>
        <View style={[
          styles.historyStatus,
          { backgroundColor: 
            item.status === 'success' ? theme.colors.success :
            item.status === 'failed' ? theme.colors.danger :
            theme.colors.warning
          }
        ]}>
          <Text style={styles.historyStatusText}>
            {item.status === 'success' ? 'Muvaffaq' :
             item.status === 'failed' ? 'Xato' : 'Qisman'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.historyDetails}>{item.details}</Text>
      <Text style={styles.historyTime}>{item.timestamp}</Text>
    </View>
  );

  const renderFilterTab = (status: string, label: string, count?: number) => (
    <TouchableOpacity
      key={status}
      style={[
        styles.filterTab,
        filterStatus === status && styles.activeFilterTab
      ]}
      onPress={() => setFilterStatus(status)}
    >
      <Text style={[
        styles.filterTabText,
        filterStatus === status && styles.activeFilterTabText
      ]}>
        {label} {count !== undefined && `(${count})`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveContainer>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Sinxronlash Markazi</Text>
              <Text style={styles.subtitle}>Figma va kod o'rtasidagi o'zgarishlarni kuzating</Text>
            </View>
            
            <View style={styles.headerActions}>
              <View style={styles.autoSyncContainer}>
                <Text style={styles.autoSyncLabel}>Avto</Text>
                <Switch
                  value={autoSync}
                  onValueChange={setAutoSync}
                  trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                  thumbColor={theme.colors.background}
                  style={styles.autoSyncSwitch}
                />
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{conflictItems.length}</Text>
              <Text style={styles.statLabel}>Konflikt</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{modifiedItems.length}</Text>
              <Text style={styles.statLabel}>O'zgartirilgan</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{selectedItems.size}</Text>
              <Text style={styles.statLabel}>Tanlangan</Text>
            </View>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {renderFilterTab('all', 'Barchasi', syncItems.length)}
          {renderFilterTab('conflict', 'Konfliktlar', conflictItems.length)}
          {renderFilterTab('modified', 'O\'zgartirilgan', modifiedItems.length)}
          {renderFilterTab('synced', 'Sinxronlashgan')}
          {renderFilterTab('new', 'Yangi')}
        </ScrollView>

        <ScrollView 
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
            />
          }
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sinxronlash Elementlari</Text>
              
              <View style={styles.sectionActions}>
                {selectedItems.size > 0 && (
                  <TouchableOpacity
                    style={styles.syncSelectedButton}
                    onPress={handleSyncSelected}
                    disabled={syncInProgress}
                  >
                    <Text style={styles.syncSelectedButtonText}>
                      Tanlanganlarni sinx ({selectedItems.size})
                    </Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity
                  style={[
                    styles.syncAllButton,
                    syncInProgress && styles.disabledButton
                  ]}
                  onPress={handleSyncAll}
                  disabled={syncInProgress}
                >
                  <Text style={styles.syncAllButtonText}>
                    {syncInProgress ? 'Sinxronlanmoqda...' : 'Barchasini sinx'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {filteredItems.map(renderSyncItem)}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sinxronlash Tarixi</Text>
            {syncHistory.map(renderHistoryItem)}
          </View>
        </ScrollView>

        {/* Conflict Resolution Modal */}
        <Modal
          visible={showConflictModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Konfliktni Hal Qilish</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowConflictModal(false)}
              >
                <Text style={styles.closeButtonText}>Yopish</Text>
              </TouchableOpacity>
            </View>

            {selectedConflict && (
              <ScrollView style={styles.modalContent}>
                <View style={styles.conflictInfo}>
                  <Text style={styles.conflictName}>{selectedConflict.name}</Text>
                  <Text style={styles.conflictDescription}>
                    {selectedConflict.description}
                  </Text>
                </View>

                <View style={styles.conflictOptions}>
                  <Text style={styles.optionsTitle}>Qaysi qiymatni ishlatishni tanlang:</Text>
                  
                  <TouchableOpacity
                    style={styles.conflictOption}
                    onPress={() => handleConflictResolve({
                      itemId: selectedConflict.id,
                      resolution: 'use_figma'
                    })}
                  >
                    <View style={styles.optionHeader}>
                      <Text style={styles.optionTitle}>Figma Qiymati</Text>
                      <Text style={styles.optionBadge}>Tavsiya etiladi</Text>
                    </View>
                    <Text style={styles.optionValue}>
                      {JSON.stringify(selectedConflict.figmaValue, null, 2)}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.conflictOption}
                    onPress={() => handleConflictResolve({
                      itemId: selectedConflict.id,
                      resolution: 'use_code'
                    })}
                  >
                    <View style={styles.optionHeader}>
                      <Text style={styles.optionTitle}>Kod Qiymati</Text>
                    </View>
                    <Text style={styles.optionValue}>
                      {JSON.stringify(selectedConflict.codeValue, null, 2)}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.conflictOption, styles.skipOption]}
                    onPress={() => {
                      setShowConflictModal(false);
                      setSelectedConflict(null);
                    }}
                  >
                    <Text style={styles.skipOptionText}>Hozircha o'tkazib yuborish</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </SafeAreaView>
        </Modal>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
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
  headerActions: {
    alignItems: 'flex-end',
  },
  autoSyncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autoSyncLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foreground,
    marginRight: theme.spacing.xs,
  },
  autoSyncSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
  },
  filtersContainer: {
    maxHeight: 50,
  },
  filtersContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  filterTab: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  activeFilterTab: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterTabText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foreground,
    fontWeight: theme.typography.fontWeight.medium,
  },
  activeFilterTabText: {
    color: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
  },
  sectionActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  syncSelectedButton: {
    backgroundColor: theme.colors.info,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  syncSelectedButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  syncAllButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  disabledButton: {
    opacity: 0.5,
  },
  syncAllButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  syncItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    ...theme.shadows.sm,
  },
  selectedSyncItem: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  itemIcon: {
    fontSize: theme.typography.fontSize.lg,
    marginRight: theme.spacing.sm,
  },
  itemName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
    flex: 1,
  },
  statusBadge: {
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  statusText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.background,
    fontWeight: theme.typography.fontWeight.medium,
  },
  itemDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },
  checkedCheckbox: {
    backgroundColor: theme.colors.primary,
  },
  itemDetails: {
    marginTop: theme.spacing.sm,
  },
  itemMeta: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
  },
  conflictIndicator: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.danger + '20',
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.danger,
  },
  conflictText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.danger,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  historyItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  historyType: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
  },
  historyStatus: {
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  historyStatusText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.background,
    fontWeight: theme.typography.fontWeight.medium,
  },
  historyDetails: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
  },
  historyTime: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.muted,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  closeButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.base,
  },
  modalContent: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  conflictInfo: {
    marginBottom: theme.spacing.xl,
  },
  conflictName: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  conflictDescription: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.muted,
  },
  conflictOptions: {
    gap: theme.spacing.md,
  },
  optionsTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.md,
  },
  conflictOption: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  optionTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
  },
  optionBadge: {
    backgroundColor: theme.colors.success,
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  optionValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    fontFamily: theme.typography.fontFamily.mono,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  skipOption: {
    backgroundColor: theme.colors.muted + '20',
    borderColor: theme.colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipOptionText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.muted,
    fontWeight: theme.typography.fontWeight.medium,
  },
});

export default SyncCenter;