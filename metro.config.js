const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// React Native uchun qo'shimcha sozlamalar
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Asset fayllarini to'g'ri ishlash uchun
config.resolver.assetExts.push('db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'jpeg', 'gif');

// Source map uchun
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;
