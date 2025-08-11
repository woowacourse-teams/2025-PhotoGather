import type { BaseModalProps } from '../../../../types/modal.type';
import Button from '../../buttons/button/Button';
import * as S from './ConfirmModal.styles';

interface ConfirmModalProps extends BaseModalProps {
  /** 모달에 표시할 이미지 URL */
  image?: string;
  /** 확인 메시지 */
  description?: string;
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
    <S.Wrapper>
      {image && (
        <S.IconContainer>
          <S.Icon src={image} alt={description} />
        </S.IconContainer>
      )}
      <S.Description>{description}</S.Description>
      <S.ButtonContainer>
        <Button text={cancelText} variant="secondary" onClick={handleCancel} />
        <Button text={confirmText} variant="primary" onClick={handleConfirm} />
      </S.ButtonContainer>
    </S.Wrapper>
  );
};

export default ConfirmModal;
