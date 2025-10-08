import { useState } from 'react';
import { spaceService } from '../../../apis/services/space/space.service';
import type { SpaceInfo } from '../../../types/domain/space.type';

interface UseSpaceInfoProps {
  spaceCode: string;
}

const useSpaceInfo = ({ spaceCode }: UseSpaceInfoProps) => {
  const initialSpaceInfo: SpaceInfo = {
    id: 0,
    spaceCode: '',
    name: '',
    description: '',
    isPublic: false,
    instagramUsername: '',
    email: '',
    spacePhoto: {
      isExists: false,
      path: '',
    },
  };

  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>(initialSpaceInfo);

  const fetchSpaceInfo = async () => {
    const res = await spaceService.getSpaceInfo(spaceCode);
    if (res.success) {
      setSpaceInfo(res.data);
    }
  };

  return { spaceInfo, fetchSpaceInfo };
};

export default useSpaceInfo;
