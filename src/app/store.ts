import { configureStore } from '@reduxjs/toolkit'
import { Platform } from 'react-native'

import designSystemReducer from '../store/designSystemSlice'
import authReducer from '../store/slices/authSlice'
import themeReducer from '../store/slices/themeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    designSystem: designSystemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: Platform.OS === 'web' ? true : false,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
