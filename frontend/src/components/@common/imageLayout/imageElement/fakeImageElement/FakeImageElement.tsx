import { theme } from '../../../../../styles/theme';
import * as C from '../ImageElement.common.styles';
import * as S from './FakeImageElement.styles';

interface FakeImageElementProps {
  /** 사진의 색깔 */
  color?: string;
  /** 사진의 ratio */
  ratio?: number;
  /** 사진 하나의 너비 */
  width?: string;
}

const FakeImageElement = ({
  color = theme.colors.gray02,
  ratio = 1,
  width = '100%',
}: FakeImageElementProps) => {
  return (
    <C.Wrapper tabIndex={0} $ratio={ratio} $width={width}>
      <S.FakeImage $color={color} />
    </C.Wrapper>
  );
};

export default FakeImageElement;
