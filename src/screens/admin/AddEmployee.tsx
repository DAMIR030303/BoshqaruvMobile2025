// Boshqaruv - Add Employee Screen
// Yangi xodim qo'shish ekrani

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, typography, spacing, borderRadius } from '../../theme';

const AddEmployee = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    position: '',
    department: '',
    workHours: '9:30-18:00',
    salary: '',
    startDate: '',
    notes: '',
  });

  const [selectedRole, setSelectedRole] = useState('employee');

  const roles = [
    { key: 'super_admin', label: 'Super Administrator', color: colors.danger },
    { key: 'admin', label: 'Administrator', color: colors.primary },
    { key: 'manager', label: 'Manager', color: colors.secondary },
    { key: 'employee', label: 'Xodim', color: colors.info },
  ];

  const departments = [
    'Boshqaruv',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'IT',
    'Content',
    'Call Center',
  ];

  const positions = [
    'Direktor',
    'Manager',
    'Marketing Manager',
    'Sales Manager',
    'HR Manager',
    'Content Manager',
    'Call Center Operator',
    'Sales Operator',
    'Developer',
    'Designer',
  ];

  const handleSave = () => {
    // Validatsiya
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      Alert.alert('Xatolik', 'Asosiy ma\'lumotlarni to\'ldiring');
      return;
    }

    // Bu yerda API ga ma'lumot yuboriladi
    Alert.alert(
      'Muvaffaqiyatli',
      `${formData.firstName} ${formData.lastName} tizimga qo'shildi!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const InputField = ({ label, value, onChangeText, placeholder, keyboardType = 'default', multiline = false }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );

  const RoleSelector = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Rol va Huquqlar</Text>
      <View style={styles.roleGrid}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.key}
            style={[
              styles.roleButton,
              { backgroundColor: selectedRole === role.key ? role.color : colors.surface },
              { borderColor: role.color },
            ]}
            onPress={() => setSelectedRole(role.key)}
          >
            <Text
              style={[
                styles.roleButtonText,
                { color: selectedRole === role.key ? colors.background : role.color },
              ]}
            >
              {role.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const DepartmentSelector = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Bo'lim</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerText}>
          {formData.department || 'Bo\'limni tanlang'}
        </Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => {
            // Bu yerda modal yoki picker ochiladi
            Alert.alert('Bo\'lim', 'Bo\'limni tanlang', [
              ...departments.map(dept => ({
                text: dept,
                onPress: () => setFormData({ ...formData, department: dept }),
              })),
              { text: 'Bekor', style: 'cancel' },
            ]);
          }}
        >
          <Text style={styles.pickerButtonText}>▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const PositionSelector = () => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Lavozim</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerText}>
          {formData.position || 'Lavozimni tanlang'}
        </Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => {
            Alert.alert('Lavozim', 'Lavozimni tanlang', [
              ...positions.map(pos => ({
                text: pos,
                onPress: () => setFormData({ ...formData, position: pos }),
              })),
              { text: 'Bekor', style: 'cancel' },
            ]);
          }}
        >
          <Text style={styles.pickerButtonText}>▼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Yangi Xodim Qo'shish</Text>
            <Text style={styles.subtitle}>Xodim ma'lumotlarini kiriting</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Shaxsiy ma'lumotlar */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shaxsiy Ma'lumotlar</Text>
              
              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <InputField
                    label="Ism"
                    value={formData.firstName}
                    onChangeText={(text: string) => setFormData({ ...formData, firstName: text })}
                    placeholder="Ismni kiriting"
                  />
                </View>
                <View style={styles.halfWidth}>
                  <InputField
                    label="Familiya"
                    value={formData.lastName}
                    onChangeText={(text: string) => setFormData({ ...formData, lastName: text })}
                    placeholder="Familiyani kiriting"
                  />
                </View>
              </View>

              <InputField
                label="Telefon raqam"
                value={formData.phone}
                onChangeText={(text: string) => setFormData({ ...formData, phone: text })}
                placeholder="+998 90 123 45 67"
                keyboardType="phone-pad"
              />

              <InputField
                label="Email"
                value={formData.email}
                onChangeText={(text: string) => setFormData({ ...formData, email: text })}
                placeholder="email@example.com"
                keyboardType="email-address"
              />
            </View>

            {/* Ish ma'lumotlari */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ish Ma'lumotlari</Text>
              
              <RoleSelector />
              <DepartmentSelector />
              <PositionSelector />

              <InputField
                label="Ish vaqti"
                value={formData.workHours}
                onChangeText={(text: string) => setFormData({ ...formData, workHours: text })}
                placeholder="9:30-18:00"
              />

              <InputField
                label="Maosh (so'm)"
                value={formData.salary}
                onChangeText={(text: string) => setFormData({ ...formData, salary: text })}
                placeholder="5000000"
                keyboardType="numeric"
              />

              <InputField
                label="Ish boshlash sanasi"
                value={formData.startDate}
                onChangeText={(text: string) => setFormData({ ...formData, startDate: text })}
                placeholder="01.01.2024"
              />
            </View>

            {/* Qo'shimcha ma'lumotlar */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Qo'shimcha Ma'lumotlar</Text>
              
              <InputField
                label="Izohlar"
                value={formData.notes}
                onChangeText={(text: string) => setFormData({ ...formData, notes: text })}
                placeholder="Qo'shimcha ma'lumotlar..."
                multiline
              />
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Bekor</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Saqlash</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom padding */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.background,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.background,
    opacity: 0.9,
  },
  form: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.foreground,
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.foreground,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  roleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  roleButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    minWidth: 120,
    alignItems: 'center',
  },
  roleButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  pickerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  pickerText: {
    flex: 1,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.foreground,
  },
  pickerButton: {
    padding: spacing.md,
    borderLeftWidth: 1,
    borderLeftColor: colors.divider,
  },
  pickerButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.muted,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.foreground,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.background,
  },
  bottomPadding: {
    height: 120,
  },
});

export default AddEmployee;
