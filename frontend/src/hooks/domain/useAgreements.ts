import { useEffect, useState } from 'react';
import { authService } from '../../apis/services/auth.service';
import type { MyInfo } from '../../types/api.type';
import useError from '../@common/useError';

const useAgreements = () => {
  const { tryFetch } = useError();
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);

  const [loadingAgreements, setLoadingAgreements] = useState(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      setLoadingAgreements(true);
      const response = await authService.status();
      setMyInfo(response.data ?? null);
      setLoadingAgreements(false);
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

  return { isAgree: myInfo?.agreedTerms, handleAgree, loadingAgreements };
};

export default useAgreements;
