import { useNavigate } from 'react-router-dom';
import Button from '../components/@common/buttons/button/Button';
import {
  createGuestWorkDetailRoute,
  createWorkDetailRoute,
  ROUTES,
} from '../constants/routes';

const MainPage = () => {
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
      />
      <Button
        text="[HOST] 작품 소개 이동"
        onClick={() => navigate(createWorkDetailRoute('b17359bb41'))}
      />
      <Button
        text="[GUEST] 작품 소개 이동"
        onClick={() => navigate(createGuestWorkDetailRoute('b17359bb41'))}
      />
    </div>
  );
};

export default MainPage;
