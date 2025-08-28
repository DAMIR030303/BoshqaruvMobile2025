// Boshqaruv - Redux Store
// Asosiy store konfiguratsiya

import { configureStore } from '@reduxjs/toolkit';
import { Platform } from 'react-native';

import counterReducer from '../features/counter/counterSlice';

import designSystemReducer from './designSystemSlice';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    designSystem: designSystemReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: Platform.OS === 'web' ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
