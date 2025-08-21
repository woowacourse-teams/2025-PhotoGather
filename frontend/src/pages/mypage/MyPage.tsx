import { useState } from 'react';
import HighlightText from '../../components/@common/highlightText/HighlightText';
import Profile from '../../components/profile/Profile';
import SpaceCard from '../../components/spaceCard/SpaceCard';
import { profileImage } from '../logout/LogoutPage';
import * as S from './MyPage.styles';

type FilterType = 'all' | 'open' | 'closed' | 'upcoming';

const MyPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // TODO : API에서 데이터 받아오기
  const filterCounts = {
    all: 16,
    open: 8,
    closed: 5,
    upcoming: 3,
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '전체' },
    { key: 'open', label: '열림' },
    { key: 'closed', label: '닫힘' },
    { key: 'upcoming', label: '예정' },
  ];

  return (
    <S.Wrapper>
      <Profile profileImage={profileImage} name={'이름'} />
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
            <S.TotalCount>총 {filterCounts.all}개</S.TotalCount>
            <S.TabContainer>
              {filters.map((filter) => (
                <S.TabButton
                  key={filter.key}
                  isActive={activeFilter === filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </S.TabButton>
              ))}
            </S.TabContainer>
          </S.FilterContainer>

          <SpaceCard
            name="강릉 여행"
            validHours={2022}
            openedAt="2002"
            guestCount={11}
            photoCount={23}
            variant="expired"
          />
        </S.SpaceList>
      </S.SpaceContainer>
    </S.Wrapper>
  );
};

export default MyPage;
