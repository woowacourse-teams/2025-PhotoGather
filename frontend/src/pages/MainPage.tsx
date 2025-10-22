import { useNavigate } from 'react-router-dom';
import Button from '../components/@common/buttons/button/Button';
import {
  createCreateGuestbookRoute,
  createGuestbookRoute,
  createGuestWorkDetailRoute,
  createWorkDetailRoute,
  ROUTES,
} from '../constants/routes';
import { DividerLine } from '../styles/@common/DividerLine.styles';

const MainPage = () => {
  const throwSentryError = () => {
    throw new Error('This is a test error for Sentry.');
  };

  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <h1>포게더 2.0 데모페이지</h1>
      <Button
        text="[Host] Mypage 이동 (로그인)"
        onClick={() => navigate(ROUTES.HOST.MY_PAGE)}
      />
      <Button
        text="[GUEST] 스페이스 메인 이동"
        onClick={() => navigate(ROUTES.GUEST.MAIN)}
        variant="secondary"
      />
      <DividerLine width="100%" />
      <Button
        text="[HOST] 작품 소개 이동"
        onClick={() => navigate(createWorkDetailRoute('b17359bb41'))}
      />
      <Button
        text="[GUEST] 작품 소개 이동"
        onClick={() => navigate(createGuestWorkDetailRoute('b17359bb41'))}
        variant="secondary"
      />
      <DividerLine width="100%" />
      <Button
        text="[HOST] 방명록 이동"
        onClick={() => navigate(createGuestbookRoute('f205850861'))}
      />
      <Button
        text="[GUEST] 방명록 작성 이동"
        onClick={() => navigate(createCreateGuestbookRoute('f205850861'))}
        variant="secondary"
      />
      <Button
        text="Sentry 에러 발생시키기"
        onClick={throwSentryError}
        variant="danger"
      />
    </div>
  );
};

export default MainPage;
