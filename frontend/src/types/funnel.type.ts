export interface FunnelBaseElementProps {
  title: {
    text: string;
    highlightTextArray: string[];
  };
  description: string;
  element: React.ReactNode;
  onNextButtonClick: () => void;
  nextButtonDisabled?: boolean;
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
