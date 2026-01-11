// Figma API Response Types

export interface FigmaFile {
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
  schemaVersion: number;
  styles: Record<string, FigmaStyle>;
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  absoluteBoundingBox?: BoundingBox;
  backgroundColor?: Color;
  fills?: Paint[];
  strokes?: Paint[];
  strokeWeight?: number;
  effects?: Effect[];
  characters?: string;
  style?: TypeStyle;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  componentSetId?: string;
  documentationLinks?: string[];
}

export interface FigmaStyle {
  key: string;
  name: string;
  description: string;
  styleType: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Paint {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND' | 'IMAGE' | 'EMOJI';
  visible?: boolean;
  opacity?: number;
  color?: Color;
  blendMode?: string;
}

export interface Effect {
  type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  visible?: boolean;
  radius?: number;
  color?: Color;
  blendMode?: string;
  offset?: {
    x: number;
    y: number;
  };
}

export interface TypeStyle {
  fontFamily: string;
  fontPostScriptName?: string;
  fontWeight: number;
  fontSize: number;
  lineHeightPx: number;
  lineHeightPercent: number;
  letterSpacing: number;
  textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
}

export interface FigmaImage {
  images: Record<string, string | null>;
}

export interface FigmaError {
  status: number;
  err: string;
}
