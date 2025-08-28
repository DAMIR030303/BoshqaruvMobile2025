/**
 * BoshqaruvMobile - Error Boundary Komponenti
 * React xatolarini ushlaydi va log tizimiga yozadi
 * 
 * @author Damir Nurmurodov
 * @version 1.0.0
 * @created 2025
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Logger from '../services/Logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      showDetails: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Xatoni log tizimiga yozish
    Logger.logError(
      error,
      errorInfo.componentStack.split('\n')[1]?.trim() || 'Unknown',
      this.getLineNumber(errorInfo.componentStack),
      'componentDidCatch',
      'ErrorBoundary',
      {
        componentStack: errorInfo.componentStack,
        errorBoundary: this.constructor.name,
        timestamp: new Date().toISOString(),
      }
    );

    // Custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  /**
   * Component stack dan qator raqamini olish
   */
  private getLineNumber(componentStack: string): number {
    try {
      const lines = componentStack.split('\n');
      for (const line of lines) {
        if (line.includes(':')) {
          const match = line.match(/:(\d+):/);
          if (match) {
            return parseInt(match[1], 10);
          }
        }
      }
    } catch (e) {
      // Xato bo'lsa default qaytarish
    }
    return 0;
  }

  /**
   * Xatoni qayta ishga tushirish
   */
  private handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });

    // Debug log
    Logger.logInfo(
      'Error Boundary reset - xato tozalandi',
      'ErrorBoundary.tsx',
      this.getLineNumber(''),
      'handleRetry',
      'ErrorBoundary'
    );
  };

  /**
   * Xato ma'lumotlarini ko'rsatish
   */
  private toggleDetails = (): void => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails,
    }));
  };

  /**
   * Xatoni GitHub'ga yuborish
   */
  private handleReportError = (): void => {
    if (this.state.error && this.state.errorInfo) {
      const errorReport = {
        error: this.state.error.message,
        stack: this.state.error.stack,
        componentStack: this.state.errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: 'React Native App',
        version: '1.0.0',
      };

      // Xatoni log tizimiga yozish
      Logger.logError(
        `Xato hisoboti: ${this.state.error.message}`,
        'ErrorBoundary.tsx',
        this.getLineNumber(''),
        'handleReportError',
        'ErrorBoundary',
        errorReport
      );

      // Bu yerda GitHub Issues API ga yuborish mumkin
      console.log('Xato hisoboti tayyor:', errorReport);
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback komponenti
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <View style={styles.errorContainer}>
          <View style={styles.errorHeader}>
            <Text style={styles.errorIcon}>🚨</Text>
            <Text style={styles.errorTitle}>Xato yuz berdi</Text>
            <Text style={styles.errorSubtitle}>
              Ilovada kutilmagan xato yuz berdi. Iltimos, qayta urinib ko'ring.
            </Text>
          </View>

          <View style={styles.errorActions}>
            <TouchableOpacity style={styles.retryButton} onPress={this.handleRetry}>
              <Text style={styles.retryButtonText}>Qayta urinish</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.detailsButton} onPress={this.toggleDetails}>
              <Text style={styles.detailsButtonText}>
                {this.state.showDetails ? 'Ma'lumotlarni yashirish' : 'Batafsil ma'lumot'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reportButton} onPress={this.handleReportError}>
              <Text style={styles.reportButtonText}>Xatoni hisobot qilish</Text>
            </TouchableOpacity>
          </View>

          {this.state.showDetails && (
            <ScrollView style={styles.errorDetails}>
              <Text style={styles.detailsTitle}>Xato ma'lumotlari:</Text>
              
              {this.state.error && (
                <View style={styles.errorSection}>
                  <Text style={styles.sectionTitle}>Xato xabari:</Text>
                  <Text style={styles.errorMessage}>{this.state.error.message}</Text>
                </View>
              )}

              {this.state.error && this.state.error.stack && (
                <View style={styles.errorSection}>
                  <Text style={styles.sectionTitle}>Stack trace:</Text>
                  <Text style={styles.stackTrace}>{this.state.error.stack}</Text>
                </View>
              )}

              {this.state.errorInfo && (
                <View style={styles.errorSection}>
                  <Text style={styles.sectionTitle}>Component stack:</Text>
                  <Text style={styles.componentStack}>
                    {this.state.errorInfo.componentStack}
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
  },
  errorActions: {
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  reportButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  reportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorDetails: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    maxHeight: 300,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 16,
  },
  errorSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    padding: 12,
    borderRadius: 4,
    fontFamily: 'monospace',
  },
  stackTrace: {
    fontSize: 12,
    color: '#6c757d',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 4,
    fontFamily: 'monospace',
  },
  componentStack: {
    fontSize: 12,
    color: '#6c757d',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 4,
    fontFamily: 'monospace',
  },
});

export default ErrorBoundary;
