import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import image1 from '../../../@assets/images/example_image.png';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import * as S from './SpaceHome.styles';

const mockSpaceData = {
  name: '8월 버스킹',
  startDate: '2025-08-01',
  participantsCount: 80,
  photosCount: 6,
};

const SpaceHome = () => {
  // TODO :상수 분리 필요
  const template = (participantsCount: number, photosCount: number) =>
    `지금까지 ${participantsCount}명의 게스트가\n ${photosCount}장의 사진을 올렸어요!`;
  const highlightTextArray = [
    `${String(mockSpaceData.participantsCount)}명`,
    `${String(mockSpaceData.photosCount)}장`,
  ];
  const description = template(
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
        <S.CirclePattern $size={166} $position={{ top: -60, right: -50 }} />
        <S.CirclePattern $size={30} $position={{ top: 100, left: 60 }} />
        <S.CirclePattern $size={110} $position={{ top: 100, left: -55 }} />
      </S.InfoContainer>
      <S.ImagesContainer>
        <ImageGrid
          imageUrlList={[
            image1,
            image1,
            image1,
            image1,
            image1,
            image1,
            image1,
            image1,
            image1,
            image1,
            image1,
          ]}
          rowImageAmount={3}
        />
      </S.ImagesContainer>
      <S.ButtonContainer>
        <FloatingActionButton label="모두 저장하기" icon={<SaveIcon />} />
      </S.ButtonContainer>
      <S.ScrollableArea />
    </S.Wrapper>
  );
};

export default SpaceHome;
