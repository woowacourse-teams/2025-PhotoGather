import FooterLogo from '../../../@assets/logo/footer-logo.svg?react';
import { theme } from '../../../styles/theme';
import type { FooterMode } from '../../../types/uiMode.type';
import * as S from './Footer.styles';

interface FooterProps {
  /** 푸터 모드 (light/dark) */
  mode?: FooterMode;
}

const Footer = ({ mode = 'light' }: FooterProps) => {
  return (
    <S.Footer $mode={mode}>
      <FooterLogo
        color={mode === 'dark' ? theme.colors.white : theme.colors.gray06}
      />
    </S.Footer>
  );
};

export default Footer;
