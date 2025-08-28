// Boshqaruv - Theme Slice
// Light/Dark mode theme holati

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ColorScheme } from '../../theme';

interface ThemeState {
  colorScheme: ColorScheme;
  isSystemTheme: boolean;
}

const initialState: ThemeState = {
  colorScheme: 'light',
  isSystemTheme: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<ColorScheme>) => {
      state.colorScheme = action.payload;
      state.isSystemTheme = false;
    },
    setSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.isSystemTheme = action.payload;
    },
    toggleTheme: (state) => {
      state.colorScheme = state.colorScheme === 'light' ? 'dark' : 'light';
      state.isSystemTheme = false;
    },
  },
});

export const { setColorScheme, setSystemTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
