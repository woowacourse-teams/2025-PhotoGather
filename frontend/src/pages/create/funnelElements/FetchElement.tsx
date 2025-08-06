import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import useCreateSpace from '../../../hooks/useCreateSpace';
import type { FunnelElementProps } from '../../../types/funnel.type';
import type { SpaceFunnelInfo } from '../../../types/space.type';
import { delay } from '../../../utils/delay';
import { parseIsoStringFromDateTime } from '../../../utils/parseIsoStringFromDateTime';
import WaitPage from './waitPage/WaitPage';

type FetchStatus = 'loading' | 'error' | 'success';

interface FetchElementProps extends FunnelElementProps {
  spaceInfo: SpaceFunnelInfo;
}

const FetchElement = ({ spaceInfo }: FetchElementProps) => {
  const [status, setStatus] = useState<FetchStatus>('loading');
  const [spaceCode, setSpaceCode] = useState('');

  const { fetchCreateSpace } = useCreateSpace();

  useEffect(() => {
    const createSpace = async () => {
      await delay(3000);
      try {
        const spaceCode = await fetchCreateSpace({
          name: spaceInfo.name,
          openedAt: parseIsoStringFromDateTime(spaceInfo.date, spaceInfo.time),
          password: '',
        });
        if (spaceCode) setSpaceCode(spaceCode);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };

    createSpace();
  }, [fetchCreateSpace, spaceInfo]);

  if (status === 'loading') {
    return <WaitPage spaceInfo={spaceInfo} />;
  }

  //TODO: Fetch 에러 시 리다이렉트 위치 조정 필요
  if (status === 'error') {
    return <Navigate to={ROUTES.MAIN} replace />;
  }

  return <Navigate to={ROUTES.GUEST.SHARE} state={spaceCode} replace />;
};

export default FetchElement;
