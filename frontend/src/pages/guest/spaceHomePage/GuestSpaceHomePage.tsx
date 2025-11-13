import { useState } from 'react';
import { IoLogoInstagram, IoMailOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/@common/buttons/button/Button';
import IconButton from '../../../components/@common/buttons/iconButton/IconButton';
import Thumbnail from '../../../components/@common/thumbnail/Thumbnail';
import SinglePhotoModal from '../../../components/specific/modal/singlePhotoModal/SinglePhotoModal';
import {
  createCreateGuestbookRoute,
  createGuestGuestbookRoute,
  createGuestWorkDetailRoute,
  ROUTES,
} from '../../../constants/routes';
import useButtonTracking from '../../../hooks/@common/useButtonTracking';
import useSpaceInfoContext from '../../../hooks/context/useSpaceInfoContext';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import { createInstagramUrl } from '../../../utils/createExternalLinks';
import * as MainPageStyles from '../../MainPage.common.styles';
import { mockAccess } from '../../mockData';

const GuestSpaceHomePage = () => {
  const navigate = useNavigate();
  const { spaceCode } = useParams();
  const { spaceInfo, isLoading } = useSpaceInfoContext();
  const { trackClick } = useButtonTracking({
    userType: 'guest',
    spaceCode,
  });
  const [isSpaceImageModalOpen, setIsSpaceImageModalOpen] = useState(false);

  if (isLoading) {
    return <MainPageStyles.Wrapper>로딩 중...</MainPageStyles.Wrapper>;
  }

  const handleInstagramClick = () => {
    trackClick('guest_space_instagram_button');
    window.open(
      createInstagramUrl(spaceInfo.instagramUsername),
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleEmailClick = () => {
    trackClick('guest_space_email_button');
    window.open(`mailto:${spaceInfo.email}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SinglePhotoModal
        isOpen={isSpaceImageModalOpen}
        onClose={() => setIsSpaceImageModalOpen(false)}
        imgSrc={buildThumbnailUrl({
          path: spaceInfo.spacePhoto.path,
          replacePath: 'space',
        })}
      />
      <MainPageStyles.Wrapper>
        <MainPageStyles.ProfileContainer>
          <Thumbnail
            src={buildThumbnailUrl({
              path: spaceInfo.spacePhoto.path,
              replacePath: 'space',
            })}
            onClick={() => setIsSpaceImageModalOpen(true)}
          />
          <MainPageStyles.InfoContainer>
            <MainPageStyles.Name>{spaceInfo.name}</MainPageStyles.Name>
            <MainPageStyles.Introduction>
              {spaceInfo.description}
            </MainPageStyles.Introduction>
          </MainPageStyles.InfoContainer>
        </MainPageStyles.ProfileContainer>
        <MainPageStyles.IconButtonContainer>
          {spaceInfo.instagramUsername && (
            <IconButton
              aria-label="인스타그램"
              icon={<IoLogoInstagram size={24} />}
              variant="default"
              onClick={handleInstagramClick}
              disabled={
                !spaceInfo.instagramUsername ||
                spaceInfo.instagramUsername === ''
              }
            />
          )}
          {spaceInfo.email && (
            <IconButton
              aria-label="이메일"
              icon={<IoMailOutline size={24} />}
              variant="default"
              onClick={handleEmailClick}
              disabled={!spaceInfo.email || spaceInfo.email === ''}
            />
          )}
        </MainPageStyles.IconButtonContainer>
        <DividerLine width="10%" />
        <MainPageStyles.ButtonContainer>
          <Button
            variant="elevated"
            text="작품 소개"
            onClick={() => {
              trackClick('guest_space_work_intro_button');
              navigate(createGuestWorkDetailRoute(spaceCode ?? ''));
            }}
            disabled={!mockAccess.introduce}
          />
          <Button
            variant="elevated"
            text="방명록 작성하기"
            onClick={() => {
              trackClick('guest_space_guestbook_create_button');
              navigate(createCreateGuestbookRoute(spaceCode ?? ''));
            }}
            disabled={!spaceInfo}
          />
          <Button
            variant="elevated"
            text="방명록 구경하기"
            onClick={() => {
              trackClick('guest_space_guestbook_view_button');
              navigate(createGuestGuestbookRoute(spaceCode ?? ''));
            }}
            disabled={!spaceInfo.isPublic}
          />
        </MainPageStyles.ButtonContainer>
        <Button
          variant="tertiary"
          text="Forgather 둘러보기"
          onClick={() => {
            trackClick('guest_space_forgather_explore_button');
            navigate(ROUTES.LANDING);
          }}
        />
        <MainPageStyles.Footer></MainPageStyles.Footer>
      </MainPageStyles.Wrapper>
    </>
  );
};

export default GuestSpaceHomePage;
