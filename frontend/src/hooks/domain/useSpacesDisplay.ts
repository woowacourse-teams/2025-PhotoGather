import { useState } from 'react';
import type { MySpace } from '../../types/domain/space.type';

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
        return b.id - a.id; // ID가 높을수록 최신
      } else {
        return b.guestBookCardCount - a.guestBookCardCount;
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
