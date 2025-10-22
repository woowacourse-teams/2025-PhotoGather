import { IoLogoInstagram, IoMailOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import defaultImage from '../../../@assets/images/default-forgather-image.png';
import Button from '../../../components/@common/buttons/button/Button';
import IconButton from '../../../components/@common/buttons/iconButton/IconButton';
import {
  createCreateGuestbookRoute,
  createGuestGuestbookRoute,
  createGuestWorkDetailRoute,
  ROUTES,
} from '../../../constants/routes';
import useSpaceInfoContext from '../../../hooks/context/useSpaceInfoContext';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { buildOriginalImageUrl } from '../../../utils/buildImageUrl';
import { createInstagramUrl } from '../../../utils/createExternalLinks';
import { createImageErrorHandler } from '../../../utils/createImageErrorHandler';
import * as MainPageStyles from '../../MainPage.common.styles';
import { mockAccess } from '../../mockData';

const GuestMainPage = () => {
  const navigate = useNavigate();
  const { spaceCode } = useParams();
  const { spaceInfo, isLoading } = useSpaceInfoContext();

  if (isLoading) {
    return <MainPageStyles.Wrapper>로딩 중...</MainPageStyles.Wrapper>;
  }

  const thumbnailUrl = spaceInfo.spacePhoto.isExists
    ? buildOriginalImageUrl(spaceInfo.spacePhoto.path)
    : 'invalid-url';

  return (
    <MainPageStyles.Wrapper>
      <MainPageStyles.ProfileContainer>
        <MainPageStyles.Thumbnail
          src={thumbnailUrl}
          alt={spaceInfo.name}
          onError={createImageErrorHandler(defaultImage)}
        />
        <MainPageStyles.InfoContainer>
          <MainPageStyles.Name>{spaceInfo.name}</MainPageStyles.Name>
          <MainPageStyles.Introduction>
            {spaceInfo.description}
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
              createInstagramUrl(spaceInfo.instagramUsername),
              '_blank',
              'noopener,noreferrer',
            )
          }
          disabled={
            !spaceInfo.instagramUsername || spaceInfo.instagramUsername === ''
          }
        />
        <IconButton
          aria-label="이메일"
          icon={<IoMailOutline size={24} />}
          variant="default"
          onClick={() =>
            window.open(
              `mailto:${spaceInfo.email}`,
              '_blank',
              'noopener,noreferrer',
            )
          }
          disabled={!spaceInfo.email || spaceInfo.email === ''}
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
          disabled={!spaceInfo}
        />
        <Button
          variant="elevated"
          text="방명록 구경하기"
          onClick={() => navigate(createGuestGuestbookRoute(spaceCode ?? ''))}
          disabled={!spaceInfo.isPublic}
        />
      </MainPageStyles.ButtonContainer>
      <Button
        variant="tertiary"
        text="Forgather 둘러보기"
        onClick={() => navigate(ROUTES.LANDING)}
      />
      <MainPageStyles.Footer></MainPageStyles.Footer>
    </MainPageStyles.Wrapper>
  );
};

export default GuestMainPage;
