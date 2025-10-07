import { useEffect, useState } from 'react';
import { theme } from '../../../../styles/theme';
import type { ToastBase } from '../../../../types/toast.type';
import * as S from './Toast.styles';

export const Toast = ({ text, type = 'info', duration = 1500 }: ToastBase) => {
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
    <S.Wrapper $visible={visible} $type={type}>
      <S.TimerContainer
        $type={type}
        style={{
          background: `conic-gradient(${
            type === 'error' ? theme.colors.error : theme.colors.info
          } ${progress * 360}deg, ${theme.colors.white} ${progress * 360}deg)`,
          WebkitMask: 'radial-gradient(transparent 40%, black 41%)',
          mask: 'radial-gradient(transparent 40%, black 41%)',
        }}
      ></S.TimerContainer>
      <S.TextContainer>{text}</S.TextContainer>
    </S.Wrapper>
  );
};
