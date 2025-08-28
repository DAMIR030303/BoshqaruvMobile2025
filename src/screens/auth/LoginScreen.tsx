// Boshqaruv - Login Screen
// Foydalanuvchi autentifikatsiya ekrani

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch } from '../../store/hooks';
import { setUser, setToken } from '../../store/slices/authSlice';
import { User } from '../../store/slices/authSlice';
import { colors, typography, spacing, borderRadius } from '../../theme';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useAppDispatch();

  // Test foydalanuvchilar
  const testUsers: User[] = [
    {
      id: '0',
      username: 'superadmin',
      role: 'super_admin',
      name: 'Super Administrator',
      status: 'online',
      lastLogin: new Date(),
      permissions: ['all'],
    },
    {
      id: '1',
      username: 'director',
      role: 'director',
      name: 'Bobur Boboyorov',
      status: 'online',
      lastLogin: new Date(),
      permissions: ['manage_project', 'view_reports', 'manage_team'],
    },
    {
      id: '2',
      username: 'admin',
      role: 'admin',
      name: 'Alisher Fayzullayev',
      status: 'online',
      lastLogin: new Date(),
      permissions: ['all'],
    },
    {
      id: '2',
      username: 'manager',
      role: 'manager',
      name: 'Nargiza Karimova',
      status: 'online',
      lastLogin: new Date(),
      permissions: ['employees', 'tasks'],
    },
    {
      id: '3',
      username: 'marketolog',
      role: 'marketolog',
      name: 'Shaxriddin Adizov',
      status: 'online',
      lastLogin: new Date(),
      permissions: ['marketing', 'content'],
    },
    {
      id: '4',
      username: 'user',
      role: 'user',
      name: 'Javohir Tursunov',
      status: 'online',
      lastLogin: new Date(),
      permissions: ['profile', 'attendance'],
    },
    {
      id: '5',
      username: 'madina',
      role: 'call_center',
      name: 'Madina',
      status: 'online',
      lastLogin: new Date(),
      permissions: ['crm', 'calls', 'sales', 'profile'],
    },
    {
      id: '6',
      username: 'nilufar',
      role: 'hr_manager',
      name: 'Nilufar',
      status: 'online',
      lastLogin: new Date(),
      permissions: ['recruitment', 'employees', 'training', 'profile'],
    },
    {
      id: '7',
      username: 'shaxriddin',
      role: 'marketing_manager',
      name: 'Shaxriddin',
      status: 'online',
      lastLogin: new Date(),
      permissions: ['instagram', 'content', 'video', 'profile'],
    },
    {
      id: '8',
      username: 'project',
      role: 'project_manager',
      name: 'Proyekt Menejeri',
      status: 'online',
      lastLogin: new Date(),
      permissions: ['shooting', 'projects', 'content', 'payments', 'profile'],
    },
  ];

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      // Web versiyasida window.alert ishlatamiz
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      showAlert('Xatolik', 'Login va parolni kiriting');
      return;
    }

    setIsLoading(true);

    try {
      // Test autentifikatsiya
      const user = testUsers.find(u => u.username === username);
      
      if (user && password === `${username}123`) {
        // Muvaffaqiyatli login
        console.log('Login muvaffaqiyatli:', user);
        dispatch(setUser(user));
        dispatch(setToken('test-token-' + Date.now()));
        
        if (Platform.OS === 'web') {
          console.log('Web versiyasida login muvaffaqiyatli');
        }
        
        // Role ga qarab to'g'ri ekranlarga o'tish
        switch (user.role) {
          case 'super_admin':
            navigation.navigate('SuperAdmin' as never);
            break;
          case 'director':
            navigation.navigate('Director' as never);
            break;
          case 'call_center':
            navigation.navigate('CallCenter' as never);
            break;
          case 'hr_manager':
            navigation.navigate('HR' as never);
            break;
          case 'marketing_manager':
            navigation.navigate('Marketing' as never);
            break;
          case 'project_manager':
            navigation.navigate('ProjectManager' as never);
            break;
          default:
            navigation.navigate('Main' as never);
        }
      } else {
        showAlert('Xatolik', 'Noto\'g\'ri login yoki parol');
      }
    } catch (error) {
      console.error('Login xatoligi:', error);
      showAlert('Xatolik', 'Tizimda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Logo va sarlavha */}
          <View style={styles.header}>
            <Text style={styles.title}>Boshqaruv</Text>
            <Text style={styles.subtitle}>Xodimlar va vazifalar boshqaruvi</Text>
          </View>

          {/* Login formasi */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Login"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Parol"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Kirish...' : 'Kirish'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Test ma'lumotlar */}
                  <View style={styles.testInfo}>
          <Text style={styles.testTitle}>Test foydalanuvchilar:</Text>
          <Text style={styles.testText}>superadmin / superadmin123</Text>
          <Text style={styles.testText}>director / director123</Text>
          <Text style={styles.testText}>admin / admin123</Text>
          <Text style={styles.testText}>manager / manager123</Text>
          <Text style={styles.testText}>marketolog / marketolog123</Text>
          <Text style={styles.testText}>madina / madina123</Text>
          <Text style={styles.testText}>nilufar / nilufar123</Text>
          <Text style={styles.testText}>shaxriddin / shaxriddin123</Text>
          <Text style={styles.testText}>project / project123</Text>
          <Text style={styles.testText}>user / user123</Text>
        </View>
        </View>
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
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  title: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.muted,
    textAlign: 'center',
  },
  form: {
    marginBottom: spacing.xl,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
    marginBottom: spacing.md,
    color: colors.foreground,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
  },
  testInfo: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  testTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  testText: {
    fontSize: typography.fontSize.xs,
    color: colors.muted,
    marginBottom: spacing.xs,
  },
});

export default LoginScreen;
