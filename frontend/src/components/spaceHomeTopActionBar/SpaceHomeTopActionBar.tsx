import { ReactComponent as CheckIcon } from '@assets/icons/check.svg';
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
      {isSelectMode && (
        <Button
          text="전체"
          onClick={toggleSelectMode}
          variant="darkRounded"
          icon={<CheckIcon />}
        />
      )}
      <Button
        text={isSelectMode ? '취소' : '선택'}
        onClick={toggleSelectMode}
        variant="darkRounded"
      />
    </S.TopActionBar>
  );
};

export default SpaceHomeTopActionBar;
