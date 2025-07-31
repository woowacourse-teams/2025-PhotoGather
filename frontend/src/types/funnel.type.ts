export interface FunnelBaseElementProps {
  title: {
    text: string;
    highlightTextArray: string[];
  };
  description: string;
  element: React.ReactNode;
  handleNextButtonClick: () => void;
}

export interface FunnelElementProps {
  onNext: (data: string) => void;
}
