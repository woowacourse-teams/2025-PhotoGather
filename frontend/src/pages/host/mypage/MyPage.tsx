import { IoAddOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Dropdown, {
  type DropdownOption,
} from '../../../components/@common/dropdown/Dropdown';
import Thumbnail from '../../../components/@common/thumbnail/Thumbnail';
import SpaceCard from '../../../components/specific/spaceCard/SpaceCard';
import { ROUTES } from '../../../constants/routes';
import useSpacesDisplay from '../../../hooks/domain/useSpacesDisplay';
import { MyPageMockData, SpaceMockData } from '../../mockData';
import * as S from './MyPage.styles';

const MyPage = () => {
  const navigate = useNavigate();

  const { displaySpaces, changeSortType, sortType } = useSpacesDisplay({
    mySpaces: SpaceMockData.spaces,
  });

  const isSpacesEmpty = displaySpaces.length === 0;

  const sortOptions: DropdownOption[] = [
    { value: 'latest', label: '등록순' },
    { value: 'guestCount', label: '방명록순' },
  ];

  return (
    <S.Wrapper>
      <S.ProfileContainer>
        <Thumbnail src={MyPageMockData.img} alt={MyPageMockData.name} />
        <S.InfoContainer>
          <S.NameContainer>{MyPageMockData.name}</S.NameContainer>
        </S.InfoContainer>
      </S.ProfileContainer>
      <S.CreateSpaceButton onClick={() => navigate(ROUTES.HOST.CREATE_SPACE)}>
        <IoAddOutline size={16} />
        스페이스 생성
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
            <Dropdown
              options={sortOptions}
              value={sortType}
              onChange={(value) =>
                changeSortType(value as 'latest' | 'guestCount')
              }
            />
          </S.FilterContainer>

          {displaySpaces.map((space) => (
            <SpaceCard
              key={space.id}
              space={space}
              onClick={() => navigate('')}
            />
          ))}
        </S.SpaceList>
      </S.SpaceContainer>
    </S.Wrapper>
  );
};

export default MyPage;
