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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.currentTarget.value;
    const shouldSlice = isComposingRef.current && rawValue.length <= maxCount;
    const patchedValue = shouldSlice ? rawValue : rawValue.slice(0, maxCount);
    updateValue(patchedValue);
  };

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
        currentTarget.focus();
        currentTarget.setSelectionRange(
          patchedValue.length,
          patchedValue.length,
        );
      }, 0);
    }

    isComposingRef.current = false;
  };

  return {
    handleCompositionEnd,
    handleCompositionStart,
    handleChange,
  };
};

export default useInputLength;
