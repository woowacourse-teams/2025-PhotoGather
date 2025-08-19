import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { theme } from '../../styles/theme';
import { track } from '../../utils/googleAnalytics/track';
import * as S from './Footer.styles';

const Footer = () => {
  const navigate = useNavigate();

  const handlePrivacyPolicyClick = () => {
    navigate(ROUTES.POLICY.PRIVACY_POLICY);
    track.button('privacy_policy_link', {
      page: 'footer',
      section: 'footer',
      action: 'navigate_privacy_policy',
    });
  };

  const handleContactClick = () => {
    track.button('contact_link', {
      page: 'footer',
      section: 'footer',
      action: 'contact',
    });
  };

  return (
    <S.Wrapper>
      <S.FooterContent>
        <Logo fill={theme.colors.gray04} />
        <S.FooterLinks>
          <S.FooterLink onClick={handlePrivacyPolicyClick}>
            개인정보처리방침
          </S.FooterLink>
          {/* TODO: 주소 추가 */}
          <S.FooterLink href="주소추가" onClick={handleContactClick}>
            문의하기
          </S.FooterLink>
        </S.FooterLinks>
        <S.Copyright>© 2025 포게더. All rights reserved.</S.Copyright>
      </S.FooterContent>
    </S.Wrapper>
  );
};

export default Footer;
