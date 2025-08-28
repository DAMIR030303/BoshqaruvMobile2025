/**
 * BoshqaruvMobile - Performance Monitor Komponenti
 * Komponentlar ishlash vaqtini kuzatib boradi va log qiladi
 * 
 * @author Damir Nurmurodov
 * @version 1.0.0
 * @created 2025
 */

import React, { Component, ReactNode } from 'react';
import Logger from '../services/Logger';

interface Props {
  children: ReactNode;
  componentName: string;
  operation?: string;
  threshold?: number; // ms da - bu vaqtdan ko'p bo'lsa warning log
  logPerformance?: boolean;
}

interface State {
  startTime: number;
  endTime: number;
  duration: number;
  isMonitoring: boolean;
}

class PerformanceMonitor extends Component<Props, State> {
  private performanceId: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      startTime: 0,
      endTime: 0,
      duration: 0,
      isMonitoring: false,
    };
    this.performanceId = `${props.componentName}_${Date.now()}`;
  }

  componentDidMount(): void {
    this.startMonitoring();
  }

  componentDidUpdate(): void {
    if (this.props.logPerformance) {
      this.startMonitoring();
    }
  }

  componentWillUnmount(): void {
    this.endMonitoring();
  }

  /**
   * Performance monitoring ni boshlash
   */
  private startMonitoring = (): void => {
    if (this.state.isMonitoring) return;

    const startTime = performance.now();
    this.setState({
      startTime,
      isMonitoring: true,
    });

    // Debug log
    Logger.logDebug(
      `Performance monitoring boshladi: ${this.props.componentName}`,
      'PerformanceMonitor.tsx',
      this.getLineNumber(''),
      'startMonitoring',
      'PerformanceMonitor',
      {
        componentName: this.props.componentName,
        operation: this.props.operation || 'render',
        startTime,
      }
    );
  };

  /**
   * Performance monitoring ni tugatish
   */
  private endMonitoring = (): void => {
    if (!this.state.isMonitoring) return;

    const endTime = performance.now();
    const duration = endTime - this.state.startTime;

    this.setState({
      endTime,
      duration,
      isMonitoring: false,
    });

    // Performance logini yozish
    Logger.logPerformance(
      this.props.operation || 'render',
      duration,
      this.props.componentName,
      'PerformanceMonitor',
      {
        startTime: this.state.startTime,
        endTime,
        threshold: this.props.threshold,
        performanceId: this.performanceId,
      }
    );

    // Threshold dan oshsa warning log
    if (this.props.threshold && duration > this.props.threshold) {
      Logger.logWarning(
        `Performance threshold oshdi: ${this.props.componentName} - ${duration.toFixed(2)}ms > ${this.props.threshold}ms`,
        'PerformanceMonitor.tsx',
        this.getLineNumber(''),
        'endMonitoring',
        'PerformanceMonitor',
        {
          componentName: this.props.componentName,
          duration,
          threshold: this.props.threshold,
          operation: this.props.operation || 'render',
        }
      );
    }

    // Debug log
    Logger.logDebug(
      `Performance monitoring tugadi: ${this.props.componentName} - ${duration.toFixed(2)}ms`,
      'PerformanceMonitor.tsx',
      this.getLineNumber(''),
      'endMonitoring',
      'PerformanceMonitor',
      {
        componentName: this.props.componentName,
        duration,
        operation: this.props.operation || 'render',
      }
    );
  };

  /**
   * Qator raqamini olish
   */
  private getLineNumber(stack: string): number {
    try {
      const error = new Error();
      const stackLines = error.stack?.split('\n') || [];
      for (const line of stackLines) {
        if (line.includes('PerformanceMonitor.tsx:')) {
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

  render(): ReactNode {
    return this.props.children;
  }
}

export default PerformanceMonitor;
