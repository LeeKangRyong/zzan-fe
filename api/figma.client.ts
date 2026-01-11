import Constants from 'expo-constants';
import type { FigmaFile, FigmaImage, FigmaError } from './figma.types';

const FIGMA_API_BASE_URL = 'https://api.figma.com/v1';

/**
 * Figma API 클라이언트
 * Figma REST API를 사용하여 디자인 데이터를 가져옵니다.
 */
export class FigmaClient {
  private accessToken: string;

  constructor(accessToken?: string) {
    // expo-constants를 통해 환경 변수에서 토큰 가져오기
    this.accessToken = accessToken || Constants.expoConfig?.extra?.figmaAccessToken || '';

    if (!this.accessToken) {
      console.warn('Figma access token이 설정되지 않았습니다. app.json의 extra.figmaAccessToken을 확인하세요.');
    }
  }

  /**
   * API 요청 헬퍼 함수
   */
  private async request<T>(endpoint: string): Promise<T> {
    if (!this.accessToken) {
      throw new Error('Figma access token이 필요합니다.');
    }

    const response = await fetch(`${FIGMA_API_BASE_URL}${endpoint}`, {
      headers: {
        'X-Figma-Token': this.accessToken,
      },
    });

    if (!response.ok) {
      const error: FigmaError = await response.json();
      throw new Error(`Figma API Error: ${error.err} (Status: ${error.status})`);
    }

    return response.json();
  }

  /**
   * Figma 파일 데이터 가져오기
   * @param fileKey - Figma 파일 키 (URL에서 확인 가능)
   * @returns Figma 파일 데이터
   */
  async getFile(fileKey: string): Promise<FigmaFile> {
    return this.request<FigmaFile>(`/files/${fileKey}`);
  }

  /**
   * 특정 노드의 이미지 URL 가져오기
   * @param fileKey - Figma 파일 키
   * @param nodeIds - 노드 ID 배열
   * @param options - 이미지 옵션
   * @returns 이미지 URL 맵
   */
  async getImages(
    fileKey: string,
    nodeIds: string[],
    options?: {
      scale?: number;
      format?: 'jpg' | 'png' | 'svg' | 'pdf';
    }
  ): Promise<FigmaImage> {
    const params = new URLSearchParams({
      ids: nodeIds.join(','),
      scale: options?.scale?.toString() || '1',
      format: options?.format || 'png',
    });

    return this.request<FigmaImage>(`/images/${fileKey}?${params.toString()}`);
  }

  /**
   * 파일에서 특정 노드 찾기
   * @param node - 검색할 노드
   * @param predicate - 노드를 찾기 위한 조건 함수
   * @returns 찾은 노드 배열
   */
  findNodes(
    node: FigmaFile['document'],
    predicate: (node: FigmaFile['document']) => boolean
  ): FigmaFile['document'][] {
    const results: FigmaFile['document'][] = [];

    const traverse = (currentNode: FigmaFile['document']) => {
      if (predicate(currentNode)) {
        results.push(currentNode);
      }

      if (currentNode.children) {
        currentNode.children.forEach(traverse);
      }
    };

    traverse(node);
    return results;
  }

  /**
   * 색상을 CSS 형식으로 변환
   * @param color - Figma 색상 객체
   * @returns CSS rgba 문자열
   */
  colorToRgba(color: { r: number; g: number; b: number; a: number }): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    return `rgba(${r}, ${g}, ${b}, ${color.a})`;
  }

  /**
   * 색상을 HEX 형식으로 변환
   * @param color - Figma 색상 객체
   * @returns HEX 문자열 (#RRGGBB)
   */
  colorToHex(color: { r: number; g: number; b: number }): string {
    const r = Math.round(color.r * 255).toString(16).padStart(2, '0');
    const g = Math.round(color.g * 255).toString(16).padStart(2, '0');
    const b = Math.round(color.b * 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`.toUpperCase();
  }
}

// 싱글톤 인스턴스 export
export const figmaClient = new FigmaClient();
