import { useState } from 'react';
import type { MySpace } from '../../types/space.type';

type SortType = 'latest' | 'guestCount';

interface UseSpacesDisplayProps {
  mySpaces: MySpace[];
}

const useSpacesDisplay = ({ mySpaces }: UseSpacesDisplayProps) => {
  const [sortType, setSortType] = useState<SortType>('latest');

  const changeSortType = (sort: SortType) => {
    setSortType(sort);
  };

  const sortSpaces = () => {
    return [...mySpaces].sort((a: MySpace, b: MySpace) => {
      if (sortType === 'latest') {
        const aCreatedAt = new Date(a.createdAt);
        const bCreatedAt = new Date(b.createdAt);
        return bCreatedAt.getTime() - aCreatedAt.getTime();
      } else {
        return b.guestCount - a.guestCount;
      }
    });
  };

  const displaySpaces = sortSpaces();

  return {
    displaySpaces,
    changeSortType,
    sortType,
  };
};

export default useSpacesDisplay;
