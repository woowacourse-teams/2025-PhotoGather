import { useState } from 'react';
import type { MySpace, SpaceFilterType } from '../../types/space.type';

interface UseSpacesDisplayProps {
  mySpaces: MySpace[];
}

const useSpacesDisplay = ({ mySpaces }: UseSpacesDisplayProps) => {
  const [activeFilter, setActiveFilter] = useState<SpaceFilterType>('all');

  const changeActiveFilter = (filter: SpaceFilterType) => {
    setActiveFilter(filter);
  };

  const checkIsEarly = (space: MySpace) => {
    const now = new Date();
    const openedAt = new Date(space.openedAt);
    return now < openedAt;
  };

  const filterClosedSpaces = () => mySpaces.filter((space) => space.isExpired);

  const filterOpenSpaces = () =>
    mySpaces.filter((space) => !space.isExpired && !checkIsEarly(space));

  const filterUpcomingSpaces = () =>
    mySpaces.filter((space) => checkIsEarly(space));

  const matchingFilterFunc: Record<SpaceFilterType, () => MySpace[]> = {
    all: () => mySpaces,
    open: filterOpenSpaces,
    closed: filterClosedSpaces,
    upcoming: filterUpcomingSpaces,
  };

  const matchSpaceCardVariant = (space: MySpace) => {
    if (space.isExpired) return 'expired';
    if (checkIsEarly(space)) return 'early';
    return 'default';
  };

  const filterAndSortSpaces = () => {
    const filteredSpaces = matchingFilterFunc[activeFilter]();
    return filteredSpaces.sort((a: MySpace, b: MySpace) => {
      const aOpenedAt = new Date(a.openedAt);
      const bOpenedAt = new Date(b.openedAt);
      return bOpenedAt.getTime() - aOpenedAt.getTime();
    });
  };

  const displaySpaces = filterAndSortSpaces();

  return {
    matchSpaceCardVariant,
    displaySpaces,
    changeActiveFilter,
    activeFilter,
  };
};

export default useSpacesDisplay;
