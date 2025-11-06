import { IoAddOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Dropdown, {
  type DropdownOption,
} from '../../../components/@common/dropdown/Dropdown';
import Thumbnail from '../../../components/@common/thumbnail/Thumbnail';
import SpaceCard from '../../../components/specific/spaceCard/SpaceCard';
import { createSpaceMainRoute, ROUTES } from '../../../constants/routes';
import useButtonTracking from '../../../hooks/@common/useButtonTracking';
import useUserInfoContext from '../../../hooks/context/userInfoContext';
import useMySpaces from '../../../hooks/domain/space/useMySpaces';
import useSpacesDisplay, {
  type SortType,
} from '../../../hooks/domain/useSpacesDisplay';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { theme } from '../../../styles/theme';
import * as S from './MainPage.styles';

const MainPage = () => {
  const navigate = useNavigate();
  const userInfo = useUserInfoContext();
  const { mySpaces } = useMySpaces();
  const { displaySpaces, changeSortType, sortType } = useSpacesDisplay({
    mySpaces,
  });
  const { trackClick } = useButtonTracking({
    userType: 'host',
  });

  const isSpacesEmpty = displaySpaces.length === 0;

  const sortOptions: DropdownOption[] = [
    { value: 'latest', label: '등록순' },
    { value: 'guestCount', label: '방명록순' },
    { value: 'name', label: '이름순' },
  ];

  const handleCreateSpaceButton = () => {
    trackClick('space_create_button', {
      page: '/host/main',
    });
    navigate(ROUTES.HOST.CREATE_SPACE);
  };

  const handleDropdownChange = (value: string) => {
    trackClick('space_sort_dropdown', {
      page: '/host/main',
      sortType: value,
    });
    changeSortType(value as SortType);
  };

  const handleSpaceCardClick = (spaceCode: string) => {
    trackClick('space_card', {
      page: '/host/main',
      spaceCode,
    });
    navigate(createSpaceMainRoute(spaceCode));
  };

  return (
    <S.Wrapper>
      <S.ProfileContainer>
        <Thumbnail
          src={userInfo?.pictureUrl ?? 'invalid-url'}
          alt={userInfo?.name}
        />
        <S.InfoContainer>
          <S.NameContainer>
            {userInfo?.name}
            <S.EditInfoButton
              onClick={() => navigate(ROUTES.HOST.MY_PAGE)}
              text="내 정보 수정 >"
              variant="fit"
            />
          </S.NameContainer>
        </S.InfoContainer>
      </S.ProfileContainer>
      <S.SpaceContainer>
        <S.DividerContainer>
          <DividerLine width="25%" color={theme.colors.gray04} />
          <S.CreateSpaceButton onClick={handleCreateSpaceButton}>
            <IoAddOutline size={16} />
            스페이스 생성
          </S.CreateSpaceButton>
          <DividerLine width="25%" color={theme.colors.gray04} />
        </S.DividerContainer>
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
            <Dropdown
              options={sortOptions}
              value={sortType}
              onChange={handleDropdownChange}
            />
          </S.FilterContainer>

          {displaySpaces.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              onClick={() => handleSpaceCardClick(space.spaceCode)}
            />
          ))}
        </S.SpaceList>
      </S.SpaceContainer>
    </S.Wrapper>
  );
};

export default MainPage;
