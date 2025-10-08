import { IoLogoInstagram } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import FooterLogo from '../../../@assets/logo/footer-logo.svg?react';
import Button from '../../../components/@common/buttons/button/Button';
import IconButton from '../../../components/@common/buttons/iconButton/IconButton';
import Footer from '../../../components/@common/footer/Footer';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { createInstagramUrl } from '../../../utils/createExternalLinks';
import * as MainPageStyles from '../../MainPage.common.styles';
import { mockData } from '../../mockData';

const HostMainPage = () => {
  return (
    <MainPageStyles.Wrapper>
      <MainPageStyles.ProfileContainer>
        <MainPageStyles.Thumbnail src={mockData.thumbnail} />
        <MainPageStyles.InfoContainer>
          <MainPageStyles.Name>{mockData.title}</MainPageStyles.Name>
          <MainPageStyles.Introduction>
            {mockData.introduction}
          </MainPageStyles.Introduction>
        </MainPageStyles.InfoContainer>
      </MainPageStyles.ProfileContainer>
      <MainPageStyles.IconButtonContainer>
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
      </MainPageStyles.IconButtonContainer>
      <DividerLine width="10%" />
      <MainPageStyles.ButtonContainer>
        <Button variant="elevated" text="작품 소개 관리" onClick={() => {}} />
        <Button variant="elevated" text="방명록 관리" onClick={() => {}} />
      </MainPageStyles.ButtonContainer>
      <MainPageStyles.Footer>
        <FooterLogo />
      </MainPageStyles.Footer>
    </MainPageStyles.Wrapper>
  );
};

export default HostMainPage;
