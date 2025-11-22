import { useEffect, useState } from 'react';
import {
  IoLogoInstagram,
  IoMailOutline,
  IoShareOutline,
} from 'react-icons/io5';
import { MdSettings } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/@common/buttons/button/Button';
import IconButton from '../../../components/@common/buttons/iconButton/IconButton';
import Thumbnail from '../../../components/@common/thumbnail/Thumbnail';
import EventModal from '../../../components/specific/modal/eventModadl/EventModal';
import SinglePhotoModal from '../../../components/specific/modal/singlePhotoModal/SinglePhotoModal';
import SpaceShareModal from '../../../components/specific/modal/spaceShareModal/SpaceShareModal';
import {
  createGuestbookRoute,
  createSpaceInfoRoute,
  createWorkListRoute,
} from '../../../constants/routes';
import useButtonTracking from '../../../hooks/@common/useButtonTracking';
import useUserInfoContext from '../../../hooks/context/userInfoContext';
import useSpaceInfoContext from '../../../hooks/context/useSpaceInfoContext';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import { canOpenEventModal } from '../../../utils/canOpenEventModal';
import { createInstagramUrl } from '../../../utils/createExternalLinks';
import * as MainPageStyles from '../../MainPage.common.styles';
import * as S from './HostSpaceHomePage.styles';

const HostSpaceHomePage = () => {
  const navigate = useNavigate();
  const { spaceCode = '' } = useParams();
  const { spaceInfo } = useSpaceInfoContext();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSpaceImageModalOpen, setIsSpaceImageModalOpen] = useState(false);
  const userInfo = useUserInfoContext();

  useEffect(() => {
    setIsEventModalOpen(canOpenEventModal());
  }, []);

  const { trackClick } = useButtonTracking({
    userType: 'host',
    spaceCode,
  });

  const openShareModal = () => {
    trackClick('open_space_share_modal');
    setIsShareModalOpen(true);
  };
  const closeShareModal = () => {
    trackClick('close_space_share_modal');
    setIsShareModalOpen(false);
  };

  const handleSpaceInfoClick = () => {
    trackClick('host_space_info_button');
    navigate(createSpaceInfoRoute(spaceCode));
  };

  const onInstagramClick = () => {
    trackClick('host_space_instagram_button');
    window.open(createInstagramUrl(spaceInfo.instagramUsername), '_blank');
  };

  const onEmailClick = () => {
    trackClick('host_space_email_button');
    window.open(`mailto:${spaceInfo.email}`, '_blank');
  };

  const handleWorkListButtonClick = () => {
    trackClick('host_space_work_list_button');
    navigate(createWorkListRoute(spaceCode));
  };

  const handleGuestbookClick = () => {
    trackClick('host_space_guestbook_button');
    navigate(createGuestbookRoute(spaceCode));
  };

  const handleCloseEventModal = () => {
    trackClick('close_event_modal');
    setIsEventModalOpen(false);
  };

  return (
    <>
      <EventModal
        isOpen={isEventModalOpen}
        onClose={handleCloseEventModal}
        spaceCode={spaceCode}
      />
      <SpaceShareModal
        isOpen={isShareModalOpen}
        onClose={closeShareModal}
        userName={userInfo.name}
        spaceName={spaceInfo.name}
      />
      <SinglePhotoModal
        isOpen={isSpaceImageModalOpen}
        onClose={() => setIsSpaceImageModalOpen(false)}
        imgSrc={buildThumbnailUrl({
          path: spaceInfo.spacePhoto.path,
          replacePath: 'space',
        })}
      />
      <MainPageStyles.Wrapper>
        <S.ActionButtonContainer>
          <IconButton
            aria-label="스페이스 정보"
            icon={<MdSettings size={12} />}
            variant="default"
            size="small"
            onClick={handleSpaceInfoClick}
          />
          <IconButton
            aria-label="스페이스 공유"
            icon={<IoShareOutline size={12} />}
            size="small"
            variant="default"
            onClick={openShareModal}
          />
        </S.ActionButtonContainer>
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
              onClick={onInstagramClick}
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
              onClick={onEmailClick}
              disabled={!spaceInfo.email || spaceInfo.email === ''}
            />
          )}
        </MainPageStyles.IconButtonContainer>
        <DividerLine width="10%" />
        <MainPageStyles.ButtonContainer>
          <Button
            variant="elevated"
            text="작품 목록 관리"
            onClick={handleWorkListButtonClick}
          />
          <Button
            variant="elevated"
            text="방명록 관리"
            onClick={handleGuestbookClick}
          />
        </MainPageStyles.ButtonContainer>
        <MainPageStyles.Footer />
      </MainPageStyles.Wrapper>
    </>
  );
};

export default HostSpaceHomePage;
