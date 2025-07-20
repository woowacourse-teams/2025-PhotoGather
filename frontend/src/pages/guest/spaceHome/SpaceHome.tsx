import { ReactComponent as SaveIcon } from '../../../@assets/icons/download.svg';
import { ReactComponent as SettingSvg } from '../../../@assets/icons/setting.svg';
import FloatingActionButton from '../../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import ImageGrid from '../../../components/@common/imageGrid/ImageGrid';
import SpaceHeader from '../../../components/spaceHeader/SpaceHeader';
import { theme } from '../../../styles/theme';
import { mockImageList, mockSpaceData } from './mockSpaceData';
import * as S from './SpaceHome.styles';

const SpaceHome = () => {
  return (
    <S.Wrapper>
      <S.InfoContainer>
        <SpaceHeader
          title={mockSpaceData.name}
          description={mockSpaceData.startDate}
          icon={
            <SettingSvg fill={theme.colors.white} width="24px" height="24px" />
          }
        />
      </S.InfoContainer>

      <ImageGrid imageUrlList={mockImageList} rowImageAmount={3} />

      <S.ButtonContainer>
        <FloatingActionButton label="모두 저장하기" icon={<SaveIcon />} />
      </S.ButtonContainer>

      <S.ScrollableArea />
    </S.Wrapper>
  );
};

export default SpaceHome;
