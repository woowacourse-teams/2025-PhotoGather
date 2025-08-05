import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useCreateSpace from '../../../hooks/useCreateSpace';
import type { FunnelElementProps } from '../../../types/funnel.type';
import type { SpaceCreateInfo } from '../../../types/space.type';

type FetchStatus = 'loading' | 'error' | 'success';

interface FetchElementProps extends FunnelElementProps {
  spaceCreateInfo: SpaceCreateInfo;
}

const FetchElement = ({ spaceCreateInfo }: FetchElementProps) => {
  const [status, setStatus] = useState<FetchStatus>('loading');
  const [spaceCode, setSpaceCode] = useState('');

  const { fetchCreateSpace } = useCreateSpace();

  useEffect(() => {
    const createSpace = async () => {
      try {
        const spaceCode = await fetchCreateSpace(spaceCreateInfo);
        if (spaceCode) setSpaceCode(spaceCode);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };

    createSpace();
  }, [fetchCreateSpace, spaceCreateInfo]);

  if (status === 'loading') {
    return (
      <>
        <div>
          <p>조금만 기다려주세요</p>
          <p>곧 스페이스 생성이 끝나요</p>
        </div>
        <p>{JSON.stringify(spaceCreateInfo)}</p>
      </>
    );
  }

  //TODO: Fetch 에러 시 리다이렉트 위치 조정 필요
  if (status === 'error') {
    return <Navigate to="/" replace />;
  }

  return <Navigate to={`/complete/space-created/${spaceCode}`} replace />;
};

export default FetchElement;
