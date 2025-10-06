import type { SpaceVisibility } from './space.type';

export interface CreateFunnelForm {
  name: string;
  description: string;
  visibility: SpaceVisibility;
  profileImage?: File[];
  email?: string;
  instagram?: string;
}

export interface FunnelBaseElementProps {
  title: string;
  description: string;
  element: React.ReactNode;
  onNextButtonClick: () => void;
  nextButtonDisabled?: boolean;
  buttonText?: string;
}

export interface FunnelElementProps<T = string> {
  onNext: (data: T) => void;
  initialValue?: T;
}

export interface ImmediateOpenElementInitialValue {
  date: string;
  time: string;
  isImmediateOpen: boolean | null;
}
