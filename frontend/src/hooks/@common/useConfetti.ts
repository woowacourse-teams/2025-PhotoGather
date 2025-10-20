import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';
import { theme } from '../../styles/theme';

const useConfetti = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    const firework = () => {
      myConfetti({
        particleCount: 100,
        spread: 160,
        startVelocity: 50,
        ticks: 200,
        origin: { x: 0.5, y: 0.7 },
        shapes: ['circle', 'square'],
        gravity: 2,
      });
    };

    firework();
  }, []);

  const canvasStyles: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${theme.layout.width}px`,
    height: `calc(100dvh - ${theme.layout.headerHeight} - ${theme.layout.padding.topBottom} - ${theme.layout.padding.leftRight})`,
  };

  return { canvasRef, canvasStyles };
};

export default useConfetti;
