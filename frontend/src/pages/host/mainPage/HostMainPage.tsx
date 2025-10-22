import { useState } from 'react';
import { IoLogoInstagram, IoShareOutline } from 'react-icons/io5';
import { MdEmail, MdSettings } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/@common/buttons/button/Button';
import IconButton from '../../../components/@common/buttons/iconButton/IconButton';
import Thumbnail from '../../../components/@common/thumbnail/Thumbnail';
import SpaceShareModal from '../../../components/specific/modal/spaceShareModal/SpaceShareModal';
import {
  createGuestbookRoute,
  createSpaceInfoRoute,
  createWorkDetailRoute,
} from '../../../constants/routes';
import useSpaceInfo from '../../../hooks/domain/space/useSpaceInfo';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import { buildOriginalImageUrl } from '../../../utils/buildImageUrl';
import { createInstagramUrl } from '../../../utils/createExternalLinks';
import * as MainPageStyles from '../../MainPage.common.styles';
import * as S from './HostMainPage.styles';

const HostMainPage = () => {
  const navigate = useNavigate();
  const { spaceCode = '' } = useParams();
  const { spaceInfo } = useSpaceInfo({
    spaceCode,
  });

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const openShareModal = () => {
    setIsShareModalOpen(true);
  };
  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <>
      <SpaceShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
      <MainPageStyles.Wrapper>
        <S.ActionButtonContainer>
          <IconButton
            aria-label="스페이스 정보 수정"
            icon={<MdSettings size={12} />}
            variant="default"
            size="small"
            onClick={() => {
              navigate(createSpaceInfoRoute(spaceCode));
            }}
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
          <Thumbnail src={buildOriginalImageUrl(spaceInfo.spacePhoto.path)} />
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
              )
            }
            disabled={
              !spaceInfo.instagramUsername || spaceInfo.instagramUsername === ''
            }
          />
          <IconButton
            aria-label="이메일"
            icon={<MdEmail size={24} />}
            variant="default"
            onClick={() => window.open(`mailto:${spaceInfo.email}`, '_blank')}
            disabled={!spaceInfo.email || spaceInfo.email === ''}
          />
        </MainPageStyles.IconButtonContainer>
        <DividerLine width="10%" />
        <MainPageStyles.ButtonContainer>
          <Button
            variant="elevated"
            text="작품 소개 관리"
            onClick={() => {
              navigate(createWorkDetailRoute(spaceCode));
            }}
          />
          <Button
            variant="elevated"
            text="방명록 관리"
            onClick={() => {
              navigate(createGuestbookRoute(spaceCode));
            }}
          />
        </MainPageStyles.ButtonContainer>
        <MainPageStyles.Footer />
      </MainPageStyles.Wrapper>
    </>
  );
};

export default HostMainPage;
