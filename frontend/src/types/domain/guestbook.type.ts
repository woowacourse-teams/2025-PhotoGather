import type { LocalFile, UploadFile } from '../file.type';

export interface GuestbookFunnelInfo {
  message: string;
  photos: LocalFile[];
  nickname: string;
}

export interface FunnelBaseElementProps {
  prompt: string;
  receiver: string;
  isOptional?: boolean;
  element: React.ReactNode;
  onNextButtonClick: () => void;
  nextButtonDisabled?: boolean;
  buttonText?: string;
}

export interface GuestbookFunnelPhotos {
  photos: UploadFile[];
}

interface GuestbookImageType {
  originalName: string;
  uploadFileName: string;
  capacity: number;
}

export interface GuestbookForm {
  nickname: string;
  message: string;
  photos: GuestbookImageType[];
}
