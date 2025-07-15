import { useState } from 'react';

interface useInputLengthProps {
  value: string;
  maxCount: number;
}

const useInputLength = ({ value, maxCount }: useInputLengthProps) => {
  const [_isComposition, setIsComposition] = useState(false);
  const handleCompositionStart = () => {
    setIsComposition(true);
  };
  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    if (!value || !maxCount) return;

    const currentValue = e.currentTarget.value;
    if (currentValue.length > maxCount) {
      e.currentTarget.value = currentValue.slice(0, maxCount);
    }
    setIsComposition(false);
  };
  const splicedValue = String(value).slice(0, maxCount);

  return { splicedValue, handleCompositionEnd, handleCompositionStart };
};

export default useInputLength;
