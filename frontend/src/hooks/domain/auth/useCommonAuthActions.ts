import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { clearAuthTokens } from '../../../utils/authCookieManager';

const useCommonAuthActions = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    clearAuthTokens();
    navigate(ROUTES.MAIN);
  };

  return { handleLogout };
};

export default useCommonAuthActions;
