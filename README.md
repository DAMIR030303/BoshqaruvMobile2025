# 🚀 BoshqaruvMobile - Zamonaviy Mobil Boshqaruv Tizimi

**Muallif:** Damir Nurmurodov  
**Versiya:** 1.0.0  
**Yaratilgan:** 2025

## 📱 Mobil Ilova Ishlatish

### 📋 Talablar
- **Node.js:** 18+ versiya
- **npm/yarn/pnpm:** Paket menejeri
- **Expo CLI:** `npm install -g @expo/cli`
- **Android Studio** (Android uchun)
- **Xcode** (iOS uchun, faqat macOS da)

### 🚀 Tezkor Boshlash

#### 1. Loyihani yuklab olish
```bash
git clone https://github.com/DAMIR030303/BoshqaruvMobile2025.git
cd BoshqaruvMobile2025
```

#### 2. Bog'liqliklarni o'rnatish
```bash
npm install
# yoki
yarn install
# yoki
pnpm install
```

#### 3. Ilovani ishga tushirish
```bash
# Barcha platformalar uchun
npm start

# Android uchun
npm run android

# iOS uchun
npm run ios

# Web uchun
npm run web
```

### 📱 Telefonda Ishlatish

#### **Android da:**
1. **Expo Go** ilovasini Google Play dan yuklab oling
2. Terminal da `npm run android` buyrug'ini ishga tushiring
3. QR kodni Expo Go ilovasi bilan skanerlang
4. Ilova telefonda ochiladi

#### **iOS da:**
1. **Expo Go** ilovasini App Store dan yuklab oling
2. Terminal da `npm run ios` buyrug'ini ishga tushiring
3. QR kodni Expo Go ilovasi bilan skanerlang
4. Ilova telefonda ochiladi

### 🏗️ Ilovani Yaratish (Build)

#### **Preview Build (APK):**
```bash
npm run build:preview
```

#### **Production Build:**
```bash
npm run build:production
```

#### **Platformaga qarab:**
```bash
# Android uchun
npm run build:android

# iOS uchun
npm run build:ios
```

### 📱 Ilovani Telefonga O'rnatish

#### **Development Build:**
```bash
# Android
npx expo run:android

# iOS
npx expo run:ios
```

#### **Production APK:**
1. `npm run build:preview` buyrug'ini ishga tushiring
2. EAS Build tomonidan yaratilgan APK faylini yuklab oling
3. APK faylini telefonga o'rnating

### 🔧 Qo'shimcha Sozlamalar

#### **Environment Variables:**
`.env` faylini yarating:
```env
API_URL=https://api.boshqaruv.uz
EXPO_PUBLIC_APP_ENV=development
```

#### **Metro Cache ni tozalash:**
```bash
npm run clean
```

#### **Expo Doctor:**
```bash
npm run doctor
```

### 📱 Mobil Ilova Xususiyatlari

#### **Platforma qo'llab-quvvatlash:**
- ✅ Android (API 21+)
- ✅ iOS (12.0+)
- ✅ Web (Chrome, Firefox, Safari)

#### **Qurilma ruxsatlari:**
- 📷 Kamera
- 🖼️ Rasmlar galereyasi
- 📍 Joylashuv
- 🔔 Bildirishnomalar
- 🌐 Internet

#### **Responsive Design:**
- 📱 Telefon (portrait/landscape)
- 📱 Tablet (portrait/landscape)
- 💻 Web (responsive)

### 🐛 Xato Tuzatish

#### **Umumiy muammolar:**

**1. Metro bundler xatosi:**
```bash
npm run clean
npm start
```

**2. Android build xatosi:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**3. iOS build xatosi:**
```bash
cd ios
pod install
cd ..
npm run ios
```

**4. Dependencies xatosi:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### 📱 Log Tizimi

Ilovada to'liq xato log tizimi mavjud:

#### **Log turlari:**
- 🚨 **ERROR** - Xatolar
- ⚠️ **WARNING** - Ogohlantirishlar
- ℹ️ **INFO** - Ma'lumotlar
- 🐛 **DEBUG** - Debug ma'lumotlari
- ⚡ **PERFORMANCE** - Performance metrikalari

#### **Loglarni ko'rish:**
```bash
# Log fayllarini ko'rish
ls logs/

# Xato loglarini ko'rish
cat logs/errors/errors_2025-01-28.json
```

### 🚀 Deployment

#### **EAS Build orqali:**
```bash
# EAS ga kirish
npx eas login

# Build yaratish
npx eas build --platform android
npx eas build --platform ios
```

#### **App Store/Google Play ga yuklash:**
```bash
# Android
npm run submit:android

# iOS
npm run submit:ios
```

### 📱 Ilova Screenshotlari

![Dashboard](assets/screenshots/dashboard.png)
![Login](assets/screenshots/login.png)
![Profile](assets/screenshots/profile.png)

### 🔗 Foydali Havolalar

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Expo Go App](https://expo.dev/client)

### 📞 Yordam

Agar muammo yuzaga kelsa:
1. **Issues** bo'limida xabar bering
2. **Discussions** da savol bering
3. **Telegram:** @damirnurmurodov

---

## 🎯 Asosiy Xususiyatlar

### 🏗️ **Arxitektura**
- **React Native + Expo** - Zamonaviy mobil ilova framework
- **TypeScript** - Type safety va kod sifatini ta'minlash
- **Redux Toolkit** - Markaziy state management
- **React Query** - Server state management
- **React Navigation** - Navigation tizimi

### 🎨 **UI/UX**
- **Material Design** - Google design system
- **React Native Paper** - Material Design komponentlari
- **Responsive Design** - Barcha qurilmalarga moslashish
- **Dark/Light Theme** - Foydalanuvchi tanlovi
- **Custom Components** - Maxsus komponentlar

### 🔧 **Texnik Xususiyatlar**
- **Performance Monitoring** - Ilova ishlashini kuzatish
- **Error Boundary** - Xatolarni ushlash va ko'rsatish
- **Logging System** - To'liq xato log tizimi
- **Offline Support** - Internet yo'qligida ishlash
- **Push Notifications** - Bildirishnomalar

### 📊 **Monitoring va Analytics**
- **Error Tracking** - Xatolarni kuzatish
- **Performance Metrics** - Ishlash ko'rsatkichlari
- **User Analytics** - Foydalanuvchi statistikasi
- **Crash Reporting** - Xato hisobotlari

---

## 🚀 Rivojlantirish

### 📋 **Talablar**
- Node.js 18+
- npm/yarn/pnpm
- Git
- VS Code (tavsiya etiladi)

### 🔧 **Development Scripts**
```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Testing
npm run test

# Formatting
npm run format

# Clean cache
npm run clean
```

### 📁 **Loyiha Strukturasi**
```
src/
├── components/     # UI komponentlari
├── screens/        # Ekranlar
├── navigation/     # Navigation
├── services/       # API xizmatlari
├── store/          # Redux store
├── utils/          # Yordamchi funksiyalar
├── types/          # TypeScript tiplari
└── assets/         # Rasmlar va fayllar
```

### 🧪 **Testing**
- **Jest** - Unit testing
- **React Native Testing Library** - Component testing
- **Coverage Reports** - Test coverage

---

## 📱 Mobil Ilova Ishlatish

### 🚀 **Tezkor Boshlash**

1. **Expo Go ilovasini yuklab oling:**
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. **Loyihani ishga tushiring:**
   ```bash
   npm start
   ```

3. **QR kodni skanerlang:**
   - Android: Expo Go ilovasi bilan
   - iOS: Kamera ilovasi bilan

4. **Ilova telefonda ochiladi!**

### 📱 **Platforma Qo'llab-quvvatlash**

| Platforma | Versiya | Status |
|-----------|---------|---------|
| Android   | 5.0+    | ✅ To'liq |
| iOS       | 12.0+   | ✅ To'liq |
| Web       | Modern  | ✅ To'liq |

### 🔧 **Qurilma Ruxsatlari**

| Ruxsat | Android | iOS | Maqsad |
|--------|---------|-----|---------|
| Kamera | ✅ | ✅ | Rasmlar olish |
| Galereya | ✅ | ✅ | Rasmlar tanlash |
| Joylashuv | ✅ | ✅ | Xarita xizmatlari |
| Internet | ✅ | ✅ | API so'rovlari |
| Bildirishnomalar | ✅ | ✅ | Push xabarlar |

---

## 🎉 Natija

**BoshqaruvMobile** - bu zamonaviy, sifatli va ishonchli mobil ilova bo'lib, barcha boshqaruv ehtiyojlarini qondiradi. Ilova Android, iOS va Web platformalarida to'liq ishlaydi va foydalanuvchilarga qulay interfeys taqdim etadi.

**Xususiyatlar:**
- 🚀 **Tezkor ishlash** - Optimallashtirilgan performance
- 🎨 **Zamonaviy dizayn** - Material Design 3
- 🔒 **Xavfsizlik** - JWT token va encryption
- 📱 **Responsive** - Barcha qurilmalarga moslashish
- 🐛 **Xato yo'q** - To'liq testing va monitoring
- 📊 **Analytics** - Foydalanuvchi harakatlari
- 🔔 **Bildirishnomalar** - Real-time xabarlar

**Endi sizning mobil ilovangiz tayyor va telefonda ishlaydi!** 🎉

---

**Muallif:** Damir Nurmurodov  
**Loyiha:** BoshqaruvMobile  
**Versiya:** 1.0.0  
**Yil:** 2025