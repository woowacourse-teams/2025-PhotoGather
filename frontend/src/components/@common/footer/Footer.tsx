import FooterLogo from '../../../@assets/logo/footer-logo.svg?react';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
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
      <DividerLine width="50%" />
      <FooterLogo
        color={mode === 'dark' ? theme.colors.white : theme.colors.gray06}
      />
      <S.FooterContent $mode={mode}>
        <S.Copyright $mode={mode}>
          © 2025 Forgather. All rights reserved.
        </S.Copyright>
        <S.ContactLink
          href="https://pf.kakao.com/_rHNtn"
          target="_blank"
          rel="noopener noreferrer"
          $mode={mode}
        >
          문의하기
        </S.ContactLink>
      </S.FooterContent>
    </S.Footer>
  );
};

export default Footer;
