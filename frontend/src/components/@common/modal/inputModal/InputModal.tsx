import { type ReactElement, useState } from 'react';
import { CONSTRAINTS } from '../../../../constants/constraints';
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
  /** 입력 값 */
  initialValue: string;
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
  initialValue,
  createErrorMessage,
  onClose,
  onSubmit,
}: InputModalProps) => {
  const [value, setValue] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(createErrorMessage(e.target.value));
    setValue(e.target.value);
  };
  const submitInput = () => {
    onSubmit?.({ value });
  };
  const isValid = errorMessage.length === 0;

  return (
    <C.Wrapper>
      <S.DescriptionContainer>
        <C.Description>{description}</C.Description>
        {subDescription && (
          <S.SubDescription>{subDescription}</S.SubDescription>
        )}
      </S.DescriptionContainer>
      <TextInput
        placeholder={placeholder}
        maxCount={CONSTRAINTS.NAME_MAX_LENGTH}
        value={value}
        onChange={handleChange}
        errorMessage={errorMessage}
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
