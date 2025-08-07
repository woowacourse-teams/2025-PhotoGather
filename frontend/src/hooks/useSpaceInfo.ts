import { useEffect, useState } from 'react';
import { spaceService } from '../apis/services/space.service';
import type { Space } from '../types/space.type';
import useApiCall from './@common/useApiCall';
import { useToast } from './@common/useToast';

const useSpaceInfo = (spaceCode: string) => {
  const [spaceInfo, setSpaceInfo] = useState<Space>();
  const [isLoading, setIsLoading] = useState(false);
  const { safeApiCall } = useApiCall();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchSpaceInfo = async () => {
      setIsLoading(true);
      try {
        const response = await safeApiCall(() =>
          spaceService.getInfoByCode(spaceCode),
        );
        const data = response.data;
        setSpaceInfo(data);
      } catch (error) {
        if (error instanceof Error) {
          showToast({ text: error.message, type: 'error' });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaceInfo();
  }, [safeApiCall, spaceCode, showToast]);

  return { isLoading, spaceInfo };
};

export default useSpaceInfo;
