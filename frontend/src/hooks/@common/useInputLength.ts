import { useRef } from 'react';

interface useInputLengthProps {
  value: string;
  maxCount: number;
  updateValue: (value: string) => void;
}

const useInputLength = ({
  value,
  maxCount,
  updateValue,
}: useInputLengthProps) => {
  const isComposingRef = useRef<boolean>(false);

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };
  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    if (!value || !maxCount) return;
    const currentTarget = e.currentTarget;

    const currentValue = currentTarget.value;
    const shouldSlice = currentValue.length >= maxCount;
    const patchedValue = shouldSlice
      ? currentValue.slice(0, maxCount)
      : currentValue;
    updateValue(patchedValue);
    currentTarget.value = patchedValue;
    if (shouldSlice) {
      currentTarget.blur();
      setTimeout(() => {
        currentTarget.blur();
      }, 0);
    }

    isComposingRef.current = false;
  };

  const splicedValue = value.slice(0, maxCount);

  return {
    handleCompositionEnd,
    handleCompositionStart,
    splicedValue,
  };
};

export default useInputLength;
