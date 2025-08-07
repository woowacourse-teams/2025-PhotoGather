import { ReactComponent as CheckIcon } from '@assets/icons/check.svg';
import Button from '../@common/buttons/button/Button';
import * as S from './SpaceHomeTopActionBar.styles';

interface SpaceHomeTopActionBarProps {
  isSelectMode: boolean;
  isAllSelected: boolean;
  toggleSelectMode: () => void;
  toggleAllSelected: () => void;
}

const SpaceHomeTopActionBar = ({
  isSelectMode,
  isAllSelected,
  toggleSelectMode,
  toggleAllSelected,
}: SpaceHomeTopActionBarProps) => {
  return (
    <S.TopActionBar>
      {isSelectMode && (
        <Button
          text="전체 선택"
          onClick={toggleAllSelected}
          variant={isAllSelected ? 'darkRoundedSelected' : 'darkRounded'}
          icon={isAllSelected ? <CheckIcon /> : undefined}
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
