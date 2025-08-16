import * as C from '../Input.styles';
import * as S from './TextInput.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  maxCount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const TextInput = ({ errorMessage, maxCount, ...inputProps }: InputProps) => {
  const segmenter = new Intl.Segmenter('und', { granularity: 'grapheme' });
  const graphemes = Array.from(
    segmenter.segment(inputProps.value),
    (word) => word.segment,
  );

  return (
    <C.Wrapper>
      <C.InputField
        {...inputProps}
        id={inputProps.id}
        aria-label={inputProps['aria-label']}
        value={inputProps.value}
        $isError={!!errorMessage}
      />
      <S.InputFooterContainer>
        <C.ErrorMessage>{errorMessage ? errorMessage : ''}</C.ErrorMessage>
        <S.InputCount>
          {maxCount && `${graphemes.length} / ${maxCount}`}
        </S.InputCount>
      </S.InputFooterContainer>
    </C.Wrapper>
  );
};

export default TextInput;
