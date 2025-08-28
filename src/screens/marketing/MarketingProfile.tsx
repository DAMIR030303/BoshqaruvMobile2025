// Marketing Manager Profile Screen
// "Navoiyda Bugun" loyihasi Marketing boshqaruvchisi uchun profil ekrani

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

const MarketingProfile = ({ navigation }: any) => {
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
          <Text style={styles.headerTitle}>Marketing Boshqaruvchisi Profili</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Chiqish</Text>
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>📱</Text>
          </View>
          <Text style={styles.userName}>Shaxriddin</Text>
          <Text style={styles.userRole}>Marketing Boshqaruvchisi</Text>
          <Text style={styles.userStatus}>Online</Text>
          <Text style={styles.userProject}>"Navoiyda Bugun" loyihasi</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shaxsiy Ma'lumotlar</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ism va Familiya:</Text>
              <Text style={styles.infoValue}>Shaxriddin</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefon raqam:</Text>
              <Text style={styles.infoValue}>+998 90 123 45 67</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>shaxriddin@navoiybugun.uz</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ish vaqti:</Text>
              <Text style={styles.infoValue}>09:00 - 18:00</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Lavozim:</Text>
              <Text style={styles.infoValue}>Marketing Boshqaruvchisi</Text>
            </View>
          </View>
        </View>

        {/* Responsibilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Xizmat Vazifalari va Majburiyatlar</Text>
          
          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>1. Instagram va ijtimoiy tarmoqlarni boshqarish</Text>
            <Text style={styles.responsibilityText}>
              • Kuniga 15-18 ta tayyor postni yuklash va nazorat qilish{'\n'}
              • Postlar uchun caption, hashtag va lokatsiyalarni tayyorlash{'\n'}
              • Post yuklash vaqtlarini rejalashtirish va qat'iy rioya qilish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>2. Video montaj va vizual kontent tayyorlash</Text>
            <Text style={styles.responsibilityText}>
              • Kuniga 10-15 ta video (reels) montaj qilish va sifatini ta'minlash{'\n'}
              • Videolar uchun preview (cover) va trend musiqalarni tanlash
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>3. Kontent monitoring va tahlil</Text>
            <Text style={styles.responsibilityText}>
              • Post va reels natijalarini (like, ko'rishlar, izohlar) kundalik va haftalik kuzatish{'\n'}
              • Eng yaxshi va eng zaif ishlagan postlarni tahlil qilish va xulosalar chiqarish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>4. Kontent rejalashtirish</Text>
            <Text style={styles.responsibilityText}>
              • Haftalik va oylik kontent reja tuzish{'\n'}
              • Mavzular va kreativ g'oyalarni ishlab chiqish{'\n'}
              • Brendfeys va jamoa bilan kontent ssenariylarini kelishish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>5. GPT (AI) yordamida kontent ishlab chiqish</Text>
            <Text style={styles.responsibilityText}>
              • GPT orqali post matnlari, hook va captionlar tayyorlash{'\n'}
              • AI yordamida yangi marketing va kreativ yondashuvlarni jamoaga taqdim qilish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>6. Marketing strategiyasini boshqarish</Text>
            <Text style={styles.responsibilityText}>
              • Kampaniyalar natijalarini monitoring qilish va tahlil qilish{'\n'}
              • Sotuv va auditoriya o'sishini ta'minlash uchun yangi strategiyalar ishlab chiqish
            </Text>
          </View>

          <View style={styles.responsibilityCard}>
            <Text style={styles.responsibilityTitle}>7. Jamoaviy ishlarda ishtirok</Text>
            <Text style={styles.responsibilityText}>
              • Montajchi va kontent-meyker bilan hamkorlik qilish{'\n'}
              • Yangi kelgan xodimlarga kontent va marketing bo'yicha ko'rsatmalar berish
            </Text>
          </View>
        </View>

        {/* KPI Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>KPI va Asosiy Ko'rsatkichlar</Text>
          
          <View style={styles.kpiCard}>
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Kunlik postlar</Text>
              <Text style={styles.kpiValue}>16 ta (Hedef: 15-18 ta)</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Kunlik videolar</Text>
              <Text style={styles.kpiValue}>12 ta (Hedef: 10-15 ta)</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Jami followers</Text>
              <Text style={styles.kpiValue}>125,000 ta</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Engagement rate</Text>
              <Text style={styles.kpiValue}>8.5%</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Aylik reach</Text>
              <Text style={styles.kpiValue}>2.5M ko'rish</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Kontent sifat ko'rsatkichi</Text>
              <Text style={styles.kpiValue}>94.2%</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Faol kampaniyalar</Text>
              <Text style={styles.kpiValue}>5 ta</Text>
            </View>
            
            <View style={styles.kpiRow}>
              <Text style={styles.kpiLabel}>Haftalik o'sish</Text>
              <Text style={styles.kpiValue}>+12.8%</Text>
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
    fontWeight: typography.fontWeight.medium,
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

export default MarketingProfile;
