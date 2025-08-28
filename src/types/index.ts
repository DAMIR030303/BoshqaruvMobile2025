// BoshqaruvMobile - Type Definitions

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 
  | 'admin'
  | 'manager'
  | 'marketolog'
  | 'user';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ThemeState {
  isDark: boolean;
  colors: ColorScheme;
}

export type ColorScheme = 'light' | 'dark';

export interface DesignToken {
  id: string;
  name: string;
  value: string | number | object;
  type: 'color' | 'typography' | 'spacing' | 'border' | 'shadow';
  category: string;
  metadata: {
    platform: 'web' | 'mobile' | 'desktop';
    version: string;
    description?: string;
  };
}

export interface DesignComponent {
  id: string;
  name: string;
  displayName: string;
  props: ComponentProp[];
  metadata: {
    platform: 'web' | 'mobile' | 'desktop';
    version: string;
    description?: string;
  };
}

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description?: string;
}

export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  SuperAdmin: undefined;
  Director: undefined;
  HR: undefined;
  ProjectManager: undefined;
  Marketing: undefined;
  CallCenter: undefined;
  DesignSystem: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Employees: undefined;
  Tasks: undefined;
  Attendance: undefined;
  Profile: undefined;
};
