/**
 * BoshqaruvMobile - To'liq xato log tizimi
 * Barcha xatolarni batafsil qayd qilib, faylga yozadi
 * 
 * @author Damir Nurmurodov
 * @version 1.0.0
 * @created 2025
 */

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Xato turlari
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL'
}

// Xato ma'lumotlari interfeysi
export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  error?: Error;
  stack?: string;
  fileName: string;
  lineNumber: number;
  functionName: string;
  componentName?: string;
  userId?: string;
  sessionId?: string;
  deviceInfo: {
    platform: string;
    version: string;
    model?: string;
  };
  context?: Record<string, any>;
  metadata?: Record<string, any>;
}

// Performance log interfeysi
export interface PerformanceLog {
  id: string;
  timestamp: string;
  operation: string;
  duration: number;
  componentName: string;
  functionName: string;
  metadata?: Record<string, any>;
}

class Logger {
  private static instance: Logger;
  private logBuffer: LogEntry[] = [];
  private performanceBuffer: PerformanceLog[] = [];
  private maxBufferSize = 100;
  private flushInterval = 5000; // 5 soniya
  private isFlushing = false;

  private constructor() {
    this.startAutoFlush();
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Xato logini yozish
   */
  public logError(
    error: Error | string,
    fileName: string,
    lineNumber: number,
    functionName: string,
    componentName?: string,
    context?: Record<string, any>
  ): void {
    const logEntry: LogEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message: typeof error === 'string' ? error : error.message,
      error: typeof error === 'string' ? undefined : error,
      stack: typeof error === 'string' ? undefined : error.stack,
      fileName,
      lineNumber,
      functionName,
      componentName,
      deviceInfo: this.getDeviceInfo(),
      context,
      metadata: {
        appVersion: '1.0.0',
        buildNumber: '1',
        environment: __DEV__ ? 'development' : 'production'
      }
    };

    this.addToBuffer(logEntry);
    this.writeToFile(logEntry, 'errors');
    
    // Console ga ham yozish (development da)
    if (__DEV__) {
      console.error('🚨 XATO LOG:', logEntry);
    }
  }

  /**
   * Debug logini yozish
   */
  public logDebug(
    message: string,
    fileName: string,
    lineNumber: number,
    functionName: string,
    componentName?: string,
    context?: Record<string, any>
  ): void {
    const logEntry: LogEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level: LogLevel.DEBUG,
      message,
      fileName,
      lineNumber,
      functionName,
      componentName,
      deviceInfo: this.getDeviceInfo(),
      context,
      metadata: {
        appVersion: '1.0.0',
        buildNumber: '1',
        environment: __DEV__ ? 'development' : 'production'
      }
    };

    this.addToBuffer(logEntry);
    this.writeToFile(logEntry, 'debug');
    
    if (__DEV__) {
      console.log('🐛 DEBUG LOG:', logEntry);
    }
  }

  /**
   * Performance logini yozish
   */
  public logPerformance(
    operation: string,
    duration: number,
    componentName: string,
    functionName: string,
    metadata?: Record<string, any>
  ): void {
    const performanceLog: PerformanceLog = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      operation,
      duration,
      componentName,
      functionName,
      metadata
    };

    this.addToPerformanceBuffer(performanceLog);
    this.writeToFile(performanceLog, 'performance');
    
    if (__DEV__) {
      console.log('⚡ PERFORMANCE:', performanceLog);
    }
  }

  /**
   * Warning logini yozish
   */
  public logWarning(
    message: string,
    fileName: string,
    lineNumber: number,
    functionName: string,
    componentName?: string,
    context?: Record<string, any>
  ): void {
    const logEntry: LogEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level: LogLevel.WARNING,
      message,
      fileName,
      lineNumber,
      functionName,
      componentName,
      deviceInfo: this.getDeviceInfo(),
      context,
      metadata: {
        appVersion: '1.0.0',
        buildNumber: '1',
        environment: __DEV__ ? 'development' : 'production'
      }
    };

    this.addToBuffer(logEntry);
    this.writeToFile(logEntry, 'warnings');
    
    if (__DEV__) {
      console.warn('⚠️ WARNING LOG:', logEntry);
    }
  }

  /**
   * Info logini yozish
   */
  public logInfo(
    message: string,
    fileName: string,
    lineNumber: number,
    functionName: string,
    componentName?: string,
    context?: Record<string, any>
  ): void {
    const logEntry: LogEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message,
      fileName,
      lineNumber,
      functionName,
      componentName,
      deviceInfo: this.getDeviceInfo(),
      context,
      metadata: {
        appVersion: '1.0.0',
        buildNumber: '1',
        environment: __DEV__ ? 'development' : 'production'
      }
    };

    this.addToBuffer(logEntry);
    this.writeToFile(logEntry, 'info');
    
    if (__DEV__) {
      console.info('ℹ️ INFO LOG:', logEntry);
    }
  }

  /**
   * Buffer ga qo'shish
   */
  private addToBuffer(logEntry: LogEntry): void {
    this.logBuffer.push(logEntry);
    
    if (this.logBuffer.length >= this.maxBufferSize) {
      this.flushBuffer();
    }
  }

  /**
   * Performance buffer ga qo'shish
   */
  private addToPerformanceBuffer(performanceLog: PerformanceLog): void {
    this.performanceBuffer.push(performanceLog);
    
    if (this.performanceBuffer.length >= this.maxBufferSize) {
      this.flushPerformanceBuffer();
    }
  }

  /**
   * Faylga yozish
   */
  private async writeToFile(data: any, type: string): Promise<void> {
    try {
      const fileName = `${type}_${new Date().toISOString().split('T')[0]}.json`;
      const filePath = `logs/${type}/${fileName}`;
      
      // AsyncStorage ga saqlash (React Native uchun)
      const existingData = await AsyncStorage.getItem(filePath) || '[]';
      const logs = JSON.parse(existingData);
      logs.push(data);
      
      await AsyncStorage.setItem(filePath, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error('Log faylga yozishda xato:', error);
    }
  }

  /**
   * Buffer ni tozalash
   */
  private async flushBuffer(): Promise<void> {
    if (this.isFlushing || this.logBuffer.length === 0) return;
    
    this.isFlushing = true;
    try {
      const logsToFlush = [...this.logBuffer];
      this.logBuffer = [];
      
      for (const log of logsToFlush) {
        await this.writeToFile(log, 'errors');
      }
    } catch (error) {
      console.error('Buffer tozalashda xato:', error);
    } finally {
      this.isFlushing = false;
    }
  }

  /**
   * Performance buffer ni tozalash
   */
  private async flushPerformanceBuffer(): Promise<void> {
    if (this.performanceBuffer.length === 0) return;
    
    try {
      const logsToFlush = [...this.performanceBuffer];
      this.performanceBuffer = [];
      
      for (const log of logsToFlush) {
        await this.writeToFile(log, 'performance');
      }
    } catch (error) {
      console.error('Performance buffer tozalashda xato:', error);
    }
  }

  /**
   * Avtomatik buffer tozalash
   */
  private startAutoFlush(): void {
    setInterval(() => {
      this.flushBuffer();
      this.flushPerformanceBuffer();
    }, this.flushInterval);
  }

  /**
   * ID yaratish
   */
  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Qurilma ma'lumotlarini olish
   */
  private getDeviceInfo() {
    return {
      platform: Platform.OS,
      version: Platform.Version.toString(),
      model: Platform.OS === 'ios' ? 'iOS Device' : 'Android Device'
    };
  }

  /**
   * Barcha loglarni o'qish
   */
  public async getAllLogs(type: string, date?: string): Promise<any[]> {
    try {
      const fileName = date ? `${type}_${date}.json` : `${type}_${new Date().toISOString().split('T')[0]}.json`;
      const filePath = `logs/${type}/${fileName}`;
      
      const data = await AsyncStorage.getItem(filePath);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Loglarni o'qishda xato:', error);
      return [];
    }
  }

  /**
   * Loglarni tozalash
   */
  public async clearLogs(type: string, date?: string): Promise<void> {
    try {
      const fileName = date ? `${type}_${date}.json` : `${type}_${new Date().toISOString().split('T')[0]}.json`;
      const filePath = `logs/${type}/${fileName}`;
      
      await AsyncStorage.removeItem(filePath);
    } catch (error) {
      console.error('Loglarni tozalashda xato:', error);
    }
  }

  /**
   * Log statistikasini olish
   */
  public async getLogStats(): Promise<Record<string, any>> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const errorLogs = await this.getAllLogs('errors', today);
      const debugLogs = await this.getAllLogs('debug', today);
      const performanceLogs = await this.getAllLogs('performance', today);
      
      return {
        totalErrors: errorLogs.length,
        totalDebugs: debugLogs.length,
        totalPerformance: performanceLogs.length,
        errorLevels: this.countByLevel(errorLogs),
        topErrors: this.getTopErrors(errorLogs),
        performanceMetrics: this.getPerformanceMetrics(performanceLogs)
      };
    } catch (error) {
      console.error('Log statistikasini olishda xato:', error);
      return {};
    }
  }

  /**
   * Xato darajalarini hisoblash
   */
  private countByLevel(logs: LogEntry[]): Record<string, number> {
    return logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Eng ko'p yuz bergan xatolarni olish
   */
  private getTopErrors(logs: LogEntry[]): Array<{message: string, count: number}> {
    const errorCounts = logs.reduce((acc, log) => {
      acc[log.message] = (acc[log.message] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(errorCounts)
      .map(([message, count]) => ({ message, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  /**
   * Performance metrikalarini olish
   */
  private getPerformanceMetrics(logs: PerformanceLog[]): Record<string, any> {
    if (logs.length === 0) return {};
    
    const durations = logs.map(log => log.duration);
    const totalDuration = durations.reduce((sum, duration) => sum + duration, 0);
    
    return {
      averageDuration: totalDuration / logs.length,
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
      totalOperations: logs.length,
      slowestOperations: logs
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5)
        .map(log => ({
          operation: log.operation,
          duration: log.duration,
          component: log.componentName
        }))
    };
  }
}

export default Logger.getInstance();
