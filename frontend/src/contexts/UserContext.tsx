import { createContext, useEffect, useState } from 'react';
import { authService } from '../apis/services/auth/auth.service';
import { AUTH_COOKIES } from '../constants/cookie';
import { useToast } from '../hooks/@common/useToast';
import type { UserInfo } from '../types/domain/auth.type';
import { CookieUtils } from '../utils/cookie';

export const UserContext = createContext<UserInfo | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { showToast } = useToast();

  // biome-ignore lint/correctness/useExhaustiveDependencies: showToast는 의존성 배열에 포함되지 않음
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = CookieUtils.get(AUTH_COOKIES.ACCESS);
        if (!token) return;

        const response = await authService.getUserInfo(token);
        if (!response.success || !response.data) {
          throw new Error('사용자 정보 조회 실패');
        }
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
        showToast({
          text: '사용자 정보를 불러오는데 실패했습니다.',
          type: 'error',
        });
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};
