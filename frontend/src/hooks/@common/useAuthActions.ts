import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { clearAuthTokens } from '../../utils/authCookieManager';

const useAuthActions = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    clearAuthTokens();
    navigate(ROUTES.MAIN);
    setTimeout(() => {
      location.reload();
    }, 0);
  };

  return { handleLogout };
};

export default useAuthActions;
