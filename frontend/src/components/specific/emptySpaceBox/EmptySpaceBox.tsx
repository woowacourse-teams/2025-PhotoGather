import { GiftImg as GiftIcon } from '../../../@assets/images';
import { INFORMATION } from '../../../constants/messages';
import * as S from './EmptySpaceBox.styles';

const EmptySpaceBox = () => {
  return (
    <S.NoImageContainer>
      <S.GiftIconImage src={GiftIcon} />
      <S.NoImageText>{INFORMATION.NO_IMAGE}</S.NoImageText>
    </S.NoImageContainer>
  );
};

export default EmptySpaceBox;
