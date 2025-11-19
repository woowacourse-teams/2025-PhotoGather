import { useState } from 'react';
import type { MySpace } from '../../types/domain/space.type';

export type SortType = 'latest' | 'guestCount' | 'name';

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
        return b.id - a.id;
      } else if (sortType === 'name') {
        return a.name.localeCompare(b.name);
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
