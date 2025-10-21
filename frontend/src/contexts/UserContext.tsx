import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../apis/services/auth/auth.service';
import { AUTH_COOKIES } from '../constants/cookie';
import { ROUTES } from '../constants/routes';
import { useToast } from '../hooks/@common/useToast';
import type { UserInfo } from '../types/domain/auth.type';
import { clearAuthTokens } from '../utils/authCookieManager';
import { CookieUtils } from '../utils/cookie';

export const UserContext = createContext<UserInfo | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  //biome-ignore lint/correctness/useExhaustiveDependencies: 페이지 접속 시 처음 한 번만 실행
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = CookieUtils.get(AUTH_COOKIES.ACCESS) ?? undefined;

        const response = await authService.getUserInfo(token);

        if (!response.success || !response.data) {
          throw new Error('사용자 정보 조회 실패');
        }
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
        showToast({
          text: '사용자 정보 조회에 실패했습니다. 다시 시도해 주세요.',
          type: 'error',
        });
        navigate(ROUTES.MAIN);
        clearAuthTokens();
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};
