import Button from '../@common/buttons/button/Button';
import * as S from './SpaceHomeTopActionBar.styles';

interface SpaceHomeTopActionBarProps {
  isSelectMode: boolean;
  toggleSelectMode: () => void;
}

const SpaceHomeTopActionBar = ({
  isSelectMode,
  toggleSelectMode,
}: SpaceHomeTopActionBarProps) => {
  return (
    <S.TopActionBar>
      <Button
        text={isSelectMode ? '취소' : '선택'}
        onClick={toggleSelectMode}
        variant="darkRounded"
      />
    </S.TopActionBar>
  );
};

export default SpaceHomeTopActionBar;
