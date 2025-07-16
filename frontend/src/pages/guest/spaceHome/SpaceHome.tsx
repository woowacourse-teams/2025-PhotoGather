import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import image1 from '../../../@assets/images/example_image.png';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import { spaceHomeInfo } from '../../../constants/messages';
import * as S from './SpaceHome.styles';

const mockSpaceData = {
  name: '8월 버스킹',
  startDate: '2025-08-01',
  participantsCount: 80,
  photosCount: 6,
};

const mockImageList = Array.from({ length: 10 }, () => image1);

// TODO : 배경색에 따른 글자색 변경
const SpaceHome = () => {
  const circlePatternList = [
    { size: 166, position: { top: -60, right: -50 } },
    { size: 40, position: { top: 90, left: 70 } },
    { size: 110, position: { top: 80, left: -55 } },
  ];
  const highlightTextArray = [
    `${String(mockSpaceData.participantsCount)}명`,
    `${String(mockSpaceData.photosCount)}장`,
  ];
  const description = spaceHomeInfo(
    mockSpaceData.participantsCount,
    mockSpaceData.photosCount,
  );
  return (
    <S.Wrapper>
      <S.InfoContainer>
        <S.InfoHeaderContainer>
          <S.TitleSectionContainer>
            <S.Title>{mockSpaceData.name}</S.Title>
            <S.SettingButton>
              <S.SettingIcon />
            </S.SettingButton>
          </S.TitleSectionContainer>
          <S.StartDate>{mockSpaceData.startDate}</S.StartDate>
        </S.InfoHeaderContainer>
        <HighlightText
          text={description}
          highlightTextArray={highlightTextArray}
          fontStyle="header02"
          textColorStyle="white"
          highlightColorStyle="accent"
          textAlign="right"
        />
      </S.InfoContainer>

      <S.ImagesContainer>
        <ImageGrid imageUrlList={mockImageList} rowImageAmount={3} />
      </S.ImagesContainer>

      <S.ButtonContainer>
        <FloatingActionButton label="모두 저장하기" icon={<SaveIcon />} />
      </S.ButtonContainer>

      <S.ScrollableArea />

      {circlePatternList.map(({ size, position }, index) => (
        <S.CirclePattern
          //biome-ignore lint/suspicious/noArrayIndexKey: 배열 인덱스를 키로 사용하는 것이 안전
          key={index}
          $size={size}
          $position={position}
        />
      ))}
    </S.Wrapper>
  );
};

export default SpaceHome;
