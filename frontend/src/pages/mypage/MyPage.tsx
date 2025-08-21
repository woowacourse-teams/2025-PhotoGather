import defaultProfile from '@assets/images/default_profile.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../apis/services/auth.service';
import { spaceService } from '../../apis/services/space.service';
import HighlightText from '../../components/@common/highlightText/HighlightText';
import Profile from '../../components/profile/Profile';
import SpaceCard from '../../components/spaceCard/SpaceCard';
import { ROUTES } from '../../constants/routes';
import useAuthConditionTasks from '../../hooks/@common/useAuthConditionTasks';
import type { MyInfo } from '../../types/api.type';
import type { MySpace } from '../../types/space.type';
import * as S from './MyPage.styles';

type FilterType = 'all' | 'open' | 'closed' | 'upcoming';

const MyPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [mySpaces, setMySpaces] = useState<MySpace[]>([]);
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);
  const navigate = useNavigate();
  useAuthConditionTasks({ taskWhenNoAuth: () => navigate(ROUTES.MAIN) });
  // const { leftTime } = useLeftTimer({
  //   targetTime: mySpaces.openedAt ?? '',
  // });

  // TODO : 로딩시 스켈레톤 제작
  useEffect(() => {
    const fetchMySpaces = async () => {
      const response = await spaceService.getMySpaces();
      setMySpaces(response.data ?? []);
    };
    const fetchAuthStatus = async () => {
      const response = await authService.status();
      setMyInfo(response.data ?? null);
    };
    setIsLoading(true);
    fetchAuthStatus();
    fetchMySpaces();
    setIsLoading(false);
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
        profileImage={
          isLoading || !myInfo?.pictureUrl ? defaultProfile : myInfo?.pictureUrl
        }
        name={isLoading || !myInfo?.name ? '이름' : myInfo?.name}
      />
      <S.CreateSpaceButton onClick={() => navigate(ROUTES.CREATE)}>
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
            <S.TotalCount>
              총 {matchingFilterFunc[activeFilter]().length}개
            </S.TotalCount>
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
              openedAt={space.openedAt}
              expiredAt={space.expiredAt}
              guestCount={space.guestCount}
              photoCount={space.photoCount}
              variant={matchSpaceCardVariant(space)}
              route={ROUTES.MANAGER.SPACE_HOME(String(space.spaceCode))}
            />
          ))}
        </S.SpaceList>
      </S.SpaceContainer>
    </S.Wrapper>
  );
};

export default MyPage;
