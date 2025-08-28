// Boshqaruv - Responsive Container Komponenti
// Web versiyasi uchun responsive container

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useWindowDimensions } from 'react-native';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  mobileStyle?: ViewStyle;
  tabletStyle?: ViewStyle;
  desktopStyle?: ViewStyle;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  style,
  mobileStyle,
  tabletStyle,
  desktopStyle,
}) => {
  const { width } = useWindowDimensions();
  
  const getResponsiveStyle = (): ViewStyle => {
    if (width >= 1024) {
      return { ...style, ...desktopStyle };
    } else if (width >= 768) {
      return { ...style, ...tabletStyle };
    } else {
      return { ...style, ...mobileStyle };
    }
  };

  return (
    <View style={getResponsiveStyle()}>
      {children}
    </View>
  );
};