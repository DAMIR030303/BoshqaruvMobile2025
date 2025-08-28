// HR Manager Profile Screen
// "Navoiyda Bugun" loyihasi HR menejeri uchun profil ekrani

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

const HRProfile = ({ navigation }: any) => {
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
          <Text style={styles.headerTitle}>HR Menejeri Profili</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Chiqish</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>👩‍💼</Text>
          </View>
          <Text style={styles.userName}>Nilufar</Text>
          <Text style={styles.userRole}>HR Menejeri</Text>
          <Text style={styles.userStatus}>Online</Text>
          <Text style={styles.userProject}>"Navoiyda Bugun" loyihasi</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shaxsiy Ma'lumotlar</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ism va Familiya:</Text>
              <Text style={styles.infoValue}>Nilufar</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefon raqam:</Text>
              <Text style={styles.infoValue}>+998 90 123 45 67</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>nilufar@navoiybugun.uz</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ish vaqti:</Text>
              <Text style={styles.infoValue}>09:00 - 18:00</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Lavozim:</Text>
              <Text style={styles.infoValue}>HR Menejeri</Text>
            </View>
          </View>
        </View>

        {/* Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vazifa va Majburiyatlar</Text>
          
          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>1. Yangi xodimlarni tanlash va ishga olish</Text>
            <Text style={styles.responsibilityText}>
              • Kerakli xodimlarni qidirish va saralash{'\n'}
              • Suhbatlar tashkil qilish va tanlov jarayonlarini boshqarish{'\n'}
              • Ishga qabul qilingan xodimlarni hujjatlashtirish va ro'yxatdan o'tkazish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>2. Xodimlarni adaptatsiya qilish</Text>
            <Text style={styles.responsibilityText}>
              • Yangi xodimlarga vazifa va ish tartibini tushuntirish{'\n'}
              • Moslashish jarayonini nazorat qilish va yordam berish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>3. Ichki tartib va intizomni nazorat qilish</Text>
            <Text style={styles.responsibilityText}>
              • Xodimlarning ishga kelishi va ketishini nazorat qilish{'\n'}
              • Ichki tartib-qoidalarga rioya qilinishini tekshirish{'\n'}
              • Tartib buzilish hollari bo'yicha rahbarga axborot berish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>4. KPI monitoringi va nazorat</Text>
            <Text style={styles.responsibilityText}>
              • Har bir xodimning KPI bajarilishini kuzatish{'\n'}
              • KPI natijalarini tahlil qilib, xodimlar bilan individual ish olib borish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>5. Hisobotlar tayyorlash</Text>
            <Text style={styles.responsibilityText}>
              • Xodimlar faoliyati bo'yicha haftalik va oylik hisobotlar tayyorlash{'\n'}
              • Rahbarga aniq va tizimli hisobotlarni taqdim qilish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>6. O'quv va rivojlantirish jarayonlarini tashkil qilish</Text>
            <Text style={styles.responsibilityText}>
              • Xodimlar uchun treninglar, seminarlar va ichki o'quv mashg'ulotlarini tashkillashtirish{'\n'}
              • Malaka oshirish rejalari ustida ishlash
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>7. Motivatsiya va mukofot tizimini boshqarish</Text>
            <Text style={styles.responsibilityText}>
              • Xodimlarni rag'batlantirish va mukofotlash jarayonlarini boshqarish{'\n'}
              • Jarima va rag'batlantirish tizimlarini adolatli va shaffof yuritish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>8. Muammolarni hal qilish va ichki muhitni rivojlantirish</Text>
            <Text style={styles.responsibilityText}>
              • Xodimlar o'rtasidagi nizolarni bartaraf qilish{'\n'}
              • Jamoada sog'lom muhit va ijobiy energiyani ta'minlash
            </Text>
          </View>
        </View>

        {/* KPI Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KPI va Asosiy Ko'rsatkichlar</Text>
          
          <View style={styles.kpiCard}>
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Xodimlar soni va faolligi</Text>
              <Text style={styles.kpiValue}>15 ta (94% faol)</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Yangi xodimlar qabul qilindi</Text>
              <Text style={styles.kpiValue}>3 ta (bu oy)</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Treninglar bajarildi</Text>
              <Text style={styles.kpiValue}>8 ta (87% reja)</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>KPI o'rtacha ko'rsatkichi</Text>
              <Text style={styles.kpiValue}>87.5%</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Davomat foizi</Text>
              <Text style={styles.kpiValue}>94.2%</Text>
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

export default HRProfile;
