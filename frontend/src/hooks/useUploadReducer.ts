import type { UploadFile, UploadFileState } from '../types/file.type';

export interface Batch {
  id: number;
  total: number;
  success: number;
  failed: number;
  uploadFiles: UploadFile[];
}

export interface Session {
  total: number;
  success: number;
  failed: number;
  progress: number;
  batches: Batch[];
}

type SessionAction =
  | { type: 'INIT_SESSION'; payload: Session }
  | {
      type: 'UPDATE_BATCH_FILES';
      payload: { batchId: number; files: UploadFile[] };
    }
  | {
      type: 'UPDATE_FILE_STATE';
      payload: { batchId: number; fileId: number; state: UploadFileState };
    }
  | { type: 'INCREMENT_PROGRESS' }
  | { type: 'UPDATE_BATCH_STATS'; payload: { batchId: number } }
  | { type: 'RESET' };

export const initialSession: Session = {
  total: 0,
  success: 0,
  failed: 0,
  progress: 0,
  batches: [],
};

const useSessionReducer = (session: Session, action: SessionAction) => {
  switch (action.type) {
    case 'INIT_SESSION': {
      return action.payload;
    }

    case 'UPDATE_BATCH_FILES': {
      const { batchId, files } = action.payload;
      const updatedBatches = session.batches.map((batch) =>
        batch.id === batchId ? { ...batch, uploadFiles: files } : batch,
      );

      return {
        ...session,
        batches: updatedBatches,
      };
    }

    case 'UPDATE_FILE_STATE': {
      const { batchId, fileId, state: newState } = action.payload;

      const updatedBatches = session.batches.map((batch) => {
        if (batch.id !== batchId) return batch;

        const updatedFiles = batch.uploadFiles.map((file) =>
          file.id === fileId ? { ...file, state: newState } : file,
        );

        return { ...batch, uploadFiles: updatedFiles };
      });

      return {
        ...session,
        batches: updatedBatches,
      };
    }

    case 'INCREMENT_PROGRESS': {
      return {
        ...session,
        progress: session.progress + 1,
      };
    }

    case 'UPDATE_BATCH_STATS': {
      const { batchId } = action.payload;

      const updatedBatches = session.batches.map((batch) => {
        if (batch.id !== batchId) return batch;

        const uploadedCount = batch.uploadFiles.filter(
          (file) => file.state === 'uploaded',
        ).length;
        const failedCount = batch.uploadFiles.filter(
          (file) => file.state === 'failed',
        ).length;

        return {
          ...batch,
          success: uploadedCount,
          failed: failedCount,
        };
      });

      const totalSuccess = updatedBatches.reduce(
        (acc, b) => acc + b.success,
        0,
      );
      const totalFailed = updatedBatches.reduce((acc, b) => acc + b.failed, 0);

      return {
        ...session,
        batches: updatedBatches,
        success: totalSuccess,
        failed: totalFailed,
      };
    }

    case 'RESET': {
      return initialSession;
    }

    default:
      return session;
  }
};

export default useSessionReducer;
