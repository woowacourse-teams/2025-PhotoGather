import { theme } from '../../../../../styles/theme';
import FakeImageElement from '../../imageElement/fakeImageElement/FakeImageElement';
import * as S from '../ImageGrid.common.styles';

interface FakeImageGridProps {
  /** 표시할 이미지의 개수 */
  photoLength: number;
  /** 한 줄당 이미지 개수 */
  rowImageAmount: number;
}

const FakeImageGrid = ({ photoLength, rowImageAmount }: FakeImageGridProps) => {
  return (
    <S.Wrapper $rowImageAmount={rowImageAmount}>
      {Array.from({ length: photoLength }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: 가짜 이미지는 index만 가지고 있음
        <FakeImageElement key={index} color={theme.colors.gray03} />
      ))}
    </S.Wrapper>
  );
};

export default FakeImageGrid;
