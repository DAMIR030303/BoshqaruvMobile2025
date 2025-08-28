// Jest setup file to mock problematic React Native modules
jest.mock('@react-native/js-polyfills/error-guard', () => ({
  setGlobalErrorHandler: jest.fn(),
  getGlobalErrorHandler: jest.fn(),
}));

// Mock other problematic modules if needed
jest.mock('react-native/Libraries/ReactNative/AppRegistry', () => ({
  registerComponent: jest.fn(),
}));

