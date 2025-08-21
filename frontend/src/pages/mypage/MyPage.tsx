import defaultImage from '@assets/images/img_default.png';
import { useEffect, useState } from 'react';
import { authService } from '../../apis/services/auth.service';
import { spaceService } from '../../apis/services/space.service';
import HighlightText from '../../components/@common/highlightText/HighlightText';
import Profile from '../../components/profile/Profile';
import SpaceCard from '../../components/spaceCard/SpaceCard';
import type { MyInfo } from '../../types/api.type';
import type { MySpace } from '../../types/space.type';
import * as S from './MyPage.styles';

type FilterType = 'all' | 'open' | 'closed' | 'upcoming';

const MyPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [mySpaces, setMySpaces] = useState<MySpace[]>([]);
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);

  useEffect(() => {
    const fetchMySpaces = async () => {
      const response = await spaceService.getMySpaces();
      setMySpaces(response.data ?? []);
    };
    const fetchAuthStatus = async () => {
      const response = await authService.status();
      setMyInfo(response.data ?? null);
    };
    fetchAuthStatus();
    fetchMySpaces();
  }, []);

  const checkIsEarly = (space: MySpace) => {
    const now = new Date();
    const openedAt = new Date(space.openedAt);
    return now < openedAt;
  };

  const filterClosedSpaces = () => {
    const cloneMySpaces = [...mySpaces];
    return cloneMySpaces.filter((space) => space.isExpired);
  };

  const filterOpenSpaces = () => {
    const cloneMySpaces = [...mySpaces];
    return cloneMySpaces.filter(
      (space) => !space.isExpired && !checkIsEarly(space),
    );
  };

  const filterUpcomingSpaces = () => {
    const cloneMySpaces = [...mySpaces];
    return cloneMySpaces.filter((space) => checkIsEarly(space));
  };

  const matchingFilterFunc = {
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

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '전체' },
    { key: 'open', label: '열림' },
    { key: 'closed', label: '닫힘' },
    { key: 'upcoming', label: '예정' },
  ];

  return (
    <S.Wrapper>
      <Profile
        profileImage={myInfo?.pictureUrl ?? defaultImage}
        name={myInfo?.name ?? '이름'}
      />
      <S.CreateSpaceButton>
        <HighlightText
          text="＋ 스페이스 생성"
          highlightTextArray={['＋']}
          highlightColorStyle="primary60"
          textColorStyle="white"
          fontStyle="bodyRegular"
        />
      </S.CreateSpaceButton>
      <S.SpaceContainer>
        <S.SpaceList>
          <S.FilterContainer>
            <S.TotalCount>총 {mySpaces.length}개</S.TotalCount>
            <S.TabContainer>
              {filters.map((filter) => (
                <S.TabButton
                  key={filter.key}
                  isActive={activeFilter === filter.key}
                  onClick={() => {
                    setActiveFilter(filter.key);
                  }}
                >
                  {filter.label}
                </S.TabButton>
              ))}
            </S.TabContainer>
          </S.FilterContainer>

          {matchingFilterFunc[activeFilter]().map((space) => (
            <SpaceCard
              key={space.id}
              name={space.name}
              validHours={2022}
              openedAt={space.openedAt}
              guestCount={space.guestCount}
              photoCount={space.photoCount}
              variant={matchSpaceCardVariant(space)}
            />
          ))}
        </S.SpaceList>
      </S.SpaceContainer>
    </S.Wrapper>
  );
};

export default MyPage;
