import type { IconAction } from '../../../types/route.type';
import type { HeaderMode } from '../../../types/uiMode.type';
import * as S from './Header.styles';

interface HeaderProps {
  /** 헤더 모드 (light/dark) */
  mode?: HeaderMode;
  /** 왼쪽 아이콘 및 동작 */
  leftIcon: IconAction;
  /** 오른쪽 아이콘 및 동작 */
  rightIcon: IconAction & { disabled?: boolean };
}

const Header = ({ mode = 'light', leftIcon, rightIcon }: HeaderProps) => {
  return (
    <S.HeaderContainer $mode={mode}>
      {leftIcon.icon && (
        <S.IconsContainer>
          <S.Logo $mode={mode} onClick={leftIcon.onClick}>
            {leftIcon.icon}
          </S.Logo>
        </S.IconsContainer>
      )}
      {rightIcon.icon && !rightIcon.disabled && (
        <S.IconsContainer>
          <S.IconButton $mode={mode} type="button" onClick={rightIcon.onClick}>
            {rightIcon.icon}
          </S.IconButton>
        </S.IconsContainer>
      )}
    </S.HeaderContainer>
  );
};

export default Header;
