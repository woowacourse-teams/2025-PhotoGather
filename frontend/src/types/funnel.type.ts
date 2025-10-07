import type { LocalFile } from './file.type';
import type { SpaceVisibility } from './space.type';

export type CreateFunnelStep =
  | 'name'
  | 'description'
  | 'check'
  | 'detail'
  | 'accessType';

export interface CreateFunnelForm {
  name: string;
  description: string;
  visibility: SpaceVisibility;
  profileImage: LocalFile[];
  email: string;
  instagram: string;
}

export interface SpaceDetailElementInfos {
  profileImage: LocalFile[];
  email: string;
  instagram: string;
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
