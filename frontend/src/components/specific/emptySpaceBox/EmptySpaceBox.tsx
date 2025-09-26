import { GiftImg as GiftIcon } from '../../../@assets/images';
import { INFORMATION } from '../../../constants/messages';
import * as S from './EmptySpaceBox.styles';

const EmptySpaceBox = () => {
  return (
    <S.EmptySpaceContainer>
      <S.GiftIconImage src={GiftIcon} />
      <S.EmptySpaceText>{INFORMATION.NO_IMAGE}</S.EmptySpaceText>
    </S.EmptySpaceContainer>
  );
};

export default EmptySpaceBox;
