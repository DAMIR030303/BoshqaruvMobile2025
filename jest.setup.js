/**
 * Jest setup file to mock problematic React Native modules
 * 
 * @author Damir Nurmurodov
 * @version 1.0.0
 * @created 2025
 */

// Global jest configuration
global.jest = jest;

// Mock problematic React Native modules
jest.mock('@react-native/js-polyfills/error-guard', () => ({
  setGlobalErrorHandler: jest.fn(),
  getGlobalErrorHandler: jest.fn(),
}));

// Mock other problematic modules if needed
jest.mock('react-native/Libraries/ReactNative/AppRegistry', () => ({
  registerComponent: jest.fn(),
}));

