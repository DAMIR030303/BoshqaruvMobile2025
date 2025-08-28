// Boshqaruv - Design System Models
// Dizayn tizimi uchun ma'lumotlar modellari

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  DESIGN_TOKENS: '@boshqaruv/design_tokens',
  COMPONENTS: '@boshqaruv/components',
  SYNC_HISTORY: '@boshqaruv/sync_history',
  FIGMA_SETTINGS: '@boshqaruv/figma_settings',
  USER_PREFERENCES: '@boshqaruv/user_preferences',
  BREAKPOINTS: '@boshqaruv/breakpoints',
  RESPONSIVE_RULES: '@boshqaruv/responsive_rules',
};

// Base model interface
export interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

// Design Token Model
export interface DesignToken extends BaseModel {
  name: string;
  value: string | number | object;
  type: TokenType;
  category: string;
  description?: string;
  figmaStyleId?: string;
  figmaNodeId?: string;
  tags: string[];
  isActive: boolean;
  metadata: TokenMetadata;
}

export type TokenType = 
  | 'color' 
  | 'typography' 
  | 'spacing' 
  | 'borderRadius' 
  | 'shadow' 
  | 'opacity'
  | 'zIndex'
  | 'transition'
  | 'breakpoint'
  | 'grid'
  | 'other';

export interface TokenMetadata {
  platform: ('mobile' | 'web' | 'desktop')[];
  usage: string[];
  deprecated?: boolean;
  deprecationMessage?: string;
  replacedBy?: string;
  aliases: string[];
  references: string[];
}

// Color Token specific interface
export interface ColorToken extends DesignToken {
  type: 'color';
  value: {
    hex: string;
    rgb: { r: number; g: number; b: number };
    hsl: { h: number; s: number; l: number };
    alpha: number;
  };
  variants?: {
    light?: string;
    dark?: string;
    [key: string]: string | undefined;
  };
}

// Typography Token specific interface
export interface TypographyToken extends DesignToken {
  type: 'typography';
  value: {
    fontFamily: string;
    fontSize: number;
    fontWeight: string | number;
    lineHeight: number;
    letterSpacing?: number;
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  };
}

// Spacing Token specific interface
export interface SpacingToken extends DesignToken {
  type: 'spacing';
  value: number;
  unit: 'px' | 'rem' | 'em' | '%';
}

// Shadow Token specific interface
export interface ShadowToken extends DesignToken {
  type: 'shadow';
  value: {
    offsetX: number;
    offsetY: number;
    blurRadius: number;
    spreadRadius?: number;
    color: string;
    inset?: boolean;
  }[];
}

// Component Model
export interface DesignComponent extends BaseModel {
  name: string;
  displayName: string;
  description?: string;
  category: ComponentCategory;
  figmaComponentId?: string;
  figmaNodeId?: string;
  code: ComponentCode;
  props: ComponentProp[];
  variants: ComponentVariant[];
  states: ComponentState[];
  documentation: ComponentDocumentation;
  dependencies: string[];
  tags: string[];
  isActive: boolean;
  metadata: ComponentMetadata;
}

export type ComponentCategory = 
  | 'layout'
  | 'navigation'
  | 'input'
  | 'display'
  | 'feedback'
  | 'overlay'
  | 'media'
  | 'typography'
  | 'icon'
  | 'other';

export interface ComponentCode {
  reactNative: string;
  web?: string;
  styles: string;
  tests?: string;
  storybook?: string;
}

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description?: string;
  options?: any[];
  validation?: string;
}

export interface ComponentVariant {
  name: string;
  props: { [key: string]: any };
  description?: string;
  preview?: string;
}

export interface ComponentState {
  name: string;
  description: string;
  props: { [key: string]: any };
  styles?: { [key: string]: any };
}

export interface ComponentDocumentation {
  overview?: string;
  usage?: string;
  examples: ComponentExample[];
  accessibility?: string;
  guidelines?: string[];
  links: DocumentationLink[];
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
  preview?: string;
}

export interface DocumentationLink {
  title: string;
  url: string;
  type: 'figma' | 'storybook' | 'docs' | 'github' | 'other';
}

export interface ComponentMetadata {
  platform: ('mobile' | 'web' | 'desktop')[];
  responsive: boolean;
  accessibility: {
    tested: boolean;
    wcagLevel?: 'A' | 'AA' | 'AAA';
    screenReader: boolean;
    keyboard: boolean;
    colorContrast: boolean;
  };
  performance: {
    bundleSize?: number;
    renderTime?: number;
    memoryUsage?: number;
  };
  testing: {
    unitTests: boolean;
    integrationTests: boolean;
    visualTests: boolean;
    coverage?: number;
  };
}

// Sync History Model
export interface SyncHistory extends BaseModel {
  type: SyncType;
  status: SyncStatus;
  figmaFileId?: string;
  figmaFileName?: string;
  triggeredBy: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  summary: SyncSummary;
  changes: SyncChange[];
  errors: SyncError[];
  metadata: SyncMetadata;
}

export type SyncType = 'tokens' | 'components' | 'full' | 'manual';
export type SyncStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface SyncSummary {
  tokensAdded: number;
  tokensUpdated: number;
  tokensRemoved: number;
  componentsAdded: number;
  componentsUpdated: number;
  componentsRemoved: number;
  totalChanges: number;
}

export interface SyncChange {
  type: 'token' | 'component';
  action: 'add' | 'update' | 'remove';
  itemId: string;
  itemName: string;
  oldValue?: any;
  newValue?: any;
  figmaId?: string;
}

export interface SyncError {
  code: string;
  message: string;
  details?: any;
  itemId?: string;
  itemName?: string;
  severity: 'warning' | 'error' | 'critical';
}

export interface SyncMetadata {
  figmaVersion?: string;
  apiVersion: string;
  clientVersion: string;
  userAgent: string;
  platform: string;
  networkType?: string;
  retryCount: number;
}

// Figma Settings Model
export interface FigmaSettings extends BaseModel {
  apiKey?: string;
  fileId?: string;
  fileName?: string;
  teamId?: string;
  projectId?: string;
  autoSync: boolean;
  syncInterval: number; // in minutes
  syncOnStartup: boolean;
  notifyOnSync: boolean;
  conflictResolution: ConflictResolution;
  tokenFilters: TokenFilter[];
  componentFilters: ComponentFilter[];
  exportSettings: ExportSettings;
}

export type ConflictResolution = 'figma-wins' | 'local-wins' | 'manual' | 'merge';

export interface TokenFilter {
  type: TokenType;
  categories: string[];
  tags: string[];
  enabled: boolean;
}

export interface ComponentFilter {
  categories: ComponentCategory[];
  tags: string[];
  includeVariants: boolean;
  includeStates: boolean;
  enabled: boolean;
}

export interface ExportSettings {
  generateTypes: boolean;
  generateConstants: boolean;
  generateTheme: boolean;
  outputFormat: 'js' | 'ts' | 'json' | 'css';
  outputPath: string;
  fileNaming: 'kebab' | 'camel' | 'pascal' | 'snake';
  includeComments: boolean;
  minify: boolean;
}

// User Preferences Model
export interface UserPreferences extends BaseModel {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
  editor: EditorSettings;
  dashboard: DashboardSettings;
  accessibility: AccessibilitySettings;
}

export interface NotificationSettings {
  syncComplete: boolean;
  syncErrors: boolean;
  tokenUpdates: boolean;
  componentUpdates: boolean;
  systemUpdates: boolean;
  email: boolean;
  push: boolean;
  inApp: boolean;
}

export interface EditorSettings {
  fontSize: number;
  fontFamily: string;
  tabSize: number;
  wordWrap: boolean;
  lineNumbers: boolean;
  minimap: boolean;
  autoSave: boolean;
  formatOnSave: boolean;
}

export interface DashboardSettings {
  defaultView: 'grid' | 'list' | 'cards';
  itemsPerPage: number;
  showPreview: boolean;
  showMetadata: boolean;
  groupBy: 'category' | 'type' | 'status' | 'none';
  sortBy: 'name' | 'updated' | 'created' | 'usage';
  sortOrder: 'asc' | 'desc';
}

export interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
}

// Breakpoint Model
export interface Breakpoint extends BaseModel {
  name: string;
  minWidth: number;
  maxWidth?: number;
  description?: string;
  isActive: boolean;
  isDefault: boolean;
  order: number;
}

// Responsive Rule Model
export interface ResponsiveRule extends BaseModel {
  property: string;
  breakpointId: string;
  value: string | number;
  unit?: string;
  description?: string;
  selector?: string;
  important?: boolean;
}

// Database Service Class
class DesignSystemDatabase {
  // Generic CRUD operations
  async save<T extends BaseModel>(key: string, data: T[]): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
      throw error;
    }
  }

  async load<T extends BaseModel>(key: string): Promise<T[]> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
      return [];
    }
  }

  async findById<T extends BaseModel>(key: string, id: string): Promise<T | null> {
    try {
      const items = await this.load<T>(key);
      return items.find(item => item.id === id) || null;
    } catch (error) {
      console.error(`Failed to find ${key} by id:`, error);
      return null;
    }
  }

  async create<T extends BaseModel>(key: string, item: Omit<T, keyof BaseModel>): Promise<T> {
    try {
      const items = await this.load<T>(key);
      const now = new Date().toISOString();
      const newItem: T = {
        ...item,
        id: this.generateId(),
        createdAt: now,
        updatedAt: now,
        version: 1,
      } as T;
      
      items.push(newItem);
      await this.save(key, items);
      return newItem;
    } catch (error) {
      console.error(`Failed to create ${key}:`, error);
      throw error;
    }
  }

  async update<T extends BaseModel>(key: string, id: string, updates: Partial<T>): Promise<T | null> {
    try {
      const items = await this.load<T>(key);
      const index = items.findIndex(item => item.id === id);
      
      if (index === -1) {
        return null;
      }
      
      const updatedItem = {
        ...items[index],
        ...updates,
        updatedAt: new Date().toISOString(),
        version: (items[index]?.version || 0) + 1,
      } as T;
      
      items[index] = updatedItem;
      await this.save(key, items);
      return updatedItem;
    } catch (error) {
      console.error(`Failed to update ${key}:`, error);
      throw error;
    }
  }

  async delete<T extends BaseModel>(key: string, id: string): Promise<boolean> {
    try {
      const items = await this.load<T>(key);
      const filteredItems = items.filter(item => item.id !== id);
      
      if (filteredItems.length === items.length) {
        return false; // Item not found
      }
      
      await this.save(key, filteredItems);
      return true;
    } catch (error) {
      console.error(`Failed to delete ${key}:`, error);
      throw error;
    }
  }

  async clear(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to clear ${key}:`, error);
      throw error;
    }
  }

  // Design Tokens operations
  async getDesignTokens(): Promise<DesignToken[]> {
    return this.load<DesignToken>(STORAGE_KEYS.DESIGN_TOKENS);
  }

  async saveDesignTokens(tokens: DesignToken[]): Promise<void> {
    return this.save(STORAGE_KEYS.DESIGN_TOKENS, tokens);
  }

  async createDesignToken(token: Omit<DesignToken, keyof BaseModel>): Promise<DesignToken> {
    return this.create<DesignToken>(STORAGE_KEYS.DESIGN_TOKENS, token);
  }

  async updateDesignToken(id: string, updates: Partial<DesignToken>): Promise<DesignToken | null> {
    return this.update<DesignToken>(STORAGE_KEYS.DESIGN_TOKENS, id, updates);
  }

  async deleteDesignToken(id: string): Promise<boolean> {
    return this.delete<DesignToken>(STORAGE_KEYS.DESIGN_TOKENS, id);
  }

  async getDesignTokensByType(type: TokenType): Promise<DesignToken[]> {
    const tokens = await this.getDesignTokens();
    return tokens.filter(token => token.type === type);
  }

  async getDesignTokensByCategory(category: string): Promise<DesignToken[]> {
    const tokens = await this.getDesignTokens();
    return tokens.filter(token => token.category === category);
  }

  // Components operations
  async getComponents(): Promise<DesignComponent[]> {
    return this.load<DesignComponent>(STORAGE_KEYS.COMPONENTS);
  }

  async saveComponents(components: DesignComponent[]): Promise<void> {
    return this.save(STORAGE_KEYS.COMPONENTS, components);
  }

  async createComponent(component: Omit<DesignComponent, keyof BaseModel>): Promise<DesignComponent> {
    return this.create<DesignComponent>(STORAGE_KEYS.COMPONENTS, component);
  }

  async updateComponent(id: string, updates: Partial<DesignComponent>): Promise<DesignComponent | null> {
    return this.update<DesignComponent>(STORAGE_KEYS.COMPONENTS, id, updates);
  }

  async deleteComponent(id: string): Promise<boolean> {
    return this.delete<DesignComponent>(STORAGE_KEYS.COMPONENTS, id);
  }

  async getComponentsByCategory(category: ComponentCategory): Promise<DesignComponent[]> {
    const components = await this.getComponents();
    return components.filter(component => component.category === category);
  }

  // Sync History operations
  async getSyncHistory(): Promise<SyncHistory[]> {
    return this.load<SyncHistory>(STORAGE_KEYS.SYNC_HISTORY);
  }

  async saveSyncHistory(history: SyncHistory[]): Promise<void> {
    return this.save(STORAGE_KEYS.SYNC_HISTORY, history);
  }

  async createSyncHistory(sync: Omit<SyncHistory, keyof BaseModel>): Promise<SyncHistory> {
    return this.create<SyncHistory>(STORAGE_KEYS.SYNC_HISTORY, sync);
  }

  async updateSyncHistory(id: string, updates: Partial<SyncHistory>): Promise<SyncHistory | null> {
    return this.update<SyncHistory>(STORAGE_KEYS.SYNC_HISTORY, id, updates);
  }

  async getRecentSyncHistory(limit: number = 10): Promise<SyncHistory[]> {
    const history = await this.getSyncHistory();
    return history
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  // Figma Settings operations
  async getFigmaSettings(): Promise<FigmaSettings | null> {
    const settings = await this.load<FigmaSettings>(STORAGE_KEYS.FIGMA_SETTINGS);
    return settings.length > 0 ? settings[0] || null : null;
  }

  async saveFigmaSettings(settings: FigmaSettings): Promise<void> {
    return this.save(STORAGE_KEYS.FIGMA_SETTINGS, [settings]);
  }

  async updateFigmaSettings(updates: Partial<FigmaSettings>): Promise<FigmaSettings | null> {
    const settings = await this.getFigmaSettings();
    if (!settings) {
      const newSettings = await this.create<FigmaSettings>(STORAGE_KEYS.FIGMA_SETTINGS, {
        autoSync: false,
        syncInterval: 60,
        syncOnStartup: false,
        notifyOnSync: true,
        conflictResolution: 'manual',
        tokenFilters: [],
        componentFilters: [],
        exportSettings: {
          generateTypes: true,
          generateConstants: true,
          generateTheme: true,
          outputFormat: 'ts',
          outputPath: './src/theme',
          fileNaming: 'kebab',
          includeComments: true,
          minify: false,
        },
        ...updates,
      } as Omit<FigmaSettings, keyof BaseModel>);
      return newSettings;
    }
    
    return this.update<FigmaSettings>(STORAGE_KEYS.FIGMA_SETTINGS, settings.id, updates);
  }

  // User Preferences operations
  async getUserPreferences(): Promise<UserPreferences | null> {
    const preferences = await this.load<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES);
    return preferences.length > 0 ? preferences[0] || null : null;
  }

  async saveUserPreferences(preferences: UserPreferences): Promise<void> {
    return this.save(STORAGE_KEYS.USER_PREFERENCES, [preferences]);
  }

  async updateUserPreferences(updates: Partial<UserPreferences>): Promise<UserPreferences | null> {
    const preferences = await this.getUserPreferences();
    if (!preferences) {
      const newPreferences = await this.create<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES, {
        theme: 'system',
        language: 'uz',
        notifications: {
          syncComplete: true,
          syncErrors: true,
          tokenUpdates: true,
          componentUpdates: true,
          systemUpdates: true,
          email: false,
          push: true,
          inApp: true,
        },
        editor: {
          fontSize: 14,
          fontFamily: 'Monaco',
          tabSize: 2,
          wordWrap: true,
          lineNumbers: true,
          minimap: false,
          autoSave: true,
          formatOnSave: true,
        },
        dashboard: {
          defaultView: 'grid',
          itemsPerPage: 20,
          showPreview: true,
          showMetadata: false,
          groupBy: 'category',
          sortBy: 'name',
          sortOrder: 'asc',
        },
        accessibility: {
          highContrast: false,
          reducedMotion: false,
          screenReader: false,
          keyboardNavigation: true,
          focusIndicators: true,
          fontSize: 'medium',
        },
        ...updates,
      } as Omit<UserPreferences, keyof BaseModel>);
      return newPreferences;
    }
    
    return this.update<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES, preferences.id, updates);
  }

  // Breakpoints operations
  async getBreakpoints(): Promise<Breakpoint[]> {
    return this.load<Breakpoint>(STORAGE_KEYS.BREAKPOINTS);
  }

  async saveBreakpoints(breakpoints: Breakpoint[]): Promise<void> {
    return this.save(STORAGE_KEYS.BREAKPOINTS, breakpoints);
  }

  async createBreakpoint(breakpoint: Omit<Breakpoint, keyof BaseModel>): Promise<Breakpoint> {
    return this.create<Breakpoint>(STORAGE_KEYS.BREAKPOINTS, breakpoint);
  }

  async updateBreakpoint(id: string, updates: Partial<Breakpoint>): Promise<Breakpoint | null> {
    return this.update<Breakpoint>(STORAGE_KEYS.BREAKPOINTS, id, updates);
  }

  async deleteBreakpoint(id: string): Promise<boolean> {
    return this.delete<Breakpoint>(STORAGE_KEYS.BREAKPOINTS, id);
  }

  // Responsive Rules operations
  async getResponsiveRules(): Promise<ResponsiveRule[]> {
    return this.load<ResponsiveRule>(STORAGE_KEYS.RESPONSIVE_RULES);
  }

  async saveResponsiveRules(rules: ResponsiveRule[]): Promise<void> {
    return this.save(STORAGE_KEYS.RESPONSIVE_RULES, rules);
  }

  async createResponsiveRule(rule: Omit<ResponsiveRule, keyof BaseModel>): Promise<ResponsiveRule> {
    return this.create<ResponsiveRule>(STORAGE_KEYS.RESPONSIVE_RULES, rule);
  }

  async updateResponsiveRule(id: string, updates: Partial<ResponsiveRule>): Promise<ResponsiveRule | null> {
    return this.update<ResponsiveRule>(STORAGE_KEYS.RESPONSIVE_RULES, id, updates);
  }

  async deleteResponsiveRule(id: string): Promise<boolean> {
    return this.delete<ResponsiveRule>(STORAGE_KEYS.RESPONSIVE_RULES, id);
  }

  async getResponsiveRulesByBreakpoint(breakpointId: string): Promise<ResponsiveRule[]> {
    const rules = await this.getResponsiveRules();
    return rules.filter(rule => rule.breakpointId === breakpointId);
  }

  // Utility methods
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async exportData(): Promise<{
    tokens: DesignToken[];
    components: DesignComponent[];
    syncHistory: SyncHistory[];
    settings: FigmaSettings | null;
    preferences: UserPreferences | null;
    breakpoints: Breakpoint[];
    responsiveRules: ResponsiveRule[];
  }> {
    return {
      tokens: await this.getDesignTokens(),
      components: await this.getComponents(),
      syncHistory: await this.getSyncHistory(),
      settings: await this.getFigmaSettings(),
      preferences: await this.getUserPreferences(),
      breakpoints: await this.getBreakpoints(),
      responsiveRules: await this.getResponsiveRules(),
    };
  }

  async importData(data: {
    tokens?: DesignToken[];
    components?: DesignComponent[];
    syncHistory?: SyncHistory[];
    settings?: FigmaSettings;
    preferences?: UserPreferences;
    breakpoints?: Breakpoint[];
    responsiveRules?: ResponsiveRule[];
  }): Promise<void> {
    if (data.tokens) await this.saveDesignTokens(data.tokens);
    if (data.components) await this.saveComponents(data.components);
    if (data.syncHistory) await this.saveSyncHistory(data.syncHistory);
    if (data.settings) await this.saveFigmaSettings(data.settings);
    if (data.preferences) await this.saveUserPreferences(data.preferences);
    if (data.breakpoints) await this.saveBreakpoints(data.breakpoints);
    if (data.responsiveRules) await this.saveResponsiveRules(data.responsiveRules);
  }

  async clearAllData(): Promise<void> {
    await Promise.all([
      this.clear(STORAGE_KEYS.DESIGN_TOKENS),
      this.clear(STORAGE_KEYS.COMPONENTS),
      this.clear(STORAGE_KEYS.SYNC_HISTORY),
      this.clear(STORAGE_KEYS.FIGMA_SETTINGS),
      this.clear(STORAGE_KEYS.USER_PREFERENCES),
      this.clear(STORAGE_KEYS.BREAKPOINTS),
      this.clear(STORAGE_KEYS.RESPONSIVE_RULES),
    ]);
  }

  async getStorageSize(): Promise<{
    total: number;
    byKey: { [key: string]: number };
  }> {
    const sizes: { [key: string]: number } = {};
    let total = 0;

    for (const [name, key] of Object.entries(STORAGE_KEYS)) {
      try {
        const data = await AsyncStorage.getItem(key);
        const size = data ? new Blob([data]).size : 0;
        sizes[name] = size;
        total += size;
      } catch (error) {
        sizes[name] = 0;
      }
    }

    return { total, byKey: sizes };
  }
}

// Export singleton instance
export const designSystemDb = new DesignSystemDatabase();

// Export storage keys for direct access if needed
export { STORAGE_KEYS };

// Export database class for custom instances
export { DesignSystemDatabase };