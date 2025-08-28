// Boshqaruv - Web Layout Komponenti
// Web versiyasi uchun responsive layout

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useWindowDimensions } from 'react-native';

interface WebLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}

export const WebLayout: React.FC<WebLayoutProps> = ({
  children,
  style,
  containerStyle,
}) => {
  const { width } = useWindowDimensions();
  
  const getContainerStyle = (): ViewStyle => {
    if (width >= 1200) {
      return { maxWidth: 1200, alignSelf: 'center' as const };
    } else if (width >= 768) {
      return { maxWidth: '90%', alignSelf: 'center' as const };
    }
    return { width: '100%' };
  };

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      <View style={style}>
        {children}
      </View>
    </View>
  );
};