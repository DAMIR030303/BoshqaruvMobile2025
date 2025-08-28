// Direktor Profile Screen
// "Navoiyda Bugun" loyihasi Direktori uchun profil ekrani

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

const DirectorProfile = ({ navigation }: any) => {
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
          <Text style={styles.headerTitle}>Direktor Profili</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Chiqish</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>👔</Text>
          </View>
          <Text style={styles.userName}>Bobur Boboyorov</Text>
          <Text style={styles.userRole}>Loyiha Direktori</Text>
          <Text style={styles.userStatus}>Online</Text>
          <Text style={styles.userProject}>"Navoiyda Bugun" loyihasi</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shaxsiy Ma'lumotlar</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ism va Familiya:</Text>
              <Text style={styles.infoValue}>Bobur Boboyorov</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefon raqam:</Text>
              <Text style={styles.infoValue}>+998 90 123 45 67</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>bobur.boboyorov@navoiybugun.uz</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ish vaqti:</Text>
              <Text style={styles.infoValue}>09:30 - 18:00</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Lavozim:</Text>
              <Text style={styles.infoValue}>Loyiha Direktori</Text>
            </View>
          </View>
        </View>

        {/* Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vazifa va Majburiyatlar</Text>
          
          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>1. Tizimli boshqaruv va umumiy nazorat</Text>
            <Text style={styles.responsibilityText}>
              • Loyihadagi barcha jarayonlarni kuzatish va nazorat qilish{'\n'}
              • Har bir bo'lim va xodimning belgilangan vazifalarini bajarilishini muntazam monitoring qilish{'\n'}
              • Har haftalik va oylik jamoa yig'ilishlarini tashkil qilish hamda natijalar bo'yicha hisobotlarni o'tkazish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>2. CRM (AMO CRM) tizimini yuritish va optimallashtirish</Text>
            <Text style={styles.responsibilityText}>
              • AMO CRM tizimida barcha lidlarni nazorat qilish, sifatli va tezkor ishlov berilishini ta'minlash{'\n'}
              • Call-center va sotuv operatorlari tomonidan CRM orqali olib borilayotgan ishlarni tekshirish va boshqarish{'\n'}
              • CRM orqali olingan natijalarni haftalik, oylik va choraklik hisobotlar asosida tahlil qilish va samaradorlikni oshirish choralarini ko'rish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>3. Marketing va kontent strategiyasini boshqarish</Text>
            <Text style={styles.responsibilityText}>
              • Loyihaning marketing strategiyasi va kontent rejasini tasdiqlash va nazorat qilish{'\n'}
              • Marketing kampaniyalarining muntazam amalga oshirilishini ta'minlash{'\n'}
              • Marketing kampaniyalar natijalarini kuzatish, samaradorligini baholash va kerak bo'lsa strategik o'zgarishlarni amalga oshirish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>4. Moliyaviy boshqaruv va nazorat qilish</Text>
            <Text style={styles.responsibilityText}>
              • Loyihaning oylik va haftalik moliyaviy hisob-kitoblarini aniq va tartibli olib borish{'\n'}
              • Jamoaning xarajatlarini tahlil qilish va budjetni to'g'ri taqsimlash orqali moliyaviy barqarorlikni ta'minlash{'\n'}
              • Oylik va choraklik moliyaviy hisobotlarni tayyorlash va loyiha asoschisi bilan muhokama qilish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>5. Call-center va sotuv operatorlarini boshqarish</Text>
            <Text style={styles.responsibilityText}>
              • Call-center xodimlari va sotuv operatorlarining sifatli va samarali ishlashini muntazam monitoring qilish{'\n'}
              • Sotuv operatorlariga kerakli trening va ko'rsatmalar berish orqali ularning savdo malakasini oshirish{'\n'}
              • Mijozlar bilan munosabatlarni kuchaytirish va xizmat ko'rsatish sifatini oshirish bo'yicha choralar ko'rish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>6. KPI monitoring va hisobotlarni olib borish</Text>
            <Text style={styles.responsibilityText}>
              • Har bir xodim va bo'lim uchun belgilangan KPI-larni aniq nazorat qilish va samaradorligini oshirish{'\n'}
              • Haftalik va oylik KPI bo'yicha hisobotlarni tayyorlash, muammolarni aniqlash va ularni hal qilish choralarini amalga oshirish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>7. Yangi xodimlarni ishga olish va adaptatsiya qilish</Text>
            <Text style={styles.responsibilityText}>
              • HR menejer bilan hamkorlikda yangi xodimlarni tanlash va ishga olish jarayonida qatnashish{'\n'}
              • Yangi xodimlarning tezroq jamoaga moslashuvi uchun zarur bo'lgan sharoit va treninglarni tashkil qilish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>8. Jamoaning rivojlanishini boshqarish</Text>
            <Text style={styles.responsibilityText}>
              • Xodimlarning professional malakasini oshirish uchun kerakli trening va seminarlarni tashkil qilish{'\n'}
              • Jamoaning ichki muhiti va motivatsiyasini doimiy ravishda kuzatib, kerakli choralarni amalga oshirish{'\n'}
              • Xodimlar uchun mukofot va jarima tizimini adolatli va samarali boshqarish
            </Text>
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
  bottomPadding: {
    height: 120,
  },
});

export default DirectorProfile;
