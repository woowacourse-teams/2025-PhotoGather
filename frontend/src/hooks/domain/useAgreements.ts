import { useEffect, useState } from 'react';
import { authService } from '../../apis/services/auth.service';
import type { MyInfo } from '../../types/api.type';
import useError from '../@common/useError';

const useAgreements = () => {
  const { tryFetch } = useError();
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const response = await authService.status();
      setMyInfo(response.data ?? null);
    };
    fetchAuthStatus();
  }, []);

  const handleAgree = () => {
    tryFetch({
      task: async () => {
        await authService.agreeTerm();
      },
      errorActions: ['toast'],
    });
  };

  return { isAgree: myInfo?.agreedTerms ?? false, handleAgree };
};

export default useAgreements;
