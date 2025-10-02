import type React from 'react';
import type { PropsWithChildren } from 'react';
import useScrollLock from '../../../hooks/@common/useScrollLock';
import * as S from '../../../styles/@common/BackDrop.styles';

interface OverlayProps extends PropsWithChildren {
  onBackdropClick?: () => void;
}

const Overlay = ({ onBackdropClick, children }: OverlayProps) => {
  useScrollLock();

  const handleBackDropClick = () => {
    onBackdropClick?.();
  };

  const handleStopBubbling = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <S.BackDrop onClick={handleBackDropClick}>
      <S.BackDropContainer onClick={handleStopBubbling}>
        {children}
      </S.BackDropContainer>
    </S.BackDrop>
  );
};

export default Overlay;
