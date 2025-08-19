import type { ReactElement } from 'react';
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
  value: string;
  /** 입력 값 변경 핸들러 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 입력 값 오류 메시지 */
  errorMessage?: string;
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
  value,
  onChange,
  errorMessage,
  onClose,
  onSubmit,
}: InputModalProps) => {
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
        onChange={onChange}
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
            onClick={() => onSubmit?.(value)}
            variant="primary"
          />
        )}
      </C.ButtonContainer>
    </C.Wrapper>
  );
};

export default InputModal;
