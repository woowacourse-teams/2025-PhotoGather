import { useEffect, useState } from 'react';
import { theme } from '../../../../styles/theme';
import type {
  ToastBase,
  ToastPositionType,
} from '../../../../types/toast.type';
import * as S from './Toast.styles';

export interface ToastProp extends ToastBase {
  position?: ToastPositionType;
}

export const Toast = ({
  text,
  type = 'info',
  duration = 3000,
  position = 'bottom',
}: ToastProp) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const next = Math.min(elapsed / duration, 1);
      setProgress(next);
      if (next < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [duration]);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(hideTimer);
  }, [duration]);

  return (
    <S.Wrapper $position={position} $visible={visible}>
      <S.TimerContainer
        type={type}
        style={{
          background: `conic-gradient(${
            type === 'error' ? theme.colors.error : theme.colors.darkAccent
          } ${progress * 360}deg, ${theme.colors.white} ${progress * 360}deg)`,
        }}
      >
        <S.IconContainer>
          <S.Icon type={type} />
        </S.IconContainer>
      </S.TimerContainer>
      <S.TextContainer>{text}</S.TextContainer>
    </S.Wrapper>
  );
};
