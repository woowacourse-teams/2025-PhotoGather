export interface LocalFile {
  id: number;
  originFile: File;
  previewUrl: string;
  capturedAt: string | null;
}

export interface PreviewFile {
  id: number;
  previewUrl: string;
}

export type UploadFileState =
  | 'idle'
  | 'signed'
  | 'uploaded'
  | 'success'
  | 'failed';

export interface UploadFile {
  id: number;
  originFile: File;
  objectKey: string;
  presignedUrl: string;
  capturedAt: string | null;
  state: UploadFileState;
}
