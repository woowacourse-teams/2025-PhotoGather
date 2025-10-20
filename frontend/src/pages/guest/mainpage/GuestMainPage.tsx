import { IoLogoInstagram, IoMailOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/@common/buttons/button/Button';
import IconButton from '../../../components/@common/buttons/iconButton/IconButton';
import {
  createCreateGuestbookRoute,
  createGuestWorkDetailRoute,
} from '../../../constants/routes';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { createInstagramUrl } from '../../../utils/createExternalLinks';
import * as MainPageStyles from '../../MainPage.common.styles';
import { mockAccess, mockData } from '../../mockData';

const GuestMainPage = () => {
  const navigate = useNavigate();
  const { spaceCode } = useParams();
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
          icon={<IoLogoInstagram size={24} />}
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
          icon={<IoMailOutline size={24} />}
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
          onClick={() => navigate(createGuestWorkDetailRoute(spaceCode ?? ''))}
          disabled={!mockAccess.introduce}
        />
        <Button
          variant="elevated"
          text="방명록 작성하기"
          onClick={() => navigate(createCreateGuestbookRoute(spaceCode ?? ''))}
          disabled={!mockAccess.writeGuestbook}
        />
        <Button
          variant="elevated"
          text="방명록 구경하기"
          // TODO : 게스트용 방명록 페이지 구현 후 연동
          onClick={() => {}}
          disabled={!mockAccess.viewGuestbook}
        />
      </MainPageStyles.ButtonContainer>
      <MainPageStyles.Footer></MainPageStyles.Footer>
    </MainPageStyles.Wrapper>
  );
};

export default GuestMainPage;
