import { IoLogoInstagram } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import FooterLogo from '../../../@assets/footer-logo.svg?react';
import Button from '../../../components/@common/buttons/button/Button';
import IconButton from '../../../components/@common/buttons/iconButton/IconButton';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { createInstagramUrl } from '../../../utils/createExternalLinks';
import { mockData } from '../../mockData';
import * as C from '../Host.common.styles';
import * as S from './HostMainPage.styles';

const HostMainPage = () => {
  return (
    <S.Wrapper>
      <S.ProfileContainer>
        <C.Thumbnail src={mockData.thumbnail} />
        <S.InfoContainer>
          <S.Name>{mockData.title}</S.Name>
          <S.Introduction>{mockData.introduction}</S.Introduction>
        </S.InfoContainer>
      </S.ProfileContainer>
      <S.IconButtonContainer>
        <IconButton
          aria-label="인스타그램"
          icon={<IoLogoInstagram />}
          variant="default"
          onClick={() =>
            window.open(createInstagramUrl(mockData.instagramId), '_blank')
          }
        />
        <IconButton
          aria-label="이메일"
          icon={<MdEmail />}
          variant="default"
          onClick={() => window.open(`mailto:${mockData.email}`, '_blank')}
        />
      </S.IconButtonContainer>
      <DividerLine width="10%" />
      <S.ButtonContainer>
        <Button variant="elevated" text="작품 소개 관리" onClick={() => {}} />
        <Button variant="elevated" text="방명록 관리" onClick={() => {}} />
      </S.ButtonContainer>
      <S.Footer>
        <FooterLogo />
      </S.Footer>
    </S.Wrapper>
  );
};

export default HostMainPage;
