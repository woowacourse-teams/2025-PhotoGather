import { useEffect, useState } from 'react';
import Modal from '../../../@common/modal/Modal';
import * as S from './OnBoardingModal.style';

interface onBoardingModalProps {
  text: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const OnBoardingModal = ({
  text,
  icon,
  isOpen,
  onClose,
}: onBoardingModalProps) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setIsFading(true);

      const closeTimer = setTimeout(onClose, 400);

      return () => clearTimeout(closeTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop />
      <S.Wrapper className={isFading ? 'fade-out' : ''}>
        {icon && <S.IconContainer>{icon}</S.IconContainer>}
        <S.TextContainer>{text}</S.TextContainer>
      </S.Wrapper>
    </Modal>
  );
};

export default OnBoardingModal;
