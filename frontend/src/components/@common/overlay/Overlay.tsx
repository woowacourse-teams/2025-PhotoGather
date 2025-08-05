import type React from 'react';
import type { PropsWithChildren } from 'react';
import * as S from './Overlay.styles';

interface OverlayProps {
  onClose: () => void;
  closeOnOverlayClick: boolean;
}

type Props = OverlayProps & PropsWithChildren;

const Overlay = ({ onClose, closeOnOverlayClick, children }: Props) => {
  const handleBackDropClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const handleStopBubbling = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <S.Overlay onClick={handleBackDropClick}>
      <S.OverlayContainer onClick={handleStopBubbling}>
        {children}
      </S.OverlayContainer>
    </S.Overlay>
  );
};

export default Overlay;
