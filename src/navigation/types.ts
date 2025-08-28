// Boshqaruv - Navigation Types
// Navigation parametrlari va tiplar

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  SuperAdmin: undefined;
  AddEmployee: undefined;
  ManageEmployees: undefined;
  SystemSettings: undefined;
  Reports: undefined;
  Profile: undefined; // For Super Admin Profile
  Director: undefined; // For Director Navigator
  DirectorProfile: undefined; // For Director Profile
  CallCenter: undefined; // For Call-center Navigator
  CallCenterProfile: undefined; // For Call-center Profile
  HR: undefined; // For HR Navigator
  HRProfile: undefined; // For HR Profile
  Marketing: undefined; // For Marketing Navigator
  MarketingProfile: undefined; // For Marketing Profile
  ProjectManager: undefined; // For Project Manager Navigator
  ProjectManagerProfile: undefined; // For Project Manager Profile
  DesignSystem: undefined; // For Design System Navigator
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Employees: undefined;
  Attendance: undefined;
  Tasks: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  EmployeeDetail: { employeeId: string };
  TaskDetail: { taskId: string };
  AttendanceDetail: { attendanceId: string };
  Settings: undefined;
  DesignSystem: undefined;
};

// Design System Navigation Types
export type DesignSystemStackParamList = {
  DesignSystemDashboard: undefined;
  ComponentGenerator: undefined;
  TokenManager: undefined;
  SyncCenter: undefined;
  ResponsiveDesignSettings: undefined;
  TokenDetail: { tokenId: string };
  ComponentDetail: { componentId: string };
  SyncDetail: { syncId: string };
  FigmaSettings: undefined;
};

export type DesignSystemTabParamList = {
  Dashboard: undefined;
  Tokens: undefined;
  Components: undefined;
  Sync: undefined;
  Settings: undefined;
};
