import { useEffect, useState } from 'react';

const segmenter = new Intl.Segmenter('und', { granularity: 'grapheme' });

interface UseGraphemeInputProps {
  initialValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useGraphemeInput = ({
  initialValue = '',
  onChange,
}: UseGraphemeInputProps) => {
  const [value, setValue] = useState(initialValue);
  const graphemes = Array.from(
    segmenter.segment(value),
    (word) => word.segment,
  );

  const validValue = graphemes.join('');
  const validLength = graphemes.length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { handleChange, validValue, validLength };
};

export default useGraphemeInput;
