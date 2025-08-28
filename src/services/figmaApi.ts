// Boshqaruv - Figma API Service
// Figma bilan integratsiya uchun API xizmatlari


// Figma API base URL
const FIGMA_API_BASE = 'https://api.figma.com/v1';

// API key should be stored securely (in environment variables or secure storage)
const FIGMA_API_KEY = process.env.FIGMA_API_KEY || '';

// Types for Figma API responses
export interface FigmaFile {
  document: FigmaNode;
  components: { [key: string]: FigmaComponent };
  componentSets: { [key: string]: FigmaComponentSet };
  schemaVersion: number;
  styles: { [key: string]: FigmaStyle };
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  role: string;
  editorType: string;
  linkAccess: string;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  backgroundColor?: FigmaColor;
  fills?: FigmaFill[];
  strokes?: FigmaStroke[];
  strokeWeight?: number;
  strokeAlign?: string;
  cornerRadius?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  rotation?: number;
  opacity?: number;
  blendMode?: string;
  isMask?: boolean;
  effects?: FigmaEffect[];
  characters?: string;
  style?: FigmaTextStyle;
  characterStyleOverrides?: number[];
  styleOverrideTable?: { [key: string]: FigmaTextStyle };
  lineTypes?: string[];
  lineIndentations?: number[];
  constraints?: FigmaConstraints;
  layoutAlign?: string;
  layoutGrow?: number;
  layoutSizingHorizontal?: string;
  layoutSizingVertical?: string;
  clipsContent?: boolean;
  layoutMode?: string;
  primaryAxisSizingMode?: string;
  counterAxisSizingMode?: string;
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
  layoutWrap?: string;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  componentSetId?: string;
  documentationLinks: FigmaDocumentationLink[];
}

export interface FigmaComponentSet {
  key: string;
  name: string;
  description: string;
  documentationLinks: FigmaDocumentationLink[];
}

export interface FigmaStyle {
  key: string;
  name: string;
  description: string;
  styleType: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
}

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface FigmaFill {
  type: string;
  color?: FigmaColor;
  gradientHandlePositions?: FigmaVector[];
  gradientStops?: FigmaColorStop[];
  scaleMode?: string;
  imageTransform?: number[][];
  scalingFactor?: number;
  rotation?: number;
  imageRef?: string;
  filters?: FigmaImageFilters;
  gifRef?: string;
  opacity?: number;
  visible?: boolean;
  blendMode?: string;
}

export interface FigmaStroke {
  type: string;
  color?: FigmaColor;
  gradientHandlePositions?: FigmaVector[];
  gradientStops?: FigmaColorStop[];
  scaleMode?: string;
  imageTransform?: number[][];
  scalingFactor?: number;
  rotation?: number;
  imageRef?: string;
  filters?: FigmaImageFilters;
  gifRef?: string;
  opacity?: number;
  visible?: boolean;
  blendMode?: string;
}

export interface FigmaEffect {
  type: string;
  color?: FigmaColor;
  offset?: FigmaVector;
  radius?: number;
  spread?: number;
  visible?: boolean;
  blendMode?: string;
}

export interface FigmaTextStyle {
  fontFamily?: string;
  fontPostScriptName?: string;
  paragraphSpacing?: number;
  paragraphIndent?: number;
  listSpacing?: number;
  hangingPunctuation?: boolean;
  hangingList?: boolean;
  fontSize?: number;
  textAlignHorizontal?: string;
  textAlignVertical?: string;
  letterSpacing?: number;
  fills?: FigmaFill[];
  hyperlink?: FigmaHyperlink;
  opentypeFlags?: { [key: string]: number };
  lineHeightPx?: number;
  lineHeightPercent?: number;
  lineHeightPercentFontSize?: number;
  lineHeightUnit?: string;
}

export interface FigmaConstraints {
  vertical: string;
  horizontal: string;
}

export interface FigmaDocumentationLink {
  uri: string;
}

export interface FigmaVector {
  x: number;
  y: number;
}

export interface FigmaColorStop {
  position: number;
  color: FigmaColor;
}

export interface FigmaImageFilters {
  exposure?: number;
  contrast?: number;
  saturation?: number;
  temperature?: number;
  tint?: number;
  highlights?: number;
  shadows?: number;
}

export interface FigmaHyperlink {
  type: string;
  url?: string;
  nodeID?: string;
}

// Design Token Types
export interface DesignToken {
  id: string;
  name: string;
  value: string | number;
  type: 'color' | 'typography' | 'spacing' | 'borderRadius' | 'shadow' | 'other';
  category?: string;
  description?: string;
  figmaStyleId?: string;
  lastModified: string;
}

export interface TokenSyncResult {
  success: boolean;
  tokensUpdated: number;
  tokensAdded: number;
  tokensRemoved: number;
  errors: string[];
  timestamp: string;
}

export interface ComponentSyncResult {
  success: boolean;
  componentsUpdated: number;
  componentsAdded: number;
  componentsRemoved: number;
  errors: string[];
  timestamp: string;
}

// API Service Class
class FigmaApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || FIGMA_API_KEY;
    this.baseUrl = FIGMA_API_BASE;
  }

  // Set API key
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey.length > 0;
  }

  // Make authenticated request to Figma API
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.isConfigured()) {
      throw new Error('Figma API key is not configured');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-Figma-Token': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          errorData.err || 
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Figma API request failed:', error);
      throw error;
    }
  }

  // Get file information
  async getFile(fileKey: string): Promise<FigmaFile> {
    return this.makeRequest<FigmaFile>(`/files/${fileKey}`);
  }

  // Get file nodes
  async getFileNodes(fileKey: string, nodeIds: string[]): Promise<any> {
    const ids = nodeIds.join(',');
    return this.makeRequest(`/files/${fileKey}/nodes?ids=${ids}`);
  }

  // Get file images
  async getFileImages(
    fileKey: string, 
    nodeIds: string[], 
    options: {
      scale?: number;
      format?: 'jpg' | 'png' | 'svg' | 'pdf';
      svg_include_id?: boolean;
      svg_simplify_stroke?: boolean;
      use_absolute_bounds?: boolean;
      version?: string;
    } = {}
  ): Promise<{ images: { [key: string]: string } }> {
    const ids = nodeIds.join(',');
    const params = new URLSearchParams({
      ids,
      ...Object.fromEntries(
        Object.entries(options).map(([key, value]) => [key, String(value)])
      ),
    });
    
    return this.makeRequest(`/files/${fileKey}/images?${params}`);
  }

  // Get team styles
  async getTeamStyles(teamId: string): Promise<{ styles: FigmaStyle[] }> {
    return this.makeRequest(`/teams/${teamId}/styles`);
  }

  // Get style information
  async getStyle(styleKey: string): Promise<{ style: FigmaStyle; nodes: any }> {
    return this.makeRequest(`/styles/${styleKey}`);
  }

  // Get team components
  async getTeamComponents(teamId: string): Promise<{ components: FigmaComponent[] }> {
    return this.makeRequest(`/teams/${teamId}/components`);
  }

  // Get component information
  async getComponent(componentKey: string): Promise<{ component: FigmaComponent; nodes: any }> {
    return this.makeRequest(`/components/${componentKey}`);
  }

  // Get team component sets
  async getTeamComponentSets(teamId: string): Promise<{ component_sets: FigmaComponentSet[] }> {
    return this.makeRequest(`/teams/${teamId}/component_sets`);
  }

  // Get component set information
  async getComponentSet(componentSetKey: string): Promise<{ component_set: FigmaComponentSet; nodes: any }> {
    return this.makeRequest(`/component_sets/${componentSetKey}`);
  }

  // Extract design tokens from Figma styles
  async extractDesignTokens(fileKey: string): Promise<DesignToken[]> {
    try {
      const file = await this.getFile(fileKey);
      const tokens: DesignToken[] = [];

      // Extract color tokens from styles
      for (const [styleId, style] of Object.entries(file.styles)) {
        if (style.styleType === 'FILL') {
          tokens.push({
            id: `color-${styleId}`,
            name: style.name,
            value: this.extractColorFromStyle(style),
            type: 'color',
            category: this.getCategoryFromName(style.name),
            description: style.description,
            figmaStyleId: styleId,
            lastModified: new Date().toISOString(),
          });
        } else if (style.styleType === 'TEXT') {
          const textTokens = this.extractTextTokensFromStyle(style, styleId);
          tokens.push(...textTokens);
        } else if (style.styleType === 'EFFECT') {
          tokens.push({
            id: `effect-${styleId}`,
            name: style.name,
            value: this.extractEffectFromStyle(style),
            type: 'shadow',
            category: this.getCategoryFromName(style.name),
            description: style.description,
            figmaStyleId: styleId,
            lastModified: new Date().toISOString(),
          });
        }
      }

      // Extract spacing tokens from components (if any)
      const spacingTokens = await this.extractSpacingTokens(file);
      tokens.push(...spacingTokens);

      return tokens;
    } catch (error) {
      console.error('Failed to extract design tokens:', error);
      throw error;
    }
  }

  // Extract color value from Figma style
  private extractColorFromStyle(style: FigmaStyle): string {
    // This is a simplified implementation
    // In a real app, you would need to fetch the actual style data
    return '#000000'; // Placeholder
  }

  // Extract text tokens from Figma text style
  private extractTextTokensFromStyle(style: FigmaStyle, styleId: string): DesignToken[] {
    const tokens: DesignToken[] = [];
    
    // This is a simplified implementation
    // In a real app, you would extract fontSize, fontFamily, lineHeight, etc.
    tokens.push({
      id: `typography-${styleId}`,
      name: style.name,
      value: '16px', // Placeholder
      type: 'typography',
      category: this.getCategoryFromName(style.name),
      description: style.description,
      figmaStyleId: styleId,
      lastModified: new Date().toISOString(),
    });

    return tokens;
  }

  // Extract effect value from Figma style
  private extractEffectFromStyle(style: FigmaStyle): string {
    // This is a simplified implementation
    // In a real app, you would extract shadow properties
    return '0 2px 4px rgba(0,0,0,0.1)'; // Placeholder
  }

  // Extract spacing tokens from components
  private async extractSpacingTokens(file: FigmaFile): Promise<DesignToken[]> {
    const tokens: DesignToken[] = [];
    
    // This is a simplified implementation
    // In a real app, you would analyze component padding, margins, gaps, etc.
    const commonSpacings = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
    
    commonSpacings.forEach((spacing, index) => {
      tokens.push({
        id: `spacing-${index}`,
        name: `spacing-${spacing}`,
        value: spacing,
        type: 'spacing',
        category: 'spacing',
        description: `${spacing}px spacing`,
        lastModified: new Date().toISOString(),
      });
    });

    return tokens;
  }

  // Get category from style name
  private getCategoryFromName(name: string): string {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('primary') || lowerName.includes('brand')) return 'primary';
    if (lowerName.includes('secondary')) return 'secondary';
    if (lowerName.includes('success') || lowerName.includes('green')) return 'success';
    if (lowerName.includes('warning') || lowerName.includes('yellow')) return 'warning';
    if (lowerName.includes('danger') || lowerName.includes('error') || lowerName.includes('red')) return 'danger';
    if (lowerName.includes('neutral') || lowerName.includes('gray') || lowerName.includes('grey')) return 'neutral';
    if (lowerName.includes('heading') || lowerName.includes('title')) return 'heading';
    if (lowerName.includes('body') || lowerName.includes('text')) return 'body';
    if (lowerName.includes('caption') || lowerName.includes('small')) return 'caption';
    
    return 'other';
  }

  // Sync design tokens with local storage
  async syncDesignTokens(fileKey: string): Promise<TokenSyncResult> {
    try {
      const tokens = await this.extractDesignTokens(fileKey);
      
      // In a real app, you would:
      // 1. Compare with existing tokens
      // 2. Update/add/remove tokens as needed
      // 3. Save to local storage or database
      // 4. Generate style files
      
      return {
        success: true,
        tokensUpdated: 0,
        tokensAdded: tokens.length,
        tokensRemoved: 0,
        errors: [],
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        tokensUpdated: 0,
        tokensAdded: 0,
        tokensRemoved: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Extract React Native components from Figma components
  async extractComponents(fileKey: string): Promise<any[]> {
    try {
      const file = await this.getFile(fileKey);
      const components: any[] = [];

      for (const [componentId, component] of Object.entries(file.components)) {
        // Get component node data
        const nodeData = await this.getFileNodes(fileKey, [componentId]);
        
        components.push({
          id: componentId,
          name: component.name,
          description: component.description,
          code: this.generateReactNativeComponent(component, nodeData),
          props: this.extractComponentProps(nodeData),
          lastModified: new Date().toISOString(),
        });
      }

      return components;
    } catch (error) {
      console.error('Failed to extract components:', error);
      throw error;
    }
  }

  // Generate React Native component code from Figma component
  private generateReactNativeComponent(component: FigmaComponent, nodeData: any): string {
    // This is a simplified implementation
    // In a real app, you would analyze the component structure and generate proper React Native code
    
    const componentName = component.name.replace(/[^a-zA-Z0-9]/g, '');
    
    return `
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface ${componentName}Props {
  // Add props based on component analysis
}

const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>${component.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add styles based on Figma component
  },
  text: {
    // Add text styles
  },
});

export default ${componentName};
`;
  }

  // Extract component props from node data
  private extractComponentProps(nodeData: any): any[] {
    // This is a simplified implementation
    // In a real app, you would analyze component variants and properties
    return [];
  }

  // Sync components with local storage
  async syncComponents(fileKey: string): Promise<ComponentSyncResult> {
    try {
      const components = await this.extractComponents(fileKey);
      
      // In a real app, you would:
      // 1. Compare with existing components
      // 2. Update/add/remove components as needed
      // 3. Save to local storage or database
      // 4. Generate component files
      
      return {
        success: true,
        componentsUpdated: 0,
        componentsAdded: components.length,
        componentsRemoved: 0,
        errors: [],
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        componentsUpdated: 0,
        componentsAdded: 0,
        componentsRemoved: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Test API connection
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.isConfigured()) {
        return {
          success: false,
          message: 'Figma API key is not configured',
        };
      }

      // Try to make a simple request to test the connection
      await this.makeRequest('/me');
      
      return {
        success: true,
        message: 'Successfully connected to Figma API',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Connection failed',
      };
    }
  }

  // Get user information
  async getUserInfo(): Promise<any> {
    return this.makeRequest('/me');
  }

  // Get team projects
  async getTeamProjects(teamId: string): Promise<any> {
    return this.makeRequest(`/teams/${teamId}/projects`);
  }

  // Get project files
  async getProjectFiles(projectId: string): Promise<any> {
    return this.makeRequest(`/projects/${projectId}/files`);
  }
}

// Export singleton instance
export const figmaApi = new FigmaApiService();

// Export service class for custom instances
export { FigmaApiService };

// Utility functions
export const figmaUtils = {
  // Convert Figma color to hex
  figmaColorToHex(color: FigmaColor): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  },

  // Convert Figma color to rgba
  figmaColorToRgba(color: FigmaColor): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    return `rgba(${r}, ${g}, ${b}, ${color.a})`;
  },

  // Extract file key from Figma URL
  extractFileKeyFromUrl(url: string): string | null {
    const match = url.match(/\/file\/([a-zA-Z0-9]+)/);
    return match ? match[1] || null : null;
  },

  // Validate Figma file key format
  isValidFileKey(fileKey: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(fileKey) && fileKey.length > 10;
  },

  // Generate component name from Figma name
  generateComponentName(figmaName: string): string {
    return figmaName
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  },

  // Generate token name from Figma style name
  generateTokenName(styleName: string): string {
    return styleName
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  },
};