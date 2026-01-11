/**
 * Figma API 사용 예시
 *
 * 이 파일은 Figma API를 사용하는 방법을 보여주는 예시입니다.
 */

import { figmaClient } from './figma.client';

/**
 * 예시 1: Figma 파일에서 모든 색상 추출하기
 */
export async function extractColors(fileKey: string) {
  try {
    const file = await figmaClient.getFile(fileKey);

    // 모든 노드에서 색상 찾기
    const colorNodes = figmaClient.findNodes(file.document, (node) => {
      return !!(node.fills && node.fills.length > 0);
    });

    const colors = new Set<string>();

    colorNodes.forEach((node) => {
      node.fills?.forEach((fill) => {
        if (fill.type === 'SOLID' && fill.color) {
          const hexColor = figmaClient.colorToHex(fill.color);
          colors.add(hexColor);
        }
      });
    });

    return Array.from(colors);
  } catch (error) {
    console.error('색상 추출 실패:', error);
    throw error;
  }
}

/**
 * 예시 2: 특정 프레임의 이미지 가져오기
 */
export async function exportFrameAsImage(fileKey: string, frameId: string) {
  try {
    const images = await figmaClient.getImages(fileKey, [frameId], {
      scale: 2,
      format: 'png',
    });

    return images.images[frameId];
  } catch (error) {
    console.error('이미지 내보내기 실패:', error);
    throw error;
  }
}

/**
 * 예시 3: 텍스트 스타일 추출하기
 */
export async function extractTextStyles(fileKey: string) {
  try {
    const file = await figmaClient.getFile(fileKey);

    // 모든 텍스트 노드 찾기
    const textNodes = figmaClient.findNodes(file.document, (node) => {
      return node.type === 'TEXT';
    });

    const textStyles = textNodes.map((node) => ({
      name: node.name,
      style: node.style,
      characters: node.characters,
    }));

    return textStyles;
  } catch (error) {
    console.error('텍스트 스타일 추출 실패:', error);
    throw error;
  }
}

/**
 * 예시 4: 컴포넌트 목록 가져오기
 */
export async function getComponents(fileKey: string) {
  try {
    const file = await figmaClient.getFile(fileKey);

    return Object.values(file.components).map((component) => ({
      key: component.key,
      name: component.name,
      description: component.description,
    }));
  } catch (error) {
    console.error('컴포넌트 목록 가져오기 실패:', error);
    throw error;
  }
}

/**
 * 예시 5: 특정 이름의 노드 찾기
 */
export async function findNodeByName(fileKey: string, nodeName: string) {
  try {
    const file = await figmaClient.getFile(fileKey);

    const nodes = figmaClient.findNodes(file.document, (node) => {
      return node.name === nodeName;
    });

    return nodes;
  } catch (error) {
    console.error('노드 찾기 실패:', error);
    throw error;
  }
}
