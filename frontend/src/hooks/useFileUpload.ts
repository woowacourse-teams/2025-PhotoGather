import { useEffect, useReducer, useRef } from 'react';
import { BASE_URL } from '../apis/config';
import { photoService } from '../apis/services/photo.service';
import { FAILED_GUEST_ID } from '../constants/errors';
import type {
  LocalFile,
  UploadFile,
  UploadFileState,
} from '../types/file.type';
import useTaskHandler from './@common/useTaskHandler';
import type { Batch, Session } from './useUploadReducer';
import useSessionReducer, { initialSession } from './useUploadReducer';

interface UseFileUploadProps {
  spaceCode: string;
  localFiles: LocalFile[];
  onUploadSuccess: () => void;
  clearFiles: () => void;
  nickName: string;
  guestId: number;
  tryCreateNickName: () => Promise<number>;
}

const useFileUpload = ({
  spaceCode,
  localFiles,
  onUploadSuccess,
  clearFiles,
  nickName,
  guestId,
  tryCreateNickName,
}: UseFileUploadProps) => {
  const [session, dispatch] = useReducer(useSessionReducer, initialSession);
  const { loadingState, tryFetch } = useTaskHandler();
  const uploadedFilesRef = useRef<string[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies(sendCancelBeacon): suppress dependency sendCancelBeacon
  useEffect(() => {
    window.addEventListener('pagehide', sendCancelBeacon);
    return () => window.removeEventListener('pagehide', sendCancelBeacon);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies(sendCancelBeacon): suppress dependency sendCancelBeacon
  useEffect(() => {
    return () => {
      sendCancelBeacon();
    };
  }, []);

  const sendCancelBeacon = () => {
    if (
      uploadedFilesRef.current.length > 0 &&
      guestId &&
      guestId !== FAILED_GUEST_ID
    ) {
      const params = new URLSearchParams();
      uploadedFilesRef.current.forEach((objectKey) => {
        params.append('cancelFileNames', objectKey);
      });

      navigator.sendBeacon(
        `${BASE_URL}/spaces/${spaceCode}/photos/upload/cancel?guestId=${guestId}`,
        new Blob([params.toString()], {
          type: 'application/x-www-form-urlencoded',
        }),
      );
    }
  };

  const ensureGuestId = async () => {
    if (guestId && guestId !== FAILED_GUEST_ID) return guestId;

    const newGuestId = await tryCreateNickName();
    if (!newGuestId) return FAILED_GUEST_ID;

    return newGuestId;
  };

  const cleanupUploadedFiles = async (currentGuestId: number) => {
    if (uploadedFilesRef.current.length > 0) {
      await tryFetch({
        task: async () => {
          await photoService.cancelUpload(
            spaceCode,
            { cancelFileNames: uploadedFilesRef.current },
            currentGuestId,
          );
          uploadedFilesRef.current = [];
        },
        errorActions: ['console'],
        context: {
          console: {
            text: '업로드 실패로 인한 파일 정리 실패',
          },
        },
      });
    }
  };

  const createUploadFiles = (localFiles: LocalFile[]) => {
    return localFiles.map((file) => {
      const extension = file.originFile.name.split('.').pop();
      const objectKey = `${crypto.randomUUID()}.${extension}`;

      return {
        id: file.id,
        originFile: file.originFile,
        objectKey,
        capturedAt: file.capturedAt,
        capacityValue: file.capacityValue,
        presignedUrl: '',
        state: 'idle' as const,
      };
    });
  };

  const createBatches = (uploadFiles: UploadFile[]) => {
    // 100개 단위로 나누어 배치 생성
    const chunkSize = 100;
    return Array.from(
      { length: Math.ceil(uploadFiles.length / chunkSize) },
      (_, i) => {
        const chunk = uploadFiles.slice(i * chunkSize, (i + 1) * chunkSize);
        return {
          id: i * chunkSize,
          total: chunk.length,
          success: 0,
          failed: 0,
          uploadFiles: chunk,
        };
      },
    );
  };

  const initializeSession = () => {
    const uploadFiles = createUploadFiles(localFiles);
    const batches = createBatches(uploadFiles);

    const newSession = {
      total: uploadFiles.length,
      success: 0,
      failed: 0,
      progress: 0,
      batches,
    };

    dispatch({ type: 'INIT_SESSION', payload: newSession });
    return newSession;
  };

  const fetchPresignedUrls = async (uploadFiles: UploadFile[]) => {
    const objectKeys = uploadFiles.map((f) => f.objectKey);
    const response = await photoService.getPresignedUrls(spaceCode, objectKeys);

    if (!response || !response.data?.signedUrls) {
      throw new Error('presignedUrl 발급 실패');
    }

    return response.data.signedUrls;
  };

  const addPresignedUrls = (
    files: UploadFile[],
    presignedUrls: Record<string, string>,
  ) => {
    return files.map((file) => ({
      ...file,
      presignedUrl: presignedUrls[file.objectKey] ?? '',
      state: 'signed' as const,
    }));
  };

  const uploadSingleFileToS3 = async (batchId: number, file: UploadFile) => {
    const response = await tryFetch({
      task: async () => {
        await photoService.uploadPhotosToS3(file.presignedUrl, file.originFile);
      },
      errorActions: ['console'],
      context: {
        console: {
          text: `파일 업로드 실패: ${file.originFile.name}`,
        },
      },
    });

    if (response.success) {
      uploadedFilesRef.current.push(file.objectKey);
      dispatch({
        type: 'UPDATE_FILE_STATE',
        payload: { batchId, fileId: file.id, state: 'uploaded' },
      });
      dispatch({ type: 'INCREMENT_PROGRESS' });
      return { ...file, state: 'uploaded' as const };
    } else {
      dispatch({
        type: 'UPDATE_FILE_STATE',
        payload: { batchId, fileId: file.id, state: 'failed' },
      });
      return { ...file, state: 'failed' as const };
    }
  };

  const uploadFilesToS3 = async (
    batchId: number,
    uploadFiles: UploadFile[],
  ): Promise<UploadFile[]> => {
    const uploadPromises = uploadFiles.map((file) =>
      uploadSingleFileToS3(batchId, file),
    );

    const results = await Promise.allSettled(uploadPromises);

    return results.map((result) =>
      result.status === 'fulfilled'
        ? result.value
        : { ...uploadFiles[0], state: 'failed' as const },
    );
  };

  const notifyUploadComplete = async (
    successFiles: UploadFile[],
    validGuestId: number,
    nickName: string,
  ) => {
    const uploadedPhotos = successFiles.map((file) => ({
      uploadFileName: file.objectKey,
      originalName: file.originFile.name,
      capturedAt: file.capturedAt,
      capacityValue: file.capacityValue,
    }));

    const response = await tryFetch({
      task: async () =>
        await photoService.notifyUploadComplete(
          spaceCode,
          uploadedPhotos,
          validGuestId,
          nickName,
        ),
      errorActions: ['console', 'throw'],
      context: {
        console: {
          text: '서버에 업로드 완료 알림 실패',
        },
      },
    });

    if (!response.success || !response.data) {
      const failedFileNames = successFiles.map((f) => f.objectKey);
      await tryFetch({
        task: async () => {
          await photoService.cancelUpload(
            spaceCode,
            { cancelFileNames: failedFileNames },
            validGuestId,
          );
        },
        errorActions: ['console'],
        context: {
          console: {
            text: 'notify 실패로 인한 파일 정리 실패',
          },
        },
      });
      throw new Error('서버에 업로드 완료 알림 실패2');
    }

    return response.data;
  };

  const uploadSingleBatch = async (
    batch: Batch,
    validGuestId: number,
    nickName: string,
  ): Promise<{ success: number; failed: number }> => {
    const presignedUrlsResponse = await tryFetch({
      task: async () => await fetchPresignedUrls(batch.uploadFiles),
      errorActions: ['console'],
    });

    if (!presignedUrlsResponse.success || !presignedUrlsResponse.data) {
      throw new Error('Presigned URL 발급 실패');
    }

    const filesWithPresignedUrls = addPresignedUrls(
      batch.uploadFiles,
      presignedUrlsResponse.data,
    );

    dispatch({
      type: 'UPDATE_BATCH_FILES',
      payload: { batchId: batch.id, files: filesWithPresignedUrls },
    });

    const uploadedFiles = await uploadFilesToS3(
      batch.id,
      filesWithPresignedUrls,
    );

    dispatch({
      type: 'UPDATE_BATCH_FILES',
      payload: { batchId: batch.id, files: uploadedFiles },
    });
    dispatch({ type: 'UPDATE_BATCH_STATS', payload: { batchId: batch.id } });

    const failedFiles = uploadedFiles.filter((f) => f.state === 'failed');
    const successFiles = uploadedFiles.filter((f) => f.state === 'failed');

    if (failedFiles.length > 0) throw new Error('성공한 파일이 없습니다.');
    await notifyUploadComplete(successFiles, validGuestId, nickName);

    return {
      success: successFiles.length,
      failed: uploadedFiles.filter((f) => f.state === 'failed').length,
    };
  };

  const uploadAllBatches = async (
    currentSession: Session,
    validGuestId: number,
    nickName: string,
  ) => {
    for (const batch of currentSession.batches) {
      const response = await tryFetch({
        task: async () => {
          await uploadSingleBatch(batch, validGuestId, nickName);
        },
        errorActions: ['console'],
        context: {
          console: {
            text: `배치 업로드 실패: 배치 ID ${batch.id}`,
          },
        },
      });

      if (!response.success) {
        await cleanupUploadedFiles(validGuestId);
        throw new Error(`배치 업로드 실패: 배치 ID ${batch.id}`);
      }
    }
  };

  const submitFileUpload = async () => {
    let currentSession = session;
    if (session.batches.length === 0) {
      currentSession = initializeSession();
      console.log('Initialized session:', currentSession);
    }

    const response = await tryFetch({
      task: async () => {
        const validGuestId = await ensureGuestId();
        await uploadAllBatches(currentSession, validGuestId, nickName);
      },
      errorActions: ['toast', 'console', 'throw'],
      context: {
        toast: {
          text: '업로드에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
        },
      },
      loadingStateKey: 'upload-images',
    });

    if (response.success) {
      uploadedFilesRef.current = [];
      onUploadSuccess();
      clearFiles();
      dispatch({ type: 'RESET' });
    }
  };

  return {
    submitFileUpload,
    total: session.total,
    success: session.progress,
    isUploading: loadingState['upload-images'] === 'loading',
  };
};

export default useFileUpload;
