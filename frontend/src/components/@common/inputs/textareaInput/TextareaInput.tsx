import * as C from '../input.common.styles';
import * as S from './TextareaInput.styles';

interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  errorMessage?: string;
  maxCount: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  validLength: number;
}

const TextareaInput = ({
  label,
  errorMessage,
  maxCount,
  validLength,
  ...textareaProps
}: TextareaInputProps) => {
  return (
    <C.Wrapper>
      <C.Label htmlFor={textareaProps.id}>{label}</C.Label>
      <S.TextareaField {...textareaProps} $isError={!!errorMessage} />
      <C.InputFooterContainer>
        <C.ErrorMessage>{errorMessage ? errorMessage : ''}</C.ErrorMessage>
        <C.InputCount>
          {maxCount && `${validLength} / ${maxCount}`}
        </C.InputCount>
      </C.InputFooterContainer>
    </C.Wrapper>
  );
};

export default TextareaInput;
