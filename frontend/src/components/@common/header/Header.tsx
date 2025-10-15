import LogoSvg from '../../../@assets/logo/logo.svg?react';
import type { HeaderMode } from '../../../types/uiMode.type';
import * as S from './Header.styles';

interface IconItem {
  icon: React.ReactNode;
  onClick?: () => void;
}

interface HeaderProps {
  /** 헤더 모드 (light/dark) */
  mode?: HeaderMode;
  /** 오른쪽에 표시할 아이콘 버튼들 */
  icons?: IconItem[];
  /** 로고 클릭 핸들러 */
  onLogoClick?: () => void;
}

const Header = ({ mode = 'light', icons = [], onLogoClick }: HeaderProps) => {
  return (
    <S.HeaderContainer $mode={mode}>
      <S.Logo $mode={mode} onClick={onLogoClick}>
        <LogoSvg />
      </S.Logo>
      {icons.length > 0 && (
        <S.IconsContainer>
          {icons.map((item, index) => (
            <S.IconButton
              // biome-ignore lint/suspicious/noArrayIndexKey: index is used as a key
              key={`header-icon-${index}`}
              $mode={mode}
              type="button"
              onClick={item.onClick}
            >
              {item.icon}
            </S.IconButton>
          ))}
        </S.IconsContainer>
      )}
    </S.HeaderContainer>
  );
};

export default Header;
