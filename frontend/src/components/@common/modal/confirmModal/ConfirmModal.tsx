import type { BaseModalProps } from '../../../../types/modal.type';
import Button from '../../buttons/button/Button';
import BaseModal from '../baseModal/BaseModal';
import * as S from './ConfirmModal.styles';

interface ConfirmModalProps extends BaseModalProps {
  /** 모달에 표시할 아이콘 */
  icon?: React.ReactNode;
  /** 모달에 표시할 이미지 */
  image?: string;
  /** 모달 제목 */
  title: string;
  /** 확인 메시지 */
  description?: string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
  /** 모달 모드 */
  mode?: 'default' | 'error';
}

const ConfirmModal = ({
  icon,
  image,
  title = '계속 진행할까요?',
  description,
  confirmText = '확인',
  cancelText = '취소',
  mode = 'default',
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
    <BaseModal>
      {icon && <S.IconContainer>{icon}</S.IconContainer>}
      {image && (
        <S.ImageContainer>
          <S.Icon src={image} alt={description} />
        </S.ImageContainer>
      )}
      <S.TextContainer>
        <S.Title>{title}</S.Title>
        {description ? (
          <S.Description $isError={mode === 'error'}>
            {description}
          </S.Description>
        ) : null}
      </S.TextContainer>
      <S.ButtonContainer>
        <Button text={cancelText} variant="secondary" onClick={handleCancel} />
        <Button text={confirmText} variant="primary" onClick={handleConfirm} />
      </S.ButtonContainer>
    </BaseModal>
  );
};

export default ConfirmModal;
