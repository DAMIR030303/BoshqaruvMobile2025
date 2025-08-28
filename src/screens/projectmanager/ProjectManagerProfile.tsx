// Project Manager and Videographer Profile Screen
// "Navoiyda Bugun" loyihasi Proyekt menejeri va mobilograf uchun profil ekrani

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

const ProjectManagerProfile = ({ navigation }: any) => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Chiqish',
      'Haqiqatan ham chiqmoqchimisiz?',
      [
        { text: 'Bekor', style: 'cancel' },
        { text: 'Chiqish', style: 'destructive', onPress: () => dispatch(logout()) },
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Orqaga</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Proyekt Menejeri va Mobilograf Profili</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Chiqish</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>🎬</Text>
          </View>
          <Text style={styles.userName}>Proyekt Menejeri</Text>
          <Text style={styles.userRole}>Proyekt Menejeri va Mobilograf</Text>
          <Text style={styles.userStatus}>Online</Text>
          <Text style={styles.userProject}>"Navoiyda Bugun" loyihasi</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shaxsiy Ma'lumotlar</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ism va Familiya:</Text>
              <Text style={styles.infoValue}>Proyekt Menejeri</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefon raqam:</Text>
              <Text style={styles.infoValue}>+998 90 123 45 67</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>project@navoiybugun.uz</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ish vaqti:</Text>
              <Text style={styles.infoValue}>09:00 - 18:00</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Lavozim:</Text>
              <Text style={styles.infoValue}>Proyekt Menejeri va Mobilograf</Text>
            </View>
          </View>
        </View>

        {/* Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vazifa va Majburiyatlar</Text>
          
          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>1. Video syomka va texnik jarayonlar</Text>
            <Text style={styles.responsibilityText}>
              • Loyihadagi barcha video syomka jarayonlarini tashkil qilish va boshqarish{'\n'}
              • Brendfeys va boshqa ishtirokchilar bilan syomka rejalarini kelishish{'\n'}
              • Syomka davomida texnik sifat va kreativ yondashuvni ta'minlash
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>2. Proyekt menejmenti</Text>
            <Text style={styles.responsibilityText}>
              • Kunlik va haftalik ish rejalari asosida syomka va loyiha jarayonlarini boshqarish{'\n'}
              • Jamoa a'zolari ishlarini muvofiqlashtirish va nazorat qilish{'\n'}
              • Loyihaning umumiy muddat va sifat ko'rsatkichlariga javob berish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>3. Kontent sifatini ta'minlash</Text>
            <Text style={styles.responsibilityText}>
              • Tayyor kontent sifatini tekshirish va kerakli tuzatishlarni amalga oshirish{'\n'}
              • Yangi g'oyalar va kreativ syomka usullarini ishlab chiqish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>4. Jamoa bilan ishlash</Text>
            <Text style={styles.responsibilityText}>
              • Montajchi, marketing boshqaruvchisi va kontent-meyker bilan yaqin hamkorlikda ishlash{'\n'}
              • Syomka jarayonidagi texnik va ijodiy muammolarni hal qilish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>5. Jarayon monitoringi va hisobot</Text>
            <Text style={styles.responsibilityText}>
              • Syomka jarayonlari va natijalari bo'yicha rahbarga muntazam hisobot berish{'\n'}
              • Kundalik va haftalik natijalarni tahlil qilish va samaradorlikni oshirish bo'yicha tavsiyalar berish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>6. Yangi xodimlarga yordam va o'qitish</Text>
            <Text style={styles.responsibilityText}>
              • Yangi kelgan mobilograflarga texnik va ijodiy yondashuv bo'yicha ko'rsatmalar berish{'\n'}
              • Ularni jamoaga tezroq moslashtirish va sifatli ish jarayonini yo'lga qo'yish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>7. Mijozlardan to'lovlarni qabul qilish</Text>
            <Text style={styles.responsibilityText}>
              • Syomka yoki xizmat yakunida mijozlardan naqd to'lovlarni qabul qilish{'\n'}
              • Olingan barcha to'lovlarni Bobur aka (direktor)ga shaxsan yetkazish va topshirish{'\n'}
              • To'lovlar bo'yicha aniq va shaffof hisob-kitob yuritish
            </Text>
          </View>
        </View>

        {/* KPI Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KPI va Asosiy Ko'rsatkichlar</Text>
          
          <View style={styles.kpiCard}>
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Jami syomkalar</Text>
              <Text style={styles.kpiValue}>45 ta (38 ta bajarilgan)</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Jami videolar</Text>
              <Text style={styles.kpiValue}>156 ta</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Kontent sifat ko'rsatkichi</Text>
              <Text style={styles.kpiValue}>96.8%</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Jami to'lovlar</Text>
              <Text style={styles.kpiValue}>12.5M so'm</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Jamoa a'zolari</Text>
              <Text style={styles.kpiValue}>8 ta</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Faol proyektlar</Text>
              <Text style={styles.kpiValue}>12 ta</Text>
            </View>
          </View>
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.primary,
  },
  backButton: {
    padding: spacing.sm,
  },
  backButtonText: {
    color: colors.background,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.background,
    flex: 1,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    ...shadows.sm,
  },
  logoutButtonText: {
    color: colors.background,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  userInfoSection: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.surface,
    margin: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  userRole: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  userStatus: {
    fontSize: typography.fontSize.sm,
    color: colors.success,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  userProject: {
    fontSize: typography.fontSize.sm,
    color: colors.muted,
    fontStyle: 'italic',
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    color: colors.muted,
    fontWeight: typography.fontWeight.medium,
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md,
  },
  responsibilityCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  responsibilityTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  responsibilityText: {
    fontSize: typography.fontSize.sm,
    color: colors.foreground,
    lineHeight: 20,
  },
  kpiCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  kpiLabel: {
    fontSize: typography.fontSize.base,
    color: colors.muted,
    fontWeight: typography.fontWeight.medium,
  },
  kpiValue: {
    fontSize: typography.fontSize.base,
    color: colors.foreground,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md,
  },
  bottomPadding: {
    height: 120,
  },
});

export default ProjectManagerProfile;
