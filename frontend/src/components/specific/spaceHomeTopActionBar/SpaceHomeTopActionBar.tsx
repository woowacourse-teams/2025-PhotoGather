import { CheckIcon } from '../../../@assets/icons';
import Button from '../../@common/buttons/button/Button';
import * as S from './SpaceHomeTopActionBar.styles';

interface SpaceHomeTopActionBarProps {
  isSelectMode: boolean;
  isAllSelected: boolean;
  onToggleSelectMode: () => void;
  onToggleAllSelected: () => void;
}

const SpaceHomeTopActionBar = ({
  isSelectMode,
  isAllSelected,
  onToggleSelectMode,
  onToggleAllSelected,
}: SpaceHomeTopActionBarProps) => {
  return (
    <S.TopActionBar>
      {isSelectMode && (
        <Button
          text="전체 선택"
          onClick={onToggleAllSelected}
          variant={isAllSelected ? 'darkRoundedSelected' : 'darkRounded'}
          icon={isAllSelected ? <CheckIcon width={16} /> : undefined}
        />
      )}
      <Button
        text={isSelectMode ? '취소' : '선택'}
        onClick={onToggleSelectMode}
        variant="darkRounded"
      />
    </S.TopActionBar>
  );
};

export default SpaceHomeTopActionBar;
