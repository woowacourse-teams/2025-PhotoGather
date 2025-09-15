import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultProfileImg as defaultProfile } from '../../@assets/images';
import { authService } from '../../apis/services/auth.service';
import { photoService } from '../../apis/services/photo.service';
import { spaceService } from '../../apis/services/space.service';
import HighlightText from '../../components/@common/highlightText/HighlightText';
import Profile from '../../components/profile/Profile';
import SpaceCard from '../../components/spaceCard/SpaceCard';
import { ROUTES } from '../../constants/routes';
import useAuthConditionTasks from '../../hooks/@common/useAuthConditionTasks';
import useSpacesDisplay from '../../hooks/domain/useSpacesDisplay';
import type { MyInfo } from '../../types/api.type';
import type { MySpace, SpaceFilterType } from '../../types/space.type';
import { buildThumbnailUrl } from '../../utils/buildImageUrl';
import { parsedImagePath } from '../../utils/parsedImagePath';
import * as S from './MyPage.styles';

const MyPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [mySpaces, setMySpaces] = useState<MySpace[]>([]);
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);
  const isSpacesEmpty = mySpaces.length === 0;
  useAuthConditionTasks({ taskWhenNoAuth: () => navigate(ROUTES.MAIN) });

  // TODO : 임시 썸네일 -> 추후 api에서 내려주도록 수정 요청
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});

  const {
    matchSpaceCardVariant,
    displaySpaces,
    changeActiveFilter,
    activeFilter,
  } = useSpacesDisplay({ mySpaces });

  useEffect(() => {
    if (mySpaces.length === 0) return;

    const fetchThumbnails = async () => {
      const results: Record<string, string> = {};

      await Promise.all(
        mySpaces.map(async (space) => {
          const res = await photoService.getBySpaceCode(space.spaceCode, {
            page: 1,
            size: 1,
          });
          const photo = res?.data?.photos?.[0];
          if (!photo) return;
          results[space.spaceCode] = buildThumbnailUrl(
            space.spaceCode,
            parsedImagePath(photo?.path),
            'x800',
          );
        }),
      );

      setThumbnails(results);
    };

    fetchThumbnails();
  }, [mySpaces]);
  // <--- 여기까지 임시 썸네일 로직

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

  const filters: { key: SpaceFilterType; label: string }[] = [
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
          {isSpacesEmpty && <S.FilterBlur />}
          {isSpacesEmpty && (
            <S.EmptyTextContainer>
              <S.EmptyTitleContainer>
                생성된 스페이스가 없어요
              </S.EmptyTitleContainer>
              <S.EmptyDescriptionContainer>
                스페이스를 생성해주세요
              </S.EmptyDescriptionContainer>
            </S.EmptyTextContainer>
          )}
          <S.FilterContainer>
            <S.TotalCount>총 {displaySpaces.length}개</S.TotalCount>
            <S.TabContainer>
              {filters.map((filter) => (
                <S.TabButton
                  key={filter.key}
                  isActive={activeFilter === filter.key}
                  onClick={() => {
                    changeActiveFilter(filter.key);
                  }}
                >
                  {filter.label}
                </S.TabButton>
              ))}
            </S.TabContainer>
          </S.FilterContainer>

          {displaySpaces.map((space) => {
            return (
              <SpaceCard
                key={space.id}
                space={space}
                thumbnail={thumbnails[space.spaceCode]}
                variant={matchSpaceCardVariant(space)}
                onClick={() =>
                  navigate(ROUTES.MANAGER.SPACE_HOME(String(space.spaceCode)))
                }
              />
            );
          })}
        </S.SpaceList>
      </S.SpaceContainer>
    </S.Wrapper>
  );
};

export default MyPage;
