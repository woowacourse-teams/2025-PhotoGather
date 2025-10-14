import { useEffect, useState } from 'react';
import { authService } from '../../../apis/services/auth.service';
import type { MyInfo } from '../../../types/api.type';
import useTaskHandler from '../../@common/useTaskHandler';

const useAgreements = () => {
  const { tryFetch } = useTaskHandler();
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

  const handleAgree = async () => {
    await tryFetch({
      task: async () => {
        await authService.agreeTerm();
      },
      errorActions: ['toast'],
    });
  };

  return { isAgree: myInfo?.agreedTerms, handleAgree, loadingAgreements };
};

export default useAgreements;
