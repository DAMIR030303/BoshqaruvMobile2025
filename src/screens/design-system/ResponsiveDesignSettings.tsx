// Boshqaruv - Responsive Design Settings
// Breakpoint boshqaruvi va responsive dizayn sozlamalari

import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ResponsiveContainer } from '../../components/ResponsiveContainer';
import { theme } from '../../theme';

interface Breakpoint {
  id: string;
  name: string;
  minWidth: number;
  maxWidth?: number;
  description: string;
  isActive: boolean;
  isDefault?: boolean;
}

interface ResponsiveRule {
  id: string;
  property: string;
  breakpoint: string;
  value: string | number;
  unit?: string;
  description?: string;
}

interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  category: 'mobile' | 'tablet' | 'desktop';
  icon: string;
}

const ResponsiveDesignSettings: React.FC = () => {
  const navigation = useNavigation();
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>([]);
  const [responsiveRules, setResponsiveRules] = useState<ResponsiveRule[]>([]);
  const [devicePresets, setDevicePresets] = useState<DevicePreset[]>([]);
  const [selectedBreakpoint, setSelectedBreakpoint] = useState<string>('mobile');
  const [showAddBreakpointModal, setShowAddBreakpointModal] = useState(false);
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [newBreakpoint, setNewBreakpoint] = useState({
    name: '',
    minWidth: 0,
    maxWidth: undefined as number | undefined,
    description: ''
  });
  const [newRule, setNewRule] = useState({
    property: '',
    value: '',
    unit: 'px',
    description: ''
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('mobile');

  useEffect(() => {
    loadResponsiveData();
  }, []);

  const loadResponsiveData = () => {
    // Mock breakpoints data
    const mockBreakpoints: Breakpoint[] = [
      {
        id: 'mobile',
        name: 'Mobile',
        minWidth: 0,
        maxWidth: 767,
        description: 'Mobil qurilmalar uchun',
        isActive: true,
        isDefault: true
      },
      {
        id: 'tablet',
        name: 'Tablet',
        minWidth: 768,
        maxWidth: 1023,
        description: 'Planshet qurilmalar uchun',
        isActive: true
      },
      {
        id: 'desktop',
        name: 'Desktop',
        minWidth: 1024,
        maxWidth: 1439,
        description: 'Ish stoli kompyuterlari uchun',
        isActive: true
      },
      {
        id: 'large',
        name: 'Large Desktop',
        minWidth: 1440,
        description: 'Katta ekranli monitorlar uchun',
        isActive: false
      }
    ];

    // Mock responsive rules data
    const mockRules: ResponsiveRule[] = [
      {
        id: '1',
        property: 'fontSize',
        breakpoint: 'mobile',
        value: 14,
        unit: 'px',
        description: 'Asosiy matn o\'lchami'
      },
      {
        id: '2',
        property: 'fontSize',
        breakpoint: 'tablet',
        value: 16,
        unit: 'px',
        description: 'Asosiy matn o\'lchami'
      },
      {
        id: '3',
        property: 'fontSize',
        breakpoint: 'desktop',
        value: 18,
        unit: 'px',
        description: 'Asosiy matn o\'lchami'
      },
      {
        id: '4',
        property: 'padding',
        breakpoint: 'mobile',
        value: 16,
        unit: 'px',
        description: 'Konteyner ichki bo\'shliqi'
      },
      {
        id: '5',
        property: 'padding',
        breakpoint: 'tablet',
        value: 24,
        unit: 'px',
        description: 'Konteyner ichki bo\'shliqi'
      },
      {
        id: '6',
        property: 'padding',
        breakpoint: 'desktop',
        value: 32,
        unit: 'px',
        description: 'Konteyner ichki bo\'shliqi'
      }
    ];

    // Mock device presets
    const mockPresets: DevicePreset[] = [
      {
        id: 'iphone-se',
        name: 'iPhone SE',
        width: 375,
        height: 667,
        category: 'mobile',
        icon: '📱'
      },
      {
        id: 'iphone-14',
        name: 'iPhone 14',
        width: 390,
        height: 844,
        category: 'mobile',
        icon: '📱'
      },
      {
        id: 'ipad',
        name: 'iPad',
        width: 768,
        height: 1024,
        category: 'tablet',
        icon: '📱'
      },
      {
        id: 'ipad-pro',
        name: 'iPad Pro',
        width: 1024,
        height: 1366,
        category: 'tablet',
        icon: '📱'
      },
      {
        id: 'macbook',
        name: 'MacBook',
        width: 1280,
        height: 800,
        category: 'desktop',
        icon: '💻'
      },
      {
        id: 'imac',
        name: 'iMac',
        width: 1920,
        height: 1080,
        category: 'desktop',
        icon: '🖥️'
      }
    ];

    setBreakpoints(mockBreakpoints);
    setResponsiveRules(mockRules);
    setDevicePresets(mockPresets);
  };

  const handleAddBreakpoint = () => {
    if (!newBreakpoint.name || newBreakpoint.minWidth < 0) {
      Alert.alert('Xato', 'Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    const breakpoint: Breakpoint = {
      id: newBreakpoint.name.toLowerCase().replace(/\s+/g, '-'),
      name: newBreakpoint.name,
      minWidth: newBreakpoint.minWidth,
      maxWidth: newBreakpoint.maxWidth,
      description: newBreakpoint.description,
      isActive: true
    };

    setBreakpoints([...breakpoints, breakpoint]);
    setNewBreakpoint({ name: '', minWidth: 0, maxWidth: undefined, description: '' });
    setShowAddBreakpointModal(false);
    Alert.alert('Muvaffaqiyat', 'Yangi breakpoint qo\'shildi');
  };

  const handleAddRule = () => {
    if (!newRule.property || !newRule.value) {
      Alert.alert('Xato', 'Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    const rule: ResponsiveRule = {
      id: Date.now().toString(),
      property: newRule.property,
      breakpoint: selectedBreakpoint,
      value: newRule.value,
      unit: newRule.unit,
      description: newRule.description
    };

    setResponsiveRules([...responsiveRules, rule]);
    setNewRule({ property: '', value: '', unit: 'px', description: '' });
    setShowAddRuleModal(false);
    Alert.alert('Muvaffaqiyat', 'Yangi qoida qo\'shildi');
  };

  const toggleBreakpoint = (id: string) => {
    const updatedBreakpoints = breakpoints.map(bp => {
      if (bp.id === id && !bp.isDefault) {
        return { ...bp, isActive: !bp.isActive };
      }
      return bp;
    });
    setBreakpoints(updatedBreakpoints);
  };

  const deleteRule = (id: string) => {
    Alert.alert(
      'O\'chirish',
      'Bu qoidani o\'chirishni xohlaysizmi?',
      [
        { text: 'Bekor qilish', style: 'cancel' },
        {
          text: 'O\'chirish',
          style: 'destructive',
          onPress: () => {
            setResponsiveRules(responsiveRules.filter(rule => rule.id !== id));
          }
        }
      ]
    );
  };

  const exportSettings = () => {
    const settings = {
      breakpoints: breakpoints.filter(bp => bp.isActive),
      rules: responsiveRules,
      timestamp: new Date().toISOString()
    };
    
    // In a real app, this would export to a file or copy to clipboard
    Alert.alert(
      'Eksport',
      'Sozlamalar eksport qilindi\n\n' + JSON.stringify(settings, null, 2).substring(0, 200) + '...'
    );
  };

  const importSettings = () => {
    Alert.alert(
      'Import',
      'Sozlamalarni import qilish funksiyasi tez orada qo\'shiladi',
      [{ text: 'OK' }]
    );
  };

  const resetToDefaults = () => {
    Alert.alert(
      'Qayta tiklash',
      'Barcha sozlamalarni standart holatga qaytarishni xohlaysizmi?',
      [
        { text: 'Bekor qilish', style: 'cancel' },
        {
          text: 'Qayta tiklash',
          style: 'destructive',
          onPress: () => {
            loadResponsiveData();
            Alert.alert('Muvaffaqiyat', 'Sozlamalar qayta tiklandi');
          }
        }
      ]
    );
  };

  const getBreakpointColor = (breakpoint: Breakpoint) => {
    if (!breakpoint.isActive) return theme.colors.muted;
    if (breakpoint.isDefault) return theme.colors.primary;
    return theme.colors.success;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mobile': return theme.colors.info;
      case 'tablet': return theme.colors.warning;
      case 'desktop': return theme.colors.success;
      default: return theme.colors.muted;
    }
  };

  const filteredRules = responsiveRules.filter(rule => rule.breakpoint === selectedBreakpoint);
  const activeBreakpoints = breakpoints.filter(bp => bp.isActive);

  const renderBreakpoint = (breakpoint: Breakpoint) => (
    <View key={breakpoint.id} style={styles.breakpointItem}>
      <View style={styles.breakpointHeader}>
        <View style={styles.breakpointInfo}>
          <View style={styles.breakpointTitleRow}>
            <View style={[
              styles.breakpointIndicator,
              { backgroundColor: getBreakpointColor(breakpoint) }
            ]} />
            <Text style={styles.breakpointName}>{breakpoint.name}</Text>
            {breakpoint.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Standart</Text>
              </View>
            )}
          </View>
          <Text style={styles.breakpointRange}>
            {breakpoint.minWidth}px{breakpoint.maxWidth ? ` - ${breakpoint.maxWidth}px` : '+'}
          </Text>
          <Text style={styles.breakpointDescription}>{breakpoint.description}</Text>
        </View>
        
        {!breakpoint.isDefault && (
          <Switch
            value={breakpoint.isActive}
            onValueChange={() => toggleBreakpoint(breakpoint.id)}
            trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
            thumbColor={theme.colors.background}
          />
        )}
      </View>
    </View>
  );

  const renderRule = (rule: ResponsiveRule) => (
    <View key={rule.id} style={styles.ruleItem}>
      <View style={styles.ruleHeader}>
        <View style={styles.ruleInfo}>
          <Text style={styles.ruleProperty}>{rule.property}</Text>
          <Text style={styles.ruleValue}>
            {rule.value}{rule.unit}
          </Text>
          {rule.description && (
            <Text style={styles.ruleDescription}>{rule.description}</Text>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.deleteRuleButton}
          onPress={() => deleteRule(rule.id)}
        >
          <Text style={styles.deleteRuleButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDevicePreset = (preset: DevicePreset) => (
    <TouchableOpacity
      key={preset.id}
      style={[
        styles.devicePreset,
        selectedPreset === preset.id && styles.selectedDevicePreset
      ]}
      onPress={() => setSelectedPreset(preset.id)}
    >
      <Text style={styles.deviceIcon}>{preset.icon}</Text>
      <Text style={styles.deviceName}>{preset.name}</Text>
      <Text style={styles.deviceSize}>{preset.width} × {preset.height}</Text>
      <View style={[
        styles.deviceCategory,
        { backgroundColor: getCategoryColor(preset.category) }
      ]}>
        <Text style={styles.deviceCategoryText}>
          {preset.category === 'mobile' ? 'Mobil' :
           preset.category === 'tablet' ? 'Planshet' : 'Desktop'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderBreakpointTab = (breakpoint: Breakpoint) => (
    <TouchableOpacity
      key={breakpoint.id}
      style={[
        styles.breakpointTab,
        selectedBreakpoint === breakpoint.id && styles.activeBreakpointTab,
        !breakpoint.isActive && styles.inactiveBreakpointTab
      ]}
      onPress={() => setSelectedBreakpoint(breakpoint.id)}
      disabled={!breakpoint.isActive}
    >
      <Text style={[
        styles.breakpointTabText,
        selectedBreakpoint === breakpoint.id && styles.activeBreakpointTabText,
        !breakpoint.isActive && styles.inactiveBreakpointTabText
      ]}>
        {breakpoint.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveContainer>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Responsive Dizayn</Text>
              <Text style={styles.subtitle}>Breakpoint va responsive qoidalarni boshqaring</Text>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setPreviewMode(!previewMode)}
              >
                <Text style={styles.headerButtonText}>
                  {previewMode ? '⚙️' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{activeBreakpoints.length}</Text>
              <Text style={styles.statLabel}>Faol Breakpoint</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{responsiveRules.length}</Text>
              <Text style={styles.statLabel}>Responsive Qoida</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{devicePresets.length}</Text>
              <Text style={styles.statLabel}>Qurilma Namunasi</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {!previewMode ? (
            <>
              {/* Breakpoints Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Breakpointlar</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setShowAddBreakpointModal(true)}
                  >
                    <Text style={styles.addButtonText}>+ Qo'shish</Text>
                  </TouchableOpacity>
                </View>
                
                {breakpoints.map(renderBreakpoint)}
              </View>

              {/* Responsive Rules Section */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Responsive Qoidalar</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setShowAddRuleModal(true)}
                  >
                    <Text style={styles.addButtonText}>+ Qoida</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.breakpointTabs}
                  contentContainerStyle={styles.breakpointTabsContent}
                >
                  {activeBreakpoints.map(renderBreakpointTab)}
                </ScrollView>

                {filteredRules.length > 0 ? (
                  filteredRules.map(renderRule)
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>
                      Bu breakpoint uchun qoidalar yo'q
                    </Text>
                  </View>
                )}
              </View>

              {/* Settings Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sozlamalar</Text>
                
                <View style={styles.settingsGrid}>
                  <TouchableOpacity style={styles.settingButton} onPress={exportSettings}>
                    <Text style={styles.settingButtonIcon}>📤</Text>
                    <Text style={styles.settingButtonText}>Eksport</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.settingButton} onPress={importSettings}>
                    <Text style={styles.settingButtonIcon}>📥</Text>
                    <Text style={styles.settingButtonText}>Import</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.settingButton} onPress={resetToDefaults}>
                    <Text style={styles.settingButtonIcon}>🔄</Text>
                    <Text style={styles.settingButtonText}>Qayta tiklash</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            /* Preview Mode */
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Qurilma Ko'rinishi</Text>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.devicePresets}
                contentContainerStyle={styles.devicePresetsContent}
              >
                {devicePresets.map(renderDevicePreset)}
              </ScrollView>
              
              <View style={styles.previewContainer}>
                <Text style={styles.previewTitle}>
                  {devicePresets.find(p => p.id === selectedPreset)?.name} Ko'rinishi
                </Text>
                
                <View style={styles.previewFrame}>
                  <Text style={styles.previewContent}>
                    Bu yerda tanlangan qurilma uchun\nresponsive dizayn ko'rinishi bo'ladi
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Add Breakpoint Modal */}
        <Modal
          visible={showAddBreakpointModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Yangi Breakpoint</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAddBreakpointModal(false)}
              >
                <Text style={styles.closeButtonText}>Yopish</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nomi *</Text>
                <TextInput
                  style={styles.formInput}
                  value={newBreakpoint.name}
                  onChangeText={(text) => setNewBreakpoint({...newBreakpoint, name: text})}
                  placeholder="Masalan: Large Mobile"
                  placeholderTextColor={theme.colors.muted}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Minimal Kenglik (px) *</Text>
                <TextInput
                  style={styles.formInput}
                  value={newBreakpoint.minWidth.toString()}
                  onChangeText={(text) => setNewBreakpoint({...newBreakpoint, minWidth: parseInt(text) || 0})}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor={theme.colors.muted}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Maksimal Kenglik (px)</Text>
                <TextInput
                  style={styles.formInput}
                  value={newBreakpoint.maxWidth?.toString() || ''}
                  onChangeText={(text) => setNewBreakpoint({...newBreakpoint, maxWidth: text ? parseInt(text) : undefined})}
                  placeholder="Bo'sh qoldiring (cheksiz)"
                  keyboardType="numeric"
                  placeholderTextColor={theme.colors.muted}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Tavsif</Text>
                <TextInput
                  style={[styles.formInput, styles.formTextArea]}
                  value={newBreakpoint.description}
                  onChangeText={(text) => setNewBreakpoint({...newBreakpoint, description: text})}
                  placeholder="Bu breakpoint haqida qisqacha ma'lumot"
                  multiline
                  numberOfLines={3}
                  placeholderTextColor={theme.colors.muted}
                />
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleAddBreakpoint}>
                <Text style={styles.submitButtonText}>Qo'shish</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>

        {/* Add Rule Modal */}
        <Modal
          visible={showAddRuleModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Yangi Qoida</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowAddRuleModal(false)}
              >
                <Text style={styles.closeButtonText}>Yopish</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Breakpoint</Text>
                <View style={styles.selectedBreakpointInfo}>
                  <Text style={styles.selectedBreakpointText}>
                    {breakpoints.find(bp => bp.id === selectedBreakpoint)?.name}
                  </Text>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>CSS Xususiyati *</Text>
                <TextInput
                  style={styles.formInput}
                  value={newRule.property}
                  onChangeText={(text) => setNewRule({...newRule, property: text})}
                  placeholder="fontSize, padding, margin, etc."
                  placeholderTextColor={theme.colors.muted}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 2 }]}>
                  <Text style={styles.formLabel}>Qiymat *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newRule.value}
                    onChangeText={(text) => setNewRule({...newRule, value: text})}
                    placeholder="16"
                    placeholderTextColor={theme.colors.muted}
                  />
                </View>
                
                <View style={[styles.formGroup, { flex: 1, marginLeft: theme.spacing.md }]}>
                  <Text style={styles.formLabel}>Birlik</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newRule.unit}
                    onChangeText={(text) => setNewRule({...newRule, unit: text})}
                    placeholder="px"
                    placeholderTextColor={theme.colors.muted}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Tavsif</Text>
                <TextInput
                  style={[styles.formInput, styles.formTextArea]}
                  value={newRule.description}
                  onChangeText={(text) => setNewRule({...newRule, description: text})}
                  placeholder="Bu qoida haqida qisqacha ma'lumot"
                  multiline
                  numberOfLines={3}
                  placeholderTextColor={theme.colors.muted}
                />
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleAddRule}>
                <Text style={styles.submitButtonText}>Qo'shish</Text>
              </TouchableOpacity>
            </ScrollView>
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
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  headerButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  headerButtonText: {
    fontSize: theme.typography.fontSize.lg,
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
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  addButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  breakpointItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    ...theme.shadows.sm,
  },
  breakpointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  breakpointInfo: {
    flex: 1,
  },
  breakpointTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  breakpointIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.sm,
  },
  breakpointName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
    flex: 1,
  },
  defaultBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  defaultBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.background,
    fontWeight: theme.typography.fontWeight.medium,
  },
  breakpointRange: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.xs,
  },
  breakpointDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
  },
  breakpointTabs: {
    maxHeight: 50,
    marginBottom: theme.spacing.md,
  },
  breakpointTabsContent: {
    paddingVertical: theme.spacing.sm,
  },
  breakpointTab: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  activeBreakpointTab: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  inactiveBreakpointTab: {
    opacity: 0.5,
  },
  breakpointTabText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foreground,
    fontWeight: theme.typography.fontWeight.medium,
  },
  activeBreakpointTabText: {
    color: theme.colors.background,
  },
  inactiveBreakpointTabText: {
    color: theme.colors.muted,
  },
  ruleItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ruleInfo: {
    flex: 1,
  },
  ruleProperty: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  ruleValue: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  },
  ruleDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
  },
  deleteRuleButton: {
    padding: theme.spacing.sm,
  },
  deleteRuleButtonText: {
    fontSize: theme.typography.fontSize.lg,
  },
  emptyState: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.muted,
    textAlign: 'center',
  },
  settingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  settingButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    flex: 1,
    minWidth: 100,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  settingButtonIcon: {
    fontSize: theme.typography.fontSize['2xl'],
    marginBottom: theme.spacing.sm,
  },
  settingButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foreground,
    fontWeight: theme.typography.fontWeight.medium,
  },
  devicePresets: {
    maxHeight: 120,
    marginBottom: theme.spacing.md,
  },
  devicePresetsContent: {
    paddingVertical: theme.spacing.sm,
  },
  devicePreset: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginRight: theme.spacing.md,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  selectedDevicePreset: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  deviceIcon: {
    fontSize: theme.typography.fontSize['2xl'],
    marginBottom: theme.spacing.sm,
  },
  deviceName: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  deviceSize: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.muted,
    marginBottom: theme.spacing.sm,
  },
  deviceCategory: {
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  deviceCategoryText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.background,
    fontWeight: theme.typography.fontWeight.medium,
  },
  previewContainer: {
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.md,
  },
  previewFrame: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContent: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.muted,
    textAlign: 'center',
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
  formGroup: {
    marginBottom: theme.spacing.lg,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  formLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  formInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.foreground,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  formTextArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  selectedBreakpointInfo: {
    backgroundColor: theme.colors.primary + '20',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  selectedBreakpointText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  submitButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});

export default ResponsiveDesignSettings;