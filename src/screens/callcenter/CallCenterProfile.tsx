// Call-center Operator Profile Screen
// "Navoiyda Bugun" loyihasi Call-center operatori uchun profil ekrani

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

const CallCenterProfile = ({ navigation }: any) => {
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
          <Text style={styles.headerTitle}>Call-center Profili</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Chiqish</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>📞</Text>
          </View>
          <Text style={styles.userName}>Madina</Text>
          <Text style={styles.userRole}>Call-center Operatori</Text>
          <Text style={styles.userStatus}>Online</Text>
          <Text style={styles.userProject}>"Navoiyda Bugun" loyihasi</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shaxsiy Ma'lumotlar</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ism va Familiya:</Text>
              <Text style={styles.infoValue}>Madina</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefon raqam:</Text>
              <Text style={styles.infoValue}>+998 90 123 45 67</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>madina@navoiybugun.uz</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ish vaqti:</Text>
              <Text style={styles.infoValue}>09:00 - 18:00</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Lavozim:</Text>
              <Text style={styles.infoValue}>Call-center Operatori</Text>
            </View>
          </View>
        </View>

        {/* Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vazifa va Majburiyatlar</Text>
          
          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>1. Telefon orqali mijozlar bilan ishlash</Text>
            <Text style={styles.responsibilityText}>
              • Kiruvchi qo'ng'iroqlarni qabul qilish, mijozlarga loyiha haqida to'liq va tushunarli ma'lumot berish{'\n'}
              • Chiquvchi qo'ng'iroqlarni amalga oshirib, mijozlar bilan qayta bog'lanish va sotuvlarni yakunlash
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>2. Lidlarni qayta ishlash va CRM yuritish (AMO CRM)</Text>
            <Text style={styles.responsibilityText}>
              • AMO CRM tizimiga kelgan lidlarni tezkor va sifatli qayta ishlash{'\n'}
              • Har bir mijoz bilan bo'lgan aloqa natijasini CRM tizimiga aniq yozib borish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>3. Mijozlarga maslahat va konsultatsiya berish</Text>
            <Text style={styles.responsibilityText}>
              • Loyihaning barcha mahsulot va xizmatlari haqida to'liq ma'lumotga ega bo'lish va mijozlarga savollariga aniq javob berish{'\n'}
              • Potensial mijozlarga kerakli xizmatlar bo'yicha individual maslahat berish va yechim taklif qilish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>4. Sotuvlarni amalga oshirish va monitoring qilish</Text>
            <Text style={styles.responsibilityText}>
              • Har bir qo'ng'iroqni sotuvga aylantirish uchun maksimal harakat qilish{'\n'}
              • Sotuvlarni CRM tizimida aniq qayd qilib, natijalarni monitoring qilish va hisobotlarni tayyorlash
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>5. Mijozlar bilan yaxshi munosabatlarni o'rnatish</Text>
            <Text style={styles.responsibilityText}>
              • Mijozlar bilan doimo muloyim va professional muloqot qilish{'\n'}
              • Mijozlarning ehtiyojlarini tushunib, ular bilan doimiy aloqa o'rnatish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>6. Ichki hisobotlarni tayyorlash</Text>
            <Text style={styles.responsibilityText}>
              • Kunlik va haftalik qo'ng'iroqlar, lidlar va sotuvlar haqida aniq hisobotlar tayyorlash va rahbarga taqdim qilish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>7. Mijozlar murojaatlari va shikoyatlari bilan ishlash</Text>
            <Text style={styles.responsibilityText}>
              • Mijozlardan kelgan shikoyat yoki murojaatlarni tinglash, qayd qilish va rahbarga yetkazish{'\n'}
              • Shikoyatlarni hal qilish uchun yechimlar taklif qilish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>8. O'z malakasini oshirish</Text>
            <Text style={styles.responsibilityText}>
              • Treninglarda ishtirok etish va savdo texnikalarini o'rganish{'\n'}
              • Mijozlar bilan ishlash malakasini doimiy rivojlantirish
            </Text>
          </View>
        </View>

        {/* KPI Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KPI va Asosiy Ko'rsatkichlar</Text>
          
          <View style={styles.kpiCard}>
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Qo'ng'iroqlar soni va samaradorligi</Text>
              <Text style={styles.kpiValue}>45/50 (90%)</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Sotuvlar soni va sifat ko'rsatkichlari</Text>
              <Text style={styles.kpiValue}>8 ta (67%)</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Mijozlarning ijobiy fikrlari</Text>
              <Text style={styles.kpiValue}>4.8/5 yulduz</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Qayta murojaatlar soni</Text>
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

export default CallCenterProfile;
