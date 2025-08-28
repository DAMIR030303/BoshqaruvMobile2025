// Boshqaruv - Design System Redux Slice
// Dizayn tizimi Redux slice

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { figmaService } from '../../api/services/figmaService';
import { designSystemDb, DesignToken, DesignComponent, SyncHistory, FigmaSettings, BaseModel } from '../models/designSystem';

// State interfaces
interface DesignSystemState {
  // Design tokens
  tokens: {
    items: DesignToken[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    selectedCategory: string;
    filters: {
      type: string[];
      category: string[];
      platform: string[];
    };
  };
  
  // Components
  components: {
    items: DesignComponent[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    selectedCategory: string;
    filters: {
      category: string[];
      platform: string[];
      status: string[];
    };
  };
  
  // Sync operations
  sync: {
    history: SyncHistory[];
    activeSyncs: string[];
    lastSyncTime: string | null;
    syncStatus: 'idle' | 'syncing' | 'success' | 'error';
    syncProgress: {
      current: number;
      total: number;
      message: string;
    };
    conflicts: any[];
  };
  
  // Figma settings
  figma: {
    settings: FigmaSettings | null;
    connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
    connectionError: string | null;
    fileInfo: {
      name: string;
      lastModified: string;
      version: string;
    } | null;
  };
  
  // UI state
  ui: {
    activeTab: 'dashboard' | 'tokens' | 'components' | 'sync' | 'settings';
    sidebarCollapsed: boolean;
    selectedTokenId: string | null;
    selectedComponentId: string | null;
    showPreview: boolean;
    previewMode: 'mobile' | 'tablet' | 'desktop';
  };
}

const initialState: DesignSystemState = {
  tokens: {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'all',
    filters: {
      type: [],
      category: [],
      platform: []
    }
  },
  components: {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'all',
    filters: {
      category: [],
      platform: [],
      status: []
    }
  },
  sync: {
    history: [],
    activeSyncs: [],
    lastSyncTime: null,
    syncStatus: 'idle',
    syncProgress: {
      current: 0,
      total: 0,
      message: ''
    },
    conflicts: []
  },
  figma: {
    settings: null,
    connectionStatus: 'disconnected',
    connectionError: null,
    fileInfo: null
  },
  ui: {
    activeTab: 'dashboard',
    sidebarCollapsed: false,
    selectedTokenId: null,
    selectedComponentId: null,
    showPreview: false,
    previewMode: 'mobile'
  }
};

// Async thunks for API operations

// Load design tokens
export const loadDesignTokens = createAsyncThunk(
  'designSystem/loadDesignTokens',
  async (_, { rejectWithValue }) => {
    try {
      const tokens = await designSystemDb.getDesignTokens();
      return tokens;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load tokens');
    }
  }
);

// Create design token
export const createDesignToken = createAsyncThunk(
  'designSystem/createDesignToken',
  async (tokenData: Omit<DesignToken, keyof BaseModel>, { rejectWithValue }) => {
    try {
      const token = await designSystemDb.createDesignToken(tokenData);
      return token;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create token');
    }
  }
);

// Update design token
export const updateDesignToken = createAsyncThunk(
  'designSystem/updateDesignToken',
  async ({ id, updates }: { id: string; updates: Partial<DesignToken> }, { rejectWithValue }) => {
    try {
      const token = await designSystemDb.updateDesignToken(id, updates);
      return token;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update token');
    }
  }
);

// Delete design token
export const deleteDesignToken = createAsyncThunk(
  'designSystem/deleteDesignToken',
  async (id: string, { rejectWithValue }) => {
    try {
      await designSystemDb.deleteDesignToken(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete token');
    }
  }
);

// Load components
export const loadComponents = createAsyncThunk(
  'designSystem/loadComponents',
  async (_, { rejectWithValue }) => {
    try {
      const components = await designSystemDb.getComponents();
      return components;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load components');
    }
  }
);

// Create component
export const createComponent = createAsyncThunk(
  'designSystem/createComponent',
  async (componentData: Omit<DesignComponent, keyof BaseModel>, { rejectWithValue }) => {
    try {
      const component = await designSystemDb.createComponent(componentData);
      return component;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create component');
    }
  }
);

// Update component
export const updateComponent = createAsyncThunk(
  'designSystem/updateComponent',
  async ({ id, updates }: { id: string; updates: Partial<DesignComponent> }, { rejectWithValue }) => {
    try {
      const component = await designSystemDb.updateComponent(id, updates);
      return component;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update component');
    }
  }
);

// Delete component
export const deleteComponent = createAsyncThunk(
  'designSystem/deleteComponent',
  async (id: string, { rejectWithValue }) => {
    try {
      await designSystemDb.deleteComponent(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete component');
    }
  }
);

// Load sync history
export const loadSyncHistory = createAsyncThunk(
  'designSystem/loadSyncHistory',
  async (_, { rejectWithValue }) => {
    try {
      const history = await designSystemDb.getSyncHistory();
      return history;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load sync history');
    }
  }
);

// Sync design tokens from Figma
export const syncDesignTokens = createAsyncThunk(
  'designSystem/syncDesignTokens',
  async (options: { fileId: string; triggeredBy?: string }, { rejectWithValue, dispatch }) => {
    try {
      const result = await figmaService.syncDesignTokens(options.fileId, {
        triggeredBy: options.triggeredBy || 'user',
        includeTokens: true
      });
      
      // Start polling for sync status
      dispatch(startSyncPolling(result.id));
      
      return result;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to sync tokens');
    }
  }
);

// Sync components from Figma
export const syncComponents = createAsyncThunk(
  'designSystem/syncComponents',
  async (options: { fileId: string; triggeredBy?: string }, { rejectWithValue, dispatch }) => {
    try {
      const result = await figmaService.syncComponents(options.fileId, {
        triggeredBy: options.triggeredBy || 'user',
        includeComponents: true
      });
      
      dispatch(startSyncPolling(result.id));
      
      return result;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to sync components');
    }
  }
);

// Full sync from Figma
export const fullSync = createAsyncThunk(
  'designSystem/fullSync',
  async (options: { fileId: string; triggeredBy?: string }, { rejectWithValue, dispatch }) => {
    try {
      const result = await figmaService.fullSync(options.fileId, {
        triggeredBy: options.triggeredBy || 'user',
        includeTokens: true,
        includeComponents: true
      });
      
      dispatch(startSyncPolling(result.id));
      
      return result;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to perform full sync');
    }
  }
);

// Cancel sync
export const cancelSync = createAsyncThunk(
  'designSystem/cancelSync',
  async (syncId: string, { rejectWithValue }) => {
    try {
      const success = await figmaService.cancelSync(syncId);
      if (success) {
        return syncId;
      }
      throw new Error('Failed to cancel sync');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to cancel sync');
    }
  }
);

// Test Figma connection
export const testFigmaConnection = createAsyncThunk(
  'designSystem/testFigmaConnection',
  async (options: { apiKey?: string; fileId?: string }, { rejectWithValue }) => {
    try {
      const result = await figmaService.testConnection(options.apiKey, options.fileId);
      return result;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Connection test failed');
    }
  }
);

// Load Figma settings
export const loadFigmaSettings = createAsyncThunk(
  'designSystem/loadFigmaSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await designSystemDb.getFigmaSettings();
      return settings;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to load Figma settings');
    }
  }
);

// Update Figma settings
export const updateFigmaSettings = createAsyncThunk(
  'designSystem/updateFigmaSettings',
  async (settings: Partial<FigmaSettings>, { rejectWithValue }) => {
    try {
      const updatedSettings = await designSystemDb.updateFigmaSettings(settings);
      return updatedSettings;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update Figma settings');
    }
  }
);

// Start sync polling (internal action)
const startSyncPolling = createAsyncThunk(
  'designSystem/startSyncPolling',
  async (syncId: string, { dispatch, getState }) => {
    // This would implement polling logic to check sync status
    // For now, we'll just simulate it
    const pollInterval = setInterval(async () => {
      try {
        // In a real implementation, you'd check the sync status
        // const status = await figmaService.getSyncStatus(syncId);
        // if (status.status === 'completed' || status.status === 'failed') {
        //   clearInterval(pollInterval);
        //   dispatch(syncCompleted({ syncId, status }));
        // }
      } catch (error) {
        clearInterval(pollInterval);
        console.error('Sync polling error:', error);
      }
    }, 2000);

    // Clean up after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 300000);

    return syncId;
  }
);

// Create the slice
const designSystemSlice = createSlice({
  name: 'designSystem',
  initialState,
  reducers: {
    // UI actions
    setActiveTab: (state, action: PayloadAction<DesignSystemState['ui']['activeTab']>) => {
      state.ui.activeTab = action.payload;
    },
    
    toggleSidebar: (state) => {
      state.ui.sidebarCollapsed = !state.ui.sidebarCollapsed;
    },
    
    setSelectedToken: (state, action: PayloadAction<string | null>) => {
      state.ui.selectedTokenId = action.payload;
    },
    
    setSelectedComponent: (state, action: PayloadAction<string | null>) => {
      state.ui.selectedComponentId = action.payload;
    },
    
    setPreviewMode: (state, action: PayloadAction<'mobile' | 'tablet' | 'desktop'>) => {
      state.ui.previewMode = action.payload;
    },
    
    togglePreview: (state) => {
      state.ui.showPreview = !state.ui.showPreview;
    },
    
    // Token filters
    setTokenSearchQuery: (state, action: PayloadAction<string>) => {
      state.tokens.searchQuery = action.payload;
    },
    
    setTokenCategory: (state, action: PayloadAction<string>) => {
      state.tokens.selectedCategory = action.payload;
    },
    
    setTokenFilters: (state, action: PayloadAction<Partial<DesignSystemState['tokens']['filters']>>) => {
      state.tokens.filters = { ...state.tokens.filters, ...action.payload };
    },
    
    clearTokenFilters: (state) => {
      state.tokens.filters = {
        type: [],
        category: [],
        platform: []
      };
      state.tokens.searchQuery = '';
      state.tokens.selectedCategory = 'all';
    },
    
    // Component filters
    setComponentSearchQuery: (state, action: PayloadAction<string>) => {
      state.components.searchQuery = action.payload;
    },
    
    setComponentCategory: (state, action: PayloadAction<string>) => {
      state.components.selectedCategory = action.payload;
    },
    
    setComponentFilters: (state, action: PayloadAction<Partial<DesignSystemState['components']['filters']>>) => {
      state.components.filters = { ...state.components.filters, ...action.payload };
    },
    
    clearComponentFilters: (state) => {
      state.components.filters = {
        category: [],
        platform: [],
        status: []
      };
      state.components.searchQuery = '';
      state.components.selectedCategory = 'all';
    },
    
    // Sync actions
    setSyncProgress: (state, action: PayloadAction<Partial<DesignSystemState['sync']['syncProgress']>>) => {
      state.sync.syncProgress = { ...state.sync.syncProgress, ...action.payload };
    },
    
    addSyncConflict: (state, action: PayloadAction<any>) => {
      state.sync.conflicts.push(action.payload);
    },
    
    resolveSyncConflict: (state, action: PayloadAction<{ id: string; resolution: any }>) => {
      state.sync.conflicts = state.sync.conflicts.filter(c => c.id !== action.payload.id);
    },
    
    clearSyncConflicts: (state) => {
      state.sync.conflicts = [];
    },
    
    // Reset states
    resetTokensState: (state) => {
      state.tokens = initialState.tokens;
    },
    
    resetComponentsState: (state) => {
      state.components = initialState.components;
    },
    
    resetSyncState: (state) => {
      state.sync = initialState.sync;
    }
  },
  extraReducers: (builder) => {
    // Design tokens
    builder
      .addCase(loadDesignTokens.pending, (state) => {
        state.tokens.loading = true;
        state.tokens.error = null;
      })
      .addCase(loadDesignTokens.fulfilled, (state, action) => {
        state.tokens.loading = false;
        state.tokens.items = action.payload;
      })
      .addCase(loadDesignTokens.rejected, (state, action) => {
        state.tokens.loading = false;
        state.tokens.error = action.payload as string;
      })
      
      .addCase(createDesignToken.fulfilled, (state, action) => {
        state.tokens.items.push(action.payload);
      })
      
      .addCase(updateDesignToken.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.tokens.items.findIndex(t => t.id === action.payload!.id);
          if (index !== -1) {
            state.tokens.items[index] = action.payload;
          }
        }
      })
      
      .addCase(deleteDesignToken.fulfilled, (state, action) => {
        state.tokens.items = state.tokens.items.filter(t => t.id !== action.payload);
      })
      
      // Components
      .addCase(loadComponents.pending, (state) => {
        state.components.loading = true;
        state.components.error = null;
      })
      .addCase(loadComponents.fulfilled, (state, action) => {
        state.components.loading = false;
        state.components.items = action.payload;
      })
      .addCase(loadComponents.rejected, (state, action) => {
        state.components.loading = false;
        state.components.error = action.payload as string;
      })
      
      .addCase(createComponent.fulfilled, (state, action) => {
        state.components.items.push(action.payload);
      })
      
      .addCase(updateComponent.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.components.items.findIndex(c => c.id === action.payload!.id);
          if (index !== -1) {
            state.components.items[index] = action.payload;
          }
        }
      })
      
      .addCase(deleteComponent.fulfilled, (state, action) => {
        state.components.items = state.components.items.filter(c => c.id !== action.payload);
      })
      
      // Sync operations
      .addCase(loadSyncHistory.fulfilled, (state, action) => {
        state.sync.history = action.payload;
        if (action.payload.length > 0 && action.payload[0]) {
          state.sync.lastSyncTime = action.payload[0].startTime;
        }
      })
      
      .addCase(syncDesignTokens.pending, (state) => {
        state.sync.syncStatus = 'syncing';
        state.sync.syncProgress = { current: 0, total: 100, message: 'Starting token sync...' };
      })
      .addCase(syncDesignTokens.fulfilled, (state, action) => {
        state.sync.activeSyncs.push(action.payload.id);
        state.sync.syncProgress.message = 'Token sync in progress...';
      })
      .addCase(syncDesignTokens.rejected, (state, action) => {
        state.sync.syncStatus = 'error';
        state.sync.syncProgress.message = action.payload as string;
      })
      
      .addCase(syncComponents.pending, (state) => {
        state.sync.syncStatus = 'syncing';
        state.sync.syncProgress = { current: 0, total: 100, message: 'Starting component sync...' };
      })
      .addCase(syncComponents.fulfilled, (state, action) => {
        state.sync.activeSyncs.push(action.payload.id);
        state.sync.syncProgress.message = 'Component sync in progress...';
      })
      .addCase(syncComponents.rejected, (state, action) => {
        state.sync.syncStatus = 'error';
        state.sync.syncProgress.message = action.payload as string;
      })
      
      .addCase(fullSync.pending, (state) => {
        state.sync.syncStatus = 'syncing';
        state.sync.syncProgress = { current: 0, total: 100, message: 'Starting full sync...' };
      })
      .addCase(fullSync.fulfilled, (state, action) => {
        state.sync.activeSyncs.push(action.payload.id);
        state.sync.syncProgress.message = 'Full sync in progress...';
      })
      .addCase(fullSync.rejected, (state, action) => {
        state.sync.syncStatus = 'error';
        state.sync.syncProgress.message = action.payload as string;
      })
      
      .addCase(cancelSync.fulfilled, (state, action) => {
        state.sync.activeSyncs = state.sync.activeSyncs.filter(id => id !== action.payload);
        if (state.sync.activeSyncs.length === 0) {
          state.sync.syncStatus = 'idle';
          state.sync.syncProgress = { current: 0, total: 0, message: '' };
        }
      })
      
      // Figma connection
      .addCase(testFigmaConnection.pending, (state) => {
        state.figma.connectionStatus = 'connecting';
        state.figma.connectionError = null;
      })
      .addCase(testFigmaConnection.fulfilled, (state, action) => {
        state.figma.connectionStatus = action.payload.connected ? 'connected' : 'error';
        state.figma.connectionError = action.payload.error || null;
        state.figma.fileInfo = action.payload.fileInfo || null;
      })
      .addCase(testFigmaConnection.rejected, (state, action) => {
        state.figma.connectionStatus = 'error';
        state.figma.connectionError = action.payload as string;
      })
      
      .addCase(loadFigmaSettings.fulfilled, (state, action) => {
        state.figma.settings = action.payload;
      })
      
      .addCase(updateFigmaSettings.fulfilled, (state, action) => {
        state.figma.settings = action.payload;
      });
  }
});

// Export actions
export const {
  setActiveTab,
  toggleSidebar,
  setSelectedToken,
  setSelectedComponent,
  setPreviewMode,
  togglePreview,
  setTokenSearchQuery,
  setTokenCategory,
  setTokenFilters,
  clearTokenFilters,
  setComponentSearchQuery,
  setComponentCategory,
  setComponentFilters,
  clearComponentFilters,
  setSyncProgress,
  addSyncConflict,
  resolveSyncConflict,
  clearSyncConflicts,
  resetTokensState,
  resetComponentsState,
  resetSyncState
} = designSystemSlice.actions;

// Export reducer
export default designSystemSlice.reducer;

// Selectors
export const selectDesignTokens = (state: { designSystem: DesignSystemState }) => state.designSystem.tokens.items;
export const selectFilteredTokens = (state: { designSystem: DesignSystemState }) => {
  const { items, searchQuery, selectedCategory, filters } = state.designSystem.tokens;
  
  return items.filter(token => {
    // Search query filter
    if (searchQuery && !token.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'all' && token.category !== selectedCategory) {
      return false;
    }
    
    // Type filter
    if (filters.type.length > 0 && !filters.type.includes(token.type)) {
      return false;
    }
    
    // Category filter (from filters)
    if (filters.category.length > 0 && !filters.category.includes(token.category)) {
      return false;
    }
    
    // Platform filter
    if (filters.platform.length > 0) {
      const hasMatchingPlatform = filters.platform.some(platform => 
        token.metadata.platform.includes(platform as 'mobile' | 'web' | 'desktop')
      );
      if (!hasMatchingPlatform) {
        return false;
      }
    }
    
    return true;
  });
};

export const selectDesignComponents = (state: { designSystem: DesignSystemState }) => state.designSystem.components.items;
export const selectFilteredComponents = (state: { designSystem: DesignSystemState }) => {
  const { items, searchQuery, selectedCategory, filters } = state.designSystem.components;
  
  return items.filter(component => {
    // Search query filter
    if (searchQuery && !component.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'all' && component.category !== selectedCategory) {
      return false;
    }
    
    // Category filter (from filters)
    if (filters.category.length > 0 && !filters.category.includes(component.category)) {
      return false;
    }
    
    // Platform filter
    if (filters.platform.length > 0) {
      const hasMatchingPlatform = filters.platform.some(platform => 
        component.metadata.platform.includes(platform as 'mobile' | 'web' | 'desktop')
      );
      if (!hasMatchingPlatform) {
        return false;
      }
    }
    
    // Status filter
    if (filters.status.length > 0) {
      const status = component.isActive ? 'active' : 'inactive';
      if (!filters.status.includes(status)) {
        return false;
      }
    }
    
    return true;
  });
};

export const selectSyncHistory = (state: { designSystem: DesignSystemState }) => state.designSystem.sync.history;
export const selectActiveSyncs = (state: { designSystem: DesignSystemState }) => state.designSystem.sync.activeSyncs;
export const selectSyncStatus = (state: { designSystem: DesignSystemState }) => state.designSystem.sync.syncStatus;
export const selectSyncProgress = (state: { designSystem: DesignSystemState }) => state.designSystem.sync.syncProgress;
export const selectSyncConflicts = (state: { designSystem: DesignSystemState }) => state.designSystem.sync.conflicts;

export const selectFigmaSettings = (state: { designSystem: DesignSystemState }) => state.designSystem.figma.settings;
export const selectFigmaConnectionStatus = (state: { designSystem: DesignSystemState }) => state.designSystem.figma.connectionStatus;
export const selectFigmaConnectionError = (state: { designSystem: DesignSystemState }) => state.designSystem.figma.connectionError;
export const selectFigmaFileInfo = (state: { designSystem: DesignSystemState }) => state.designSystem.figma.fileInfo;

export const selectUIState = (state: { designSystem: DesignSystemState }) => state.designSystem.ui;
export const selectActiveTab = (state: { designSystem: DesignSystemState }) => state.designSystem.ui.activeTab;
export const selectSelectedToken = (state: { designSystem: DesignSystemState }) => {
  const { selectedTokenId } = state.designSystem.ui;
  if (!selectedTokenId) return null;
  return state.designSystem.tokens.items.find(token => token.id === selectedTokenId) || null;
};
export const selectSelectedComponent = (state: { designSystem: DesignSystemState }) => {
  const { selectedComponentId } = state.designSystem.ui;
  if (!selectedComponentId) return null;
  return state.designSystem.components.items.find(component => component.id === selectedComponentId) || null;
};