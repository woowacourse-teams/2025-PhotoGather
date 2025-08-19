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
  /** 입력 값 오류 메시지 */
  errorMessage?: string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
  /** 입력 값 검증 함수 */
  validation?: (value: string) => boolean;
}

const InputModal = ({
  description,
  subDescription,
  placeholder,
  confirmText,
  cancelText,
  initialValue,
  errorMessage,
  onClose,
  onSubmit,
  validation,
}: InputModalProps) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const submitInput = () => {
    if (validation && !validation(value)) {
      return;
    }
    onSubmit?.({ value });
  };
  const isValid = validation ? validation(value) : false;
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
        errorMessage={validation ? (validation(value) ? '' : errorMessage) : ''}
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
