// Boshqaruv - Auth Slice
// Foydalanuvchi autentifikatsiya holati

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  username: string;
  role: 'super_admin' | 'director' | 'admin' | 'manager' | 'marketolog' | 'call_center' | 'hr_manager' | 'marketing_manager' | 'project_manager' | 'user';
  name: string;
  avatar?: string;
  status: 'online' | 'offline';
  lastLogin: Date;
  permissions: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setUser, setToken, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
