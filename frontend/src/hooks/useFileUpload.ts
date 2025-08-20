import { useEffect, useState } from 'react';
import { photoService } from '../apis/services/photo.service';
import type { LocalFile, UploadFile } from '../types/file.type';
import useError from './@common/useError';

interface Batch {
  id: number;
  total: number;
  success: number;
  failed: number;
  inProgress: number;
  uploadFiles: UploadFile[];
}

interface Session {
  total: number;
  success: number;
  failed: number;
  inProgress: number;
  batches: Batch[];
}

interface UseFileUploadProps {
  spaceCode: string;
  localFiles: LocalFile[];
}
const useFileUpload = ({ spaceCode, localFiles }: UseFileUploadProps) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [batches, setBatches] = useState<Batch[]>();
  const [session, setSession] = useState<Session>();
  const { tryTask, tryFetch } = useError();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const createUploadFiles = (localFiles: LocalFile[]) => {
    const newUploadFiles: UploadFile[] = localFiles.map((file) => {
      const extension = file.originFile.name.split('.').pop();
      const objectKey = `${crypto.randomUUID()}.${extension}`;

      return {
        id: file.id,
        originFile: file.originFile,
        objectKey,
        capturedAt: file.capturedAt,
        presignedUrl: '',
        state: 'idle',
      };
    });

    setUploadFiles(newUploadFiles);
    return newUploadFiles;
  };

  const createBatches = (uploadFiles: UploadFile[]) => {
    // 100개 단위로 나누어 배치 생성
    const chunkSize = 100;
    const newBatches: Batch[] = [];
    for (let i = 0; i < uploadFiles.length; i += chunkSize) {
      const chunk = uploadFiles.slice(i, i + chunkSize);
      newBatches.push({
        id: i,
        total: chunk.length,
        success: 0,
        failed: 0,
        inProgress: 0,
        uploadFiles: uploadFiles.slice(i, i + chunkSize),
      });
    }

    setBatches(newBatches);
    return newBatches;
  };

  // uploadFiles, batches, session 초기화
  const createSession = (localFiles: LocalFile[]) => {
    const newFiles = createUploadFiles(localFiles);
    const newBatches = createBatches(newFiles);

    // 세션도 초기화
    const newSession: Session = {
      total: newBatches.length,
      success: 0,
      failed: 0,
      inProgress: 0,
      batches: newBatches,
    };
    setSession(newSession);
    return newSession;
  };

  const fetchPresignedUrls = async (uploadFiles: UploadFile[]) => {
    const objectKeys = uploadFiles.map((f) => f.objectKey);
    const res = await photoService.getPresignedUrls(spaceCode, objectKeys);
    if (!res || !res.data?.signedUrls)
      throw new Error('presignedUrl 발급 실패');
    return res.data.signedUrls as Record<string, string>;
  };

  const addPresignedUrls = (
    presignedUrls: Record<string, string>,
    targetFiles: UploadFile[],
  ) => {
    const updated = targetFiles.map(
      (file): UploadFile => ({
        ...file,
        presignedUrl: presignedUrls[file.objectKey] ?? '',
        state: 'signed' as const,
      }),
    );

    setUploadFiles((prev) =>
      prev.map((f) => {
        const found = updated.find((u) => u.id === f.id);
        return found ?? f;
      }),
    );

    return updated;
  };

  const canNotifySuccess = (successFiles: UploadFile[]) => {
    if (successFiles.length === 0) throw new Error('성공한 파일이 없습니다.');
  };

  const notifySuccessFiles = async (successFiles: UploadFile[]) => {
    tryTask({
      task: () => canNotifySuccess(successFiles),
      errorActions: ['console'],
    });

    const uploadedPhotos = successFiles.map((file) => ({
      uploadFileName: file.objectKey,
      originalName: file.originFile.name,
      capturedAt: file.capturedAt,
    }));

    await tryFetch({
      task: async () =>
        await photoService.notifyUploadComplete(spaceCode, uploadedPhotos),
      errorActions: ['console'],
    });
  };

  const uploadBatch = async (batch: Batch) => {
    const presignedUrls = await tryFetch({
      task: async () => await fetchPresignedUrls(batch.uploadFiles),
      errorActions: ['console'],
    });

    const updatedBatchFiles = addPresignedUrls(
      presignedUrls.data ?? {},
      batch.uploadFiles,
    );

    await Promise.allSettled(
      updatedBatchFiles.map(async (file) => {
        try {
          await photoService.uploadPhotosToS3(
            file.presignedUrl,
            file.originFile,
          );
          file.state = 'uploaded';
        } catch {
          file.state = 'failed';
        }
      }),
    );

    setUploadFiles((prev) =>
      prev.map((file) => {
        const target = updatedBatchFiles.find((u) => u.id === file.id);
        return target ? { ...file, state: target.state } : file;
      }),
    );

    calculateSuccessFiles(batch, updatedBatchFiles);

    const successFiles = updatedBatchFiles.filter((f) => f.state === 'success');
    await notifySuccessFiles(successFiles);
  };

  //TODO: 구조 정리하기 닉네임 연결 후 통계가 정상동작하는지 확인
  const calculateSuccessFiles = (
    batch: Batch,
    updatedBatchFiles: UploadFile[],
  ) => {
    const successCount = updatedBatchFiles.filter(
      (f) => f.state === 'success',
    ).length;
    const failedCount = updatedBatchFiles.filter(
      (f) => f.state === 'failed',
    ).length;
    const inProgressCount = updatedBatchFiles.filter(
      (f) => f.state === 'uploaded',
    ).length;

    const updatedBatch: Batch = {
      ...batch,
      success: successCount,
      failed: failedCount,
      inProgress: inProgressCount,
      uploadFiles: updatedBatchFiles,
    };

    setBatches((prev) =>
      prev?.map((b) => (b.id === batch.id ? updatedBatch : b)),
    );

    setSession((prev) => {
      if (!prev) return prev;

      const newBatches = prev.batches.map((b) =>
        b.id === batch.id ? updatedBatch : b,
      );

      const totalSuccess = newBatches.reduce((acc, b) => acc + b.success, 0);
      const totalFailed = newBatches.reduce((acc, b) => acc + b.failed, 0);
      const totalInProgress = newBatches.reduce(
        (acc, b) => acc + b.inProgress,
        0,
      );

      return {
        ...prev,
        success: totalSuccess,
        failed: totalFailed,
        inProgress: totalInProgress,
        batches: newBatches,
      };
    });
  };

  // "진짜" 업로드
  const submitFileUpload = async () => {
    if (!session) createSession(localFiles);

    for (const batch of session?.batches ?? []) {
      await tryFetch({
        task: async () => {
          await uploadBatch(batch);
        },
        errorActions: ['toast', 'console'],
        context: {
          toast: {
            text: '업로드에 실패했습니다. 다시 시도해주세요.',
            type: 'error',
          },
        },
      });
      //TODO: 실패한 경우 전체 삭제 로직 추가 예정
    }
  };

  return { submitFileUpload, total: session?.total, success: session?.success };
};

export default useFileUpload;
