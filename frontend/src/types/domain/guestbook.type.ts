import type { UploadFile } from '../file.type';

export interface GuestbookFunnelInfo {
  message: string;
  photos: GuestbookFunnelPhotos[];
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
