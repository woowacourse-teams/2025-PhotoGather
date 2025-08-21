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
  /** 모달에 표시할 아이콘 */
  icon?: React.ReactNode;
  /** 모달에 표시할 이미지 */
  image?: ImageProps;
  /** 모달 제목 */
  title: string | ReactElement<typeof HighlightText>;
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
    <C.Wrapper>
      {icon && <S.IconContainer>{icon}</S.IconContainer>}
      {image && (
        <S.ImageContainer>
          <S.Icon src={image.src} alt={image.alt} />
        </S.ImageContainer>
      )}
      <S.TextContainer>
        <C.Title>{title}</C.Title>
        {description ? (
          <S.Description $isError={mode === 'error'}>
            {description}
          </S.Description>
        ) : null}
      </S.TextContainer>

      <C.ButtonContainer>
        <Button text={cancelText} variant="secondary" onClick={handleCancel} />
        <Button text={confirmText} variant="primary" onClick={handleConfirm} />
      </C.ButtonContainer>
    </C.Wrapper>
  );
};

export default ConfirmModal;
