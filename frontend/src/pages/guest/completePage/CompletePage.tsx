import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/@common/buttons/button/Button';
import { INFORMATION } from '../../../constants/messages';
import { createGuestMainRoute, ROUTES } from '../../../constants/routes';
import useConfetti from '../../../hooks/@common/useConfetti';
import * as S from './CompletePage.styles';

const CompletePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { spaceCode } = useParams();
  const { canvasRef, canvasStyles } = useConfetti();

  useEffect(() => {
    if (!state || !state.guestNickName || !state.receiver) {
      navigate(ROUTES.MAIN);
    }
  }, [state, navigate]);

  if (!state?.receiver || !state?.guestNickName) return null;

  return (
    <>
      <canvas ref={canvasRef} style={canvasStyles} />
      <S.Wrapper>
        <S.Message>
          <S.NameHighlightContainer>
            <S.NameHighlight>{state.guestNickName}</S.NameHighlight>님의{'\n'}
          </S.NameHighlightContainer>
          {INFORMATION.GUESTBOOK.MESSAGE.COMPLETE}
        </S.Message>
        <Button
          text="스페이스로 돌아가기"
          onClick={() => navigate(createGuestMainRoute(spaceCode ?? ''))}
        />
      </S.Wrapper>
    </>
  );
};

export default CompletePage;
