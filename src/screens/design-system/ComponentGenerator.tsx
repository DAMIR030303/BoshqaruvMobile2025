// Boshqaruv - Component Generator
// Figma komponentlarini React Native kodiga aylantirish

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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ResponsiveContainer } from '../../components/ResponsiveContainer';
import { theme } from '../../theme';

interface FigmaComponent {
  id: string;
  nodeId: string;
  name: string;
  description?: string;
  type: 'COMPONENT' | 'COMPONENT_SET';
  thumbnailUrl?: string;
  lastModified: string;
  variants?: FigmaVariant[];
}

interface FigmaVariant {
  id: string;
  name: string;
  properties: Record<string, string>;
}

interface GeneratedCode {
  componentName: string;
  code: string;
  dependencies: string[];
  propsInterface: string;
}

const ComponentGenerator: React.FC = () => {
  const navigation = useNavigation();
  const [figmaComponents, setFigmaComponents] = useState<FigmaComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<FigmaComponent | null>(null);
  const [componentName, setComponentName] = useState('');
  const [generateResponsive, setGenerateResponsive] = useState(true);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock Figma components data
    setFigmaComponents([
      {
        id: '1',
        nodeId: '1:23',
        name: 'Primary Button',
        description: 'Asosiy tugma komponenti',
        type: 'COMPONENT_SET',
        lastModified: '2024-01-15 12:00',
        variants: [
          {
            id: '1-1',
            name: 'Default',
            properties: { State: 'Default', Size: 'Medium' }
          },
          {
            id: '1-2',
            name: 'Pressed',
            properties: { State: 'Pressed', Size: 'Medium' }
          }
        ]
      },
      {
        id: '2',
        nodeId: '1:24',
        name: 'Text Input',
        description: 'Matn kiritish maydoni',
        type: 'COMPONENT',
        lastModified: '2024-01-14 16:30'
      },
      {
        id: '3',
        nodeId: '1:25',
        name: 'Navigation Card',
        description: 'Navigatsiya kartasi',
        type: 'COMPONENT',
        lastModified: '2024-01-15 10:15'
      }
    ]);
  }, []);

  const filteredComponents = figmaComponents.filter(component =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (component.description && component.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const generateReactNativeCode = async (component: FigmaComponent, name: string) => {
    setIsGenerating(true);
    
    // Simulate API call to generate code
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockCode = `// Generated from Figma: ${component.name}
// Node ID: ${component.nodeId}

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../theme';

interface ${name}Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

const ${name}: React.FC<${name}Props> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.text,
        styles[\`\${variant}Text\`],
        styles[\`\${size}Text\`],
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  small: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  medium: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  large: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: theme.typography.fontWeight.medium,
  },
  primaryText: {
    color: theme.colors.background,
  },
  secondaryText: {
    color: theme.colors.primary,
  },
  smallText: {
    fontSize: theme.typography.fontSize.sm,
  },
  mediumText: {
    fontSize: theme.typography.fontSize.base,
  },
  largeText: {
    fontSize: theme.typography.fontSize.lg,
  },
});

export default ${name};`;

    const mockGeneratedCode: GeneratedCode = {
      componentName: name,
      code: mockCode,
      dependencies: ['react', 'react-native'],
      propsInterface: `interface ${name}Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}`
    };

    setGeneratedCode(mockGeneratedCode);
    setIsGenerating(false);
    setShowCodeModal(true);
  };

  const handleGenerateCode = () => {
    if (!selectedComponent) {
      Alert.alert('Xato', 'Iltimos, komponentni tanlang');
      return;
    }
    
    if (!componentName.trim()) {
      Alert.alert('Xato', 'Iltimos, komponent nomini kiriting');
      return;
    }

    generateReactNativeCode(selectedComponent, componentName);
  };

  const copyCodeToClipboard = () => {
    if (generatedCode) {
      // React Native da clipboard API
      Alert.alert('Muvaffaqiyat', 'Kod clipboard ga nusxalandi');
    }
  };

  const saveComponent = () => {
    if (generatedCode) {
      Alert.alert('Muvaffaqiyat', 'Komponent saqlandi');
      setShowCodeModal(false);
      setSelectedComponent(null);
      setComponentName('');
      setGeneratedCode(null);
    }
  };

  const renderComponentCard = (component: FigmaComponent) => (
    <TouchableOpacity
      key={component.id}
      style={[
        styles.componentCard,
        selectedComponent?.id === component.id && styles.selectedCard
      ]}
      onPress={() => {
        setSelectedComponent(component);
        setComponentName(component.name.replace(/\s+/g, ''));
      }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.componentName}>{component.name}</Text>
        <View style={styles.componentType}>
          <Text style={styles.componentTypeText}>{component.type}</Text>
        </View>
      </View>
      
      {component.description && (
        <Text style={styles.componentDescription}>{component.description}</Text>
      )}
      
      <Text style={styles.componentMeta}>Node ID: {component.nodeId}</Text>
      <Text style={styles.componentMeta}>Oxirgi o'zgarish: {component.lastModified}</Text>
      
      {component.variants && component.variants.length > 0 && (
        <View style={styles.variantsContainer}>
          <Text style={styles.variantsTitle}>Variantlar: {component.variants.length}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveContainer>
        <View style={styles.header}>
          <Text style={styles.title}>Komponent Yaratuvchi</Text>
          <Text style={styles.subtitle}>Figma komponentlarini React Native kodiga aylantiring</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Komponentlarni qidirish..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.muted}
          />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Figma Komponentlari</Text>
          
          {filteredComponents.map(renderComponentCard)}

          {selectedComponent && (
            <View style={styles.generatorSection}>
              <Text style={styles.sectionTitle}>Kod Yaratish</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Komponent Nomi</Text>
                <TextInput
                  style={styles.textInput}
                  value={componentName}
                  onChangeText={setComponentName}
                  placeholder="PrimaryButton"
                  placeholderTextColor={theme.colors.muted}
                />
              </View>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setGenerateResponsive(!generateResponsive)}
              >
                <View style={[
                  styles.checkbox,
                  generateResponsive && styles.checkedCheckbox
                ]} />
                <Text style={styles.checkboxLabel}>Responsive variantlar yaratish</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.generateButton,
                  isGenerating && styles.disabledButton
                ]}
                onPress={handleGenerateCode}
                disabled={isGenerating}
              >
                <Text style={styles.generateButtonText}>
                  {isGenerating ? 'Yaratilmoqda...' : 'Kod Yaratish'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <Modal
          visible={showCodeModal}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Yaratilgan Kod</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCodeModal(false)}
              >
                <Text style={styles.closeButtonText}>Yopish</Text>
              </TouchableOpacity>
            </View>

            {generatedCode && (
              <ScrollView style={styles.codeContainer}>
                <Text style={styles.codeText}>{generatedCode.code}</Text>
              </ScrollView>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={copyCodeToClipboard}
              >
                <Text style={styles.actionButtonText}>Nusxalash</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, styles.primaryActionButton]}
                onPress={saveComponent}
              >
                <Text style={[styles.actionButtonText, styles.primaryActionButtonText]}>
                  Saqlash
                </Text>
              </TouchableOpacity>
            </View>
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
  searchContainer: {
    padding: theme.spacing.lg,
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
  componentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    ...theme.shadows.sm,
  },
  selectedCard: {
    borderColor: theme.colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  componentName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
    flex: 1,
  },
  componentType: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  componentTypeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.background,
    fontWeight: theme.typography.fontWeight.medium,
  },
  componentDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
  },
  componentMeta: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
  },
  variantsContainer: {
    marginTop: theme.spacing.sm,
  },
  variantsTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.info,
    fontWeight: theme.typography.fontWeight.medium,
  },
  generatorSection: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  textInput: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.foreground,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginRight: theme.spacing.sm,
  },
  checkedCheckbox: {
    backgroundColor: theme.colors.primary,
  },
  checkboxLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foreground,
  },
  generateButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  generateButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
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
  codeContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  codeText: {
    fontFamily: theme.typography.fontFamily.mono,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foreground,
    lineHeight: theme.typography.fontSize.sm * 1.5,
  },
  modalActions: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  primaryActionButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  actionButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
  },
  primaryActionButtonText: {
    color: theme.colors.background,
  },
});

export default ComponentGenerator;