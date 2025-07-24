import * as S from './ScrollableBlurArea.styles';

interface ScrollableBlurAreaProps {
  isAtPageBottom: boolean;
}

const ScrollableBlurArea = ({ isAtPageBottom }: ScrollableBlurAreaProps) => {
  return <S.BottomBlurArea $isHide={isAtPageBottom} />;
};

export default ScrollableBlurArea;
