import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useCreateSpace from '../../../hooks/useCreateSpace';
import type { FunnelElementProps } from '../../../types/funnel.type';
import type { SpaceCreateInfo } from '../../../types/space.type';

type FetchStatus = 'loading' | 'error' | 'success';

interface FetchElementProps extends FunnelElementProps {
  spaceInfo: SpaceCreateInfo;
}

const FetchElement = ({ spaceInfo }: FetchElementProps) => {
  const [status, setStatus] = useState<FetchStatus>('loading');
  const [spaceCode, setSpaceCode] = useState('');

  const { fetchCreateSpace } = useCreateSpace();

  useEffect(() => {
    const createSpace = async () => {
      try {
        const spaceCode = await fetchCreateSpace(spaceInfo);
        if (!spaceCode) throw new Error();

        setSpaceCode(spaceCode);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };

    createSpace();
  }, [fetchCreateSpace, spaceInfo]);

  if (status === 'loading') {
    return (
      <>
        <div>
          <p>조금만 기다려주세요</p>
          <p>곧 스페이스 생성이 끝나요</p>
        </div>
        <p>{JSON.stringify(spaceInfo)}</p>
      </>
    );
  }

  if (status === 'error') {
    return <Navigate to="/" replace />;
  }

  return <Navigate to={`/complete/space-created/${spaceCode}`} replace />;
};

export default FetchElement;
