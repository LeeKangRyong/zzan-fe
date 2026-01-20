import { useState } from 'react';
import { feedApi } from '../api/feedApi';

interface UploadImageResult {
  localUri: string;
  objectKey: string;
}

export const useImageUploadViewModel = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImages = async (localUris: string[]): Promise<UploadImageResult[]> => {
    setIsUploading(true);

    const results: UploadImageResult[] = [];

    for (let i = 0; i < localUris.length; i++) {
      const result = await uploadSingleImage(localUris[i]);
      results.push(result);
      setUploadProgress(((i + 1) / localUris.length) * 100);
    }

    setIsUploading(false);
    return results;
  };

  const uploadSingleImage = async (localUri: string): Promise<UploadImageResult> => {
    const fileName = extractFileName(localUri);
    const contentType = getContentType(fileName);

    const presigned = await feedApi.getPresignedUrl({ fileName, contentType });
    const imageBlob = await fetchImageAsBlob(localUri);

    await feedApi.uploadImageToS3(presigned.url, imageBlob);

    return { localUri, objectKey: presigned.key };
  };

  const extractFileName = (uri: string): string => {
    return uri.split('/').pop() || `image_${Date.now()}.jpg`;
  };

  const getContentType = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const types: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
    };
    return types[ext || 'jpg'] || 'image/jpeg';
  };

  const fetchImageAsBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    return await response.blob();
  };

  return {
    isUploading,
    uploadProgress,
    uploadImages,
  };
};
