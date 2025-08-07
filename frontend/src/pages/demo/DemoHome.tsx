import rocketImage from '@assets/images/rocket.png';
import * as Sentry from '@sentry/react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/@common/buttons/button/Button';
import { ROUTES } from '../../constants/routes';
import * as S from './DemoHome.styles';

const DemoHome = () => {
  const navigate = useNavigate();
  const testFunc = () => {
    try {
      throw new Error(
        '축하합니다. 성공적으로 sentry 설정을 마치셨습니다 우하하',
      );
    } catch (err) {
      Sentry.captureException(err);
      Sentry.captureMessage('가짜 축하');
    }
  };
  return (
    <S.Wrapper>
      <S.Icon src={rocketImage} alt="데모 페이지 아이콘"></S.Icon>
      <S.Title>Forgather DEMO</S.Title>
      <Button
        text="(CREATE) 스페이스 생성 퍼널"
        onClick={() => navigate(ROUTES.CREATE)}
      />
      <Button
        text="(GUEST) 스페이스 업로드 페이지"
        onClick={() => navigate(ROUTES.GUEST.IMAGE_UPLOAD)}
      />
      <Button
        text="(MANAGER) 스페이스 관리 페이지 이동"
        onClick={() => navigate(ROUTES.MANAGER.SPACE_HOME)}
      />
      <Button text="테스트 에러 발생" onClick={testFunc} />
    </S.Wrapper>
  );
};

export default DemoHome;
