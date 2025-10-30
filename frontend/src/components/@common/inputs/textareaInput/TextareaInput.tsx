import * as C from '../input.common.styles';
import * as S from './TextareaInput.styles';

interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isRequired?: boolean;
  label?: string;
  errorMessage?: string;
  maxCount: number;
  validLength?: number;
}

const TextareaInput = ({
  isRequired = false,
  label,
  errorMessage,
  maxCount,
  validLength,
  ...textareaProps
}: TextareaInputProps) => {
  return (
    <C.Wrapper>
      <C.Label htmlFor={textareaProps.id}>
        {label && label}
        <C.requiredDot>{isRequired && '*'}</C.requiredDot>
      </C.Label>
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
