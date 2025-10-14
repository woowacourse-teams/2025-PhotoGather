export interface GuestbookFunnelInfo {
  message: string;
  photos: File[];
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
