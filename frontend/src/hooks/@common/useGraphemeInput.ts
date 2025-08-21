import { useState } from 'react';

const segmenter = new Intl.Segmenter('und', { granularity: 'grapheme' });

interface UseGraphemeInputProps {
  initialValue?: string;
}

const useGraphemeInput = ({ initialValue = '' }: UseGraphemeInputProps) => {
  const [value, setValue] = useState(initialValue);
  const graphemes = Array.from(
    segmenter.segment(value),
    (word) => word.segment,
  );

  const validValue = graphemes.join('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const validLength = graphemes.length;

  return { onChange, validValue, validLength };
};

export default useGraphemeInput;
