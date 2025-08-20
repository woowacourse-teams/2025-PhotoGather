import type { ReactElement } from 'react';
import type { BaseModalProps } from '../../../../types/modal.type';
import Button from '../../buttons/button/Button';
import type HighlightText from '../../highlightText/HighlightText';
import * as C from '../Modal.common.styles';
import * as S from './ConfirmModal.styles';

interface ImageProps {
  src: string;
  alt: string;
}

interface ConfirmModalProps extends BaseModalProps {
  /** 모달에 표시할 이미지 URL */
  image?: ImageProps;
  /** 확인 메시지 - 문자열 또는 highlightText 컴포넌트 */
  description?: string | ReactElement<typeof HighlightText>;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
}

const ConfirmModal = ({
  image,
  description = '계속 진행할까요?',
  confirmText = '확인',
  cancelText = '취소',
  onClose,
  onSubmit,
}: ConfirmModalProps) => {
  const handleCancel = () => {
    onClose?.();
  };

  const handleConfirm = () => {
    onSubmit?.(true);
  };

  return (
    <C.Wrapper>
      {image && (
        <S.IconContainer>
          <S.Icon src={image.src} alt={image.alt} />
        </S.IconContainer>
      )}
      {typeof description === 'string' ? (
        <C.Description>{description}</C.Description>
      ) : (
        description
      )}
      <C.ButtonContainer>
        <Button text={cancelText} variant="secondary" onClick={handleCancel} />
        <Button text={confirmText} variant="primary" onClick={handleConfirm} />
      </C.ButtonContainer>
    </C.Wrapper>
  );
};

export default ConfirmModal;
