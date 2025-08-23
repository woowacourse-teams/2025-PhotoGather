import { type ReactElement, useState } from 'react';
import { CONSTRAINTS } from '../../../../constants/constraints';
import useGraphemeInput from '../../../../hooks/@common/useGraphemeInput';
import type { BaseModalProps } from '../../../../types/modal.type';
import Button from '../../buttons/button/Button';
import type HighlightText from '../../highlightText/HighlightText';
import TextInput from '../../inputs/textInput/TextInput';
import * as C from '../Modal.common.styles';
import * as S from './InputModal.styles';

interface InputModalProps extends BaseModalProps {
  /** 모달 내부 설명 */
  description: string | ReactElement<typeof HighlightText>;
  /** 모달 내부 설명 추가 설명 */
  subDescription?: string;
  /** 입력 플레이스홀더 */
  placeholder: string;
  /** 초기 입력 값*/
  initialValue?: string;
  /** 입력 값 오류 메시지 생성 함수 */
  createErrorMessage: (value: string) => string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
}

const InputModal = ({
  description,
  subDescription,
  placeholder,
  confirmText,
  cancelText,
  createErrorMessage,
  onClose,
  onSubmit,
  initialValue,
}: InputModalProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const { handleChange, validValue, validLength } = useGraphemeInput({
    initialValue,
    onChange: (e) => {
      setErrorMessage(createErrorMessage(e.target.value));
    },
  });

  const submitInput = () => {
    onSubmit?.({ value: validValue });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
      submitInput();
    }
  };

  const isValid = errorMessage.length === 0;

  return (
    <C.Wrapper>
      <S.DescriptionContainer>
        <C.Title>{description}</C.Title>
        {subDescription && (
          <S.SubDescription>{subDescription}</S.SubDescription>
        )}
      </S.DescriptionContainer>
      <TextInput
        placeholder={placeholder}
        maxCount={CONSTRAINTS.NAME_MAX_LENGTH}
        value={validValue}
        onChange={handleChange}
        errorMessage={errorMessage}
        validLength={validLength}
        onKeyDown={handleKeyDown}
      />
      <C.ButtonContainer>
        {cancelText && (
          <Button
            text={cancelText}
            onClick={() => onClose?.()}
            variant="secondary"
          />
        )}
        {confirmText && (
          <Button
            text={confirmText}
            onClick={submitInput}
            variant="primary"
            disabled={!isValid}
          />
        )}
      </C.ButtonContainer>
    </C.Wrapper>
  );
};

export default InputModal;
