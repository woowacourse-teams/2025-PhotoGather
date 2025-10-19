import { createContext, useEffect, useState } from 'react';
import { authService } from '../apis/services/auth/auth.service';
import { AUTH_COOKIES } from '../constants/cookie';
import type { UserInfo } from '../types/domain/auth.type';
import { CookieUtils } from '../utils/cookie';

export const UserContext = createContext<UserInfo | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = CookieUtils.get(AUTH_COOKIES.ACCESS) ?? undefined;

        const response = await authService.getUserInfo(token);
        console.log(response);
        if (!response.success || !response.data) {
          throw new Error('사용자 정보 조회 실패');
        }
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};
