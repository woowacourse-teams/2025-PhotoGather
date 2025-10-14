import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import useAuthConditionTasks from '../hooks/domain/auth/useAuthConditionTasks';

const MainPage = () => {
  const navigate = useNavigate();
  useAuthConditionTasks({
    taskWhenAuth: () => navigate(ROUTES.MYPAGE),
    taskWhenNoAuth: () => navigate(ROUTES.LANDING),
  });

  return null;
};

export default MainPage;
