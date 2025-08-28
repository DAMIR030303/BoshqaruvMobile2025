/**
 * BoshqaruvMobile - Log Viewer Komponenti
 * Log tizimidan ma'lumotlarni ko'rish va boshqarish
 * 
 * @author Damir Nurmurodov
 * @version 1.0.0
 * @created 2025
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
  TextInput,
} from 'react-native';
import Logger, { LogLevel } from '../services/Logger';

interface LogViewerProps {
  visible?: boolean;
  onClose?: () => void;
}

const LogViewer: React.FC<LogViewerProps> = ({ visible = false, onClose }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [selectedLogType, setSelectedLogType] = useState<string>('errors');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stats, setStats] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const logTypes = [
    { key: 'errors', label: 'Xatolar', color: '#dc3545' },
    { key: 'warnings', label: 'Ogohlantirishlar', color: '#ffc107' },
    { key: 'debug', label: 'Debug', color: '#17a2b8' },
    { key: 'info', label: 'Ma\'lumotlar', color: '#28a745' },
    { key: 'performance', label: 'Performance', color: '#6f42c1' },
  ];

  useEffect(() => {
    if (visible) {
      loadLogs();
      loadStats();
    }
  }, [visible, selectedLogType, selectedDate]);

  useEffect(() => {
    filterLogs();
  }, [logs, searchQuery]);

  /**
   * Loglarni yuklash
   */
  const loadLogs = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const logData = await Logger.getAllLogs(selectedLogType, selectedDate);
      setLogs(logData);
    } catch (error) {
      console.error('Loglarni yuklashda xato:', error);
      Alert.alert('Xato', 'Loglarni yuklashda xato yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Statistikani yuklash
   */
  const loadStats = async (): Promise<void> => {
    try {
      const statsData = await Logger.getLogStats();
      setStats(statsData);
    } catch (error) {
      console.error('Statistikani yuklashda xato:', error);
    }
  };

  /**
   * Loglarni filtrlash
   */
  const filterLogs = (): void => {
    if (!searchQuery.trim()) {
      setFilteredLogs(logs);
      return;
    }

    const filtered = logs.filter((log) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        log.message?.toLowerCase().includes(searchLower) ||
        log.fileName?.toLowerCase().includes(searchLower) ||
        log.functionName?.toLowerCase().includes(searchLower) ||
        log.componentName?.toLowerCase().includes(searchLower)
      );
    });

    setFilteredLogs(filtered);
  };

  /**
   * Loglarni tozalash
   */
  const clearLogs = async (): Promise<void> => {
    Alert.alert(
      'Loglarni tozalash',
      `Haqiqatan ham ${selectedLogType} loglarini tozalamoqchimisiz?`,
      [
        { text: 'Bekor', style: 'cancel' },
        {
          text: 'Tozalash',
          style: 'destructive',
          onPress: async () => {
            try {
              await Logger.clearLogs(selectedLogType, selectedDate);
              await loadLogs();
              await loadStats();
              Alert.alert('Muvaffaqiyatli', 'Loglar tozalandi');
            } catch (error) {
              console.error('Loglarni tozalashda xato:', error);
              Alert.alert('Xato', 'Loglarni tozalashda xato yuz berdi');
            }
          },
        },
      ]
    );
  };

  /**
   * Log darajasiga mos rang
   */
  const getLogLevelColor = (level: string): string => {
    switch (level) {
      case LogLevel.ERROR:
        return '#dc3545';
      case LogLevel.WARNING:
        return '#ffc107';
      case LogLevel.INFO:
        return '#28a745';
      case LogLevel.DEBUG:
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  /**
   * Vaqtni formatlash
   */
  const formatTime = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('uz-UZ');
    } catch {
      return timestamp;
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Log Tizimi</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {logTypes.map((type) => (
            <TouchableOpacity
              key={type.key}
              style={[
                styles.statCard,
                selectedLogType === type.key && styles.selectedStatCard,
              ]}
              onPress={() => setSelectedLogType(type.key)}
            >
              <Text style={[styles.statNumber, { color: type.color }]}>
                {stats[`total${type.key.charAt(0).toUpperCase() + type.key.slice(1)}`] || 0}
              </Text>
              <Text style={styles.statLabel}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Loglarni qidirish..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.clearButton} onPress={clearLogs}>
          <Text style={styles.clearButtonText}>Tozalash</Text>
        </TouchableOpacity>
      </View>

      {/* Logs */}
      <ScrollView
        style={styles.logsContainer}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadLogs} />
        }
      >
        {filteredLogs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {isLoading ? 'Yuklanmoqda...' : 'Loglar topilmadi'}
            </Text>
          </View>
        ) : (
          filteredLogs.map((log, index) => (
            <View key={log.id || index} style={styles.logItem}>
              <View style={styles.logHeader}>
                <View style={styles.logLevel}>
                  <View
                    style={[
                      styles.levelIndicator,
                      { backgroundColor: getLogLevelColor(log.level) },
                    ]}
                  />
                  <Text style={styles.logLevelText}>{log.level}</Text>
                </View>
                <Text style={styles.logTime}>{formatTime(log.timestamp)}</Text>
              </View>

              <Text style={styles.logMessage}>{log.message}</Text>

              <View style={styles.logDetails}>
                <Text style={styles.logDetail}>
                  📁 {log.fileName}:{log.lineNumber}
                </Text>
                <Text style={styles.logDetail}>
                  🔧 {log.functionName}
                </Text>
                {log.componentName && (
                  <Text style={styles.logDetail}>
                    🧩 {log.componentName}
                  </Text>
                )}
              </View>

              {log.context && Object.keys(log.context).length > 0 && (
                <View style={styles.logContext}>
                  <Text style={styles.contextTitle}>Context:</Text>
                  <Text style={styles.contextText}>
                    {JSON.stringify(log.context, null, 2)}
                  </Text>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6c757d',
  },
  statsContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  statCard: {
    padding: 16,
    marginRight: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  selectedStatCard: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    marginRight: 12,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  logsContainer: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6c757d',
  },
  logItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  logLevelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
  },
  logTime: {
    fontSize: 12,
    color: '#6c757d',
  },
  logMessage: {
    fontSize: 14,
    color: '#343a40',
    marginBottom: 8,
    lineHeight: 20,
  },
  logDetails: {
    marginBottom: 8,
  },
  logDetail: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  logContext: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 4,
  },
  contextTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  contextText: {
    fontSize: 11,
    color: '#6c757d',
    fontFamily: 'monospace',
  },
});

export default LogViewer;
