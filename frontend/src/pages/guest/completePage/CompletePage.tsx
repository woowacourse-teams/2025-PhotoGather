import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/@common/buttons/button/Button';
import { INFORMATION } from '../../../constants/messages';
import { ROUTES } from '../../../constants/routes';
import { theme } from '../../../styles/theme';
import * as S from './CompletePage.styles';

const CompletePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

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

    firework(); // 페이지 로드 시 폭죽
  }, []);

  useEffect(() => {
    if (!state || !state.guestNickName || !state.receiver) {
      // TODO : 랜딩 페이지 구현 후 대체 필요
      navigate(ROUTES.GUEST.MAIN);
    }
  }, [state, navigate]);

  if (!state?.receiver || !state?.guestNickName) return null;

  const canvasStyles: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${theme.layout.width}px`,
    height: `calc(100dvh - ${theme.layout.headerHeight} - ${theme.layout.padding.topBottom} - ${theme.layout.padding.leftRight})`,
  };

  return (
    <>
      <canvas ref={canvasRef} style={canvasStyles} />
      <S.Wrapper>
        <S.Message>
          <S.NameHighlightContainer>
            <S.NameHighlight>{state.receiver}</S.NameHighlight>에게
          </S.NameHighlightContainer>
          <S.NameHighlightContainer>
            <S.NameHighlight>{state.guestNickName}</S.NameHighlight>님의{'\n'}
          </S.NameHighlightContainer>
          {INFORMATION.GUESTBOOK.MESSAGE.COMPLETE}
        </S.Message>
        <Button
          text="스페이스로 돌아가기"
          onClick={() => navigate(ROUTES.GUEST.MAIN)}
        />
      </S.Wrapper>
    </>
  );
};

export default CompletePage;
