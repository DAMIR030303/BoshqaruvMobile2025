// Boshqaruv - Token Manager
// Dizayn tokenlarini boshqarish (ranglar, tipografiya, spacing)

import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ResponsiveContainer } from '../../components/ResponsiveContainer';
import { theme } from '../../theme';

interface DesignToken {
  id: string;
  name: string;
  value: string;
  type: 'color' | 'typography' | 'spacing' | 'borderRadius' | 'shadow';
  category: string;
  description?: string;
  figmaValue?: string;
  isModified: boolean;
  lastSync: string;
}

interface TokenCategory {
  name: string;
  type: string;
  count: number;
  lastSync: string;
}

const TokenManager: React.FC = () => {
  const navigation = useNavigation();
  const [tokens, setTokens] = useState<DesignToken[]>([]);
  const [categories, setCategories] = useState<TokenCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<DesignToken | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  useEffect(() => {
    // Mock design tokens data
    const mockTokens: DesignToken[] = [
      // Color tokens
      {
        id: '1',
        name: 'primary',
        value: '#007AFF',
        type: 'color',
        category: 'colors',
        description: 'Asosiy rang',
        figmaValue: '#007AFF',
        isModified: false,
        lastSync: '2024-01-15 12:00'
      },
      {
        id: '2',
        name: 'secondary',
        value: '#5856D6',
        type: 'color',
        category: 'colors',
        description: 'Ikkinchi darajali rang',
        figmaValue: '#5856D6',
        isModified: false,
        lastSync: '2024-01-15 12:00'
      },
      {
        id: '3',
        name: 'success',
        value: '#34C759',
        type: 'color',
        category: 'colors',
        description: 'Muvaffaqiyat rangi',
        figmaValue: '#30D158',
        isModified: true,
        lastSync: '2024-01-14 10:30'
      },
      // Typography tokens
      {
        id: '4',
        name: 'fontSize.xl',
        value: '20px',
        type: 'typography',
        category: 'typography',
        description: 'Katta matn o\'lchami',
        figmaValue: '20px',
        isModified: false,
        lastSync: '2024-01-15 12:00'
      },
      {
        id: '5',
        name: 'fontWeight.bold',
        value: '700',
        type: 'typography',
        category: 'typography',
        description: 'Qalin matn',
        figmaValue: '700',
        isModified: false,
        lastSync: '2024-01-15 12:00'
      },
      // Spacing tokens
      {
        id: '6',
        name: 'spacing.md',
        value: '16px',
        type: 'spacing',
        category: 'spacing',
        description: 'O\'rtacha bo\'shliq',
        figmaValue: '16px',
        isModified: false,
        lastSync: '2024-01-15 12:00'
      },
      {
        id: '7',
        name: 'spacing.lg',
        value: '24px',
        type: 'spacing',
        category: 'spacing',
        description: 'Katta bo\'shliq',
        figmaValue: '20px',
        isModified: true,
        lastSync: '2024-01-14 15:45'
      },
      // Border radius tokens
      {
        id: '8',
        name: 'borderRadius.md',
        value: '8px',
        type: 'borderRadius',
        category: 'borderRadius',
        description: 'O\'rtacha burchak radiusi',
        figmaValue: '8px',
        isModified: false,
        lastSync: '2024-01-15 12:00'
      }
    ];

    setTokens(mockTokens);

    // Calculate categories
    const categoryMap = new Map<string, TokenCategory>();
    mockTokens.forEach(token => {
      if (!categoryMap.has(token.category)) {
        categoryMap.set(token.category, {
          name: token.category,
          type: token.type,
          count: 0,
          lastSync: token.lastSync
        });
      }
      const category = categoryMap.get(token.category)!;
      category.count++;
      if (token.lastSync > category.lastSync) {
        category.lastSync = token.lastSync;
      }
    });

    setCategories(Array.from(categoryMap.values()));
  }, []);

  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (token.description && token.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || token.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const modifiedTokensCount = tokens.filter(token => token.isModified).length;

  const handleTokenPress = (token: DesignToken) => {
    setSelectedToken(token);
    setEditedValue(token.value);
    setIsEditing(false);
    setShowTokenModal(true);
  };

  const handleSaveToken = () => {
    if (selectedToken && editedValue !== selectedToken.value) {
      const updatedTokens = tokens.map(token => 
        token.id === selectedToken.id 
          ? { ...token, value: editedValue, isModified: true }
          : token
      );
      setTokens(updatedTokens);
      Alert.alert('Muvaffaqiyat', 'Token yangilandi');
    }
    setShowTokenModal(false);
    setIsEditing(false);
  };

  const handleResetToken = () => {
    if (selectedToken && selectedToken.figmaValue) {
      const updatedTokens = tokens.map(token => 
        token.id === selectedToken.id 
          ? { ...token, value: token.figmaValue!, isModified: false }
          : token
      );
      setTokens(updatedTokens);
      setEditedValue(selectedToken.figmaValue);
      Alert.alert('Muvaffaqiyat', 'Token asl qiymatiga qaytarildi');
    }
  };

  const handleSyncAll = () => {
    const updatedTokens = tokens.map(token => ({
      ...token,
      value: token.figmaValue || token.value,
      isModified: false,
      lastSync: new Date().toLocaleString('uz-UZ')
    }));
    setTokens(updatedTokens);
    setShowSyncModal(false);
    Alert.alert('Muvaffaqiyat', 'Barcha tokenlar sinxronlashtirildi');
  };

  const getTokenPreview = (token: DesignToken) => {
    switch (token.type) {
      case 'color':
        return (
          <View style={[
            styles.colorPreview,
            { backgroundColor: token.value }
          ]} />
        );
      case 'typography':
        if (token.name.includes('fontSize')) {
          return (
            <Text style={[
              styles.typographyPreview,
              { fontSize: parseInt(token.value) }
            ]}>Aa</Text>
          );
        } else if (token.name.includes('fontWeight')) {
          return (
            <Text style={[
              styles.typographyPreview,
              { fontWeight: token.value as any }
            ]}>Aa</Text>
          );
        }
        return null;
      case 'spacing':
        return (
          <View style={[
            styles.spacingPreview,
            { width: parseInt(token.value), height: parseInt(token.value) }
          ]} />
        );
      case 'borderRadius':
        return (
          <View style={[
            styles.borderRadiusPreview,
            { borderRadius: parseInt(token.value) }
          ]} />
        );
      default:
        return null;
    }
  };

  const renderTokenCard = (token: DesignToken) => (
    <TouchableOpacity
      key={token.id}
      style={[
        styles.tokenCard,
        token.isModified && styles.modifiedTokenCard
      ]}
      onPress={() => handleTokenPress(token)}
    >
      <View style={styles.tokenHeader}>
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenName}>{token.name}</Text>
          {token.description && (
            <Text style={styles.tokenDescription}>{token.description}</Text>
          )}
        </View>
        <View style={styles.tokenPreview}>
          {getTokenPreview(token)}
        </View>
      </View>
      
      <View style={styles.tokenDetails}>
        <Text style={styles.tokenValue}>Qiymat: {token.value}</Text>
        {token.isModified && (
          <View style={styles.modifiedBadge}>
            <Text style={styles.modifiedBadgeText}>O'zgartirilgan</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.tokenMeta}>Oxirgi sinx: {token.lastSync}</Text>
    </TouchableOpacity>
  );

  const renderCategoryTab = (category: string, label: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryTab,
        selectedCategory === category && styles.activeCategoryTab
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryTabText,
        selectedCategory === category && styles.activeCategoryTabText
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveContainer>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Token Boshqaruvchisi</Text>
              <Text style={styles.subtitle}>Dizayn tokenlarini boshqaring va sinxronlashtiring</Text>
            </View>
            
            <TouchableOpacity
              style={styles.syncButton}
              onPress={() => setShowSyncModal(true)}
            >
              <Text style={styles.syncButtonText}>Sinxronlash</Text>
              {modifiedTokensCount > 0 && (
                <View style={styles.syncBadge}>
                  <Text style={styles.syncBadgeText}>{modifiedTokensCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Tokenlarni qidirish..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme.colors.muted}
            />
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {renderCategoryTab('all', 'Barchasi')}
          {categories.map(category => 
            renderCategoryTab(category.name, `${category.name} (${category.count})`)
          )}
        </ScrollView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {filteredTokens.map(renderTokenCard)}
        </ScrollView>

        {/* Token Detail Modal */}
        <Modal
          visible={showTokenModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedToken?.name}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowTokenModal(false)}
              >
                <Text style={styles.closeButtonText}>Yopish</Text>
              </TouchableOpacity>
            </View>

            {selectedToken && (
              <ScrollView style={styles.modalContent}>
                <View style={styles.tokenDetailSection}>
                  <Text style={styles.sectionTitle}>Asosiy Ma'lumotlar</Text>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Nom:</Text>
                    <Text style={styles.detailValue}>{selectedToken.name}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Turi:</Text>
                    <Text style={styles.detailValue}>{selectedToken.type}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Kategoriya:</Text>
                    <Text style={styles.detailValue}>{selectedToken.category}</Text>
                  </View>
                  
                  {selectedToken.description && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Tavsif:</Text>
                      <Text style={styles.detailValue}>{selectedToken.description}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.tokenDetailSection}>
                  <Text style={styles.sectionTitle}>Qiymatlar</Text>
                  
                  <View style={styles.valueContainer}>
                    <Text style={styles.valueLabel}>Joriy Qiymat:</Text>
                    {isEditing ? (
                      <TextInput
                        style={styles.valueInput}
                        value={editedValue}
                        onChangeText={setEditedValue}
                        autoFocus
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.valueDisplay}
                        onPress={() => setIsEditing(true)}
                      >
                        <Text style={styles.valueText}>{editedValue}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  
                  {selectedToken.figmaValue && (
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueLabel}>Figma Qiymati:</Text>
                      <Text style={styles.figmaValue}>{selectedToken.figmaValue}</Text>
                    </View>
                  )}
                  
                  <View style={styles.previewContainer}>
                    <Text style={styles.valueLabel}>Ko'rinish:</Text>
                    <View style={styles.largePreview}>
                      {getTokenPreview(selectedToken)}
                    </View>
                  </View>
                </View>

                <View style={styles.tokenDetailSection}>
                  <Text style={styles.sectionTitle}>Sinxronlash</Text>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Oxirgi sinx:</Text>
                    <Text style={styles.detailValue}>{selectedToken.lastSync}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Holat:</Text>
                    <Text style={[
                      styles.detailValue,
                      selectedToken.isModified ? styles.modifiedStatus : styles.syncedStatus
                    ]}>
                      {selectedToken.isModified ? 'O\'zgartirilgan' : 'Sinxronlashgan'}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            )}

            <View style={styles.modalActions}>
              {selectedToken?.isModified && (
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleResetToken}
                >
                  <Text style={styles.resetButtonText}>Qaytarish</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                style={[styles.saveButton, { flex: 1 }]}
                onPress={handleSaveToken}
              >
                <Text style={styles.saveButtonText}>Saqlash</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

        {/* Sync Modal */}
        <Modal
          visible={showSyncModal}
          animationType="fade"
          transparent
        >
          <View style={styles.syncModalOverlay}>
            <View style={styles.syncModalContent}>
              <Text style={styles.syncModalTitle}>Sinxronlash</Text>
              <Text style={styles.syncModalText}>
                {modifiedTokensCount} ta o'zgartirilgan token bor. 
                Figma bilan sinxronlashtirishni xohlaysizmi?
              </Text>
              
              <View style={styles.autoSyncContainer}>
                <Text style={styles.autoSyncLabel}>Avtomatik sinxronlash</Text>
                <Switch
                  value={autoSync}
                  onValueChange={setAutoSync}
                  trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                  thumbColor={theme.colors.background}
                />
              </View>
              
              <View style={styles.syncModalActions}>
                <TouchableOpacity
                  style={styles.syncModalButton}
                  onPress={() => setShowSyncModal(false)}
                >
                  <Text style={styles.syncModalButtonText}>Bekor qilish</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.syncModalButton, styles.primarySyncButton]}
                  onPress={handleSyncAll}
                >
                  <Text style={[styles.syncModalButtonText, styles.primarySyncButtonText]}>
                    Sinxronlash
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  syncButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  syncButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  syncBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.danger,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncBadgeText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
  },
  searchContainer: {
    marginTop: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.foreground,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  categoriesContainer: {
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  categoryTab: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  activeCategoryTab: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryTabText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foreground,
    fontWeight: theme.typography.fontWeight.medium,
  },
  activeCategoryTabText: {
    color: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  tokenCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    ...theme.shadows.sm,
  },
  modifiedTokenCard: {
    borderColor: theme.colors.warning,
    borderWidth: 2,
  },
  tokenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  tokenDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
  },
  tokenPreview: {
    marginLeft: theme.spacing.md,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  typographyPreview: {
    color: theme.colors.foreground,
  },
  spacingPreview: {
    backgroundColor: theme.colors.primary,
    opacity: 0.3,
    borderRadius: 2,
  },
  borderRadiusPreview: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary,
    opacity: 0.3,
  },
  tokenDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  tokenValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foreground,
    fontFamily: theme.typography.fontFamily.mono,
  },
  modifiedBadge: {
    backgroundColor: theme.colors.warning,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  modifiedBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.background,
    fontWeight: theme.typography.fontWeight.medium,
  },
  tokenMeta: {
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
  tokenDetailSection: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  detailLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    fontWeight: theme.typography.fontWeight.medium,
  },
  detailValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foreground,
    flex: 1,
    textAlign: 'right',
  },
  modifiedStatus: {
    color: theme.colors.warning,
  },
  syncedStatus: {
    color: theme.colors.success,
  },
  valueContainer: {
    marginBottom: theme.spacing.md,
  },
  valueLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.xs,
  },
  valueDisplay: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  valueText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.foreground,
    fontFamily: theme.typography.fontFamily.mono,
  },
  valueInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.foreground,
    fontFamily: theme.typography.fontFamily.mono,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  figmaValue: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.info,
    fontFamily: theme.typography.fontFamily.mono,
  },
  previewContainer: {
    marginTop: theme.spacing.md,
  },
  largePreview: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  modalActions: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    gap: theme.spacing.md,
  },
  resetButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.warning,
  },
  resetButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.warning,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.background,
  },
  syncModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  syncModalContent: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    width: '100%',
    maxWidth: 400,
  },
  syncModalTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  syncModalText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.muted,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: theme.typography.fontSize.base * 1.5,
  },
  autoSyncContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
  },
  autoSyncLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.foreground,
  },
  syncModalActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  syncModalButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  primarySyncButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  syncModalButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
  },
  primarySyncButtonText: {
    color: theme.colors.background,
  },
});

export default TokenManager;