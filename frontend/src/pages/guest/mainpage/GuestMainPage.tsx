import { IoLogoInstagram, IoMailOutline } from 'react-icons/io5';
import FooterLogo from '../../../@assets/logo/footer-logo.svg?react';
import Button from '../../../components/@common/buttons/button/Button';
import IconButton from '../../../components/@common/buttons/iconButton/IconButton';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { createInstagramUrl } from '../../../utils/createExternalLinks';
import * as MainPageStyles from '../../MainPage.common.styles';
import { mockAccess, mockData } from '../../mockData';

const GuestMainPage = () => {
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
            window.open(
              createInstagramUrl(mockData.instagramId),
              '_blank',
              'noopener,noreferrer',
            )
          }
        />
        <IconButton
          aria-label="이메일"
          icon={<IoMailOutline />}
          variant="default"
          onClick={() =>
            window.open(
              `mailto:${mockData.email}`,
              '_blank',
              'noopener,noreferrer',
            )
          }
        />
      </MainPageStyles.IconButtonContainer>
      <DividerLine width="10%" />
      <MainPageStyles.ButtonContainer>
        <Button
          variant="elevated"
          text="작품 소개"
          onClick={() => {}}
          disabled={!mockAccess.introduce}
        />
        <Button
          variant="elevated"
          text="방명록 작성하기"
          onClick={() => {}}
          disabled={!mockAccess.writeGuestbook}
        />
        <Button
          variant="elevated"
          text="방명록 구경하기"
          onClick={() => {}}
          disabled={!mockAccess.viewGuestbook}
        />
      </MainPageStyles.ButtonContainer>
      <MainPageStyles.Footer>
        <FooterLogo />
      </MainPageStyles.Footer>
    </MainPageStyles.Wrapper>
  );
};

export default GuestMainPage;
