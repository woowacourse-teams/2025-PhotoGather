import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/@common/buttons/button/Button';
import DeleteModal from '../../../components/@common/modal/deleteModal/DeleteModal';
import Thumbnail from '../../../components/@common/thumbnail/Thumbnail';
import InfoRow from '../../../components/specific/infoRow/InfoRow';
import { createSpaceInfoEditRoute } from '../../../constants/routes';
import useSpaceDelete from '../../../hooks/domain/space/useSpaceDelete';
import useSpaceInfo from '../../../hooks/domain/space/useSpaceInfo';
import { buildImageUrl } from '../../../utils/buildImageUrl';
import * as S from './SpaceInfoPage.styles';

const SpaceInfoPage = () => {
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const { spaceCode } = useParams();
  const { deleteSpace, isPending } = useSpaceDelete({
    closeDeleteModal,
    spaceCode: spaceCode ?? '',
  });
  const { spaceInfo } = useSpaceInfo({
    spaceCode: spaceCode ?? '',
  });

  console.log(spaceInfo);

  return (
    <S.Wrapper>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCloseModal={closeDeleteModal}
        onDelete={deleteSpace}
        buttonDisabled={isPending}
      />
      <S.Title>스페이스 정보</S.Title>
      <Thumbnail src={buildImageUrl(spaceInfo.spacePhoto.path)} />
      <S.InfoRowContainer>
        <InfoRow label="스페이스 이름" value={spaceInfo.name} />
        <InfoRow
          label="방명록 공개 범위"
          value={spaceInfo.isPublic ? '공개' : '비공개'}
        />
        <InfoRow label="스페이스 설명" value={spaceInfo.description} />
        <InfoRow label="E-mail" value={spaceInfo.email} />
        <InfoRow label="Instagram" value={spaceInfo.instagramUsername} />
      </S.InfoRowContainer>

      <S.DeleteButtonContainer>
        <Button
          variant="error"
          text="스페이스 삭제"
          onClick={openDeleteModal}
        />
      </S.DeleteButtonContainer>
      <Button
        variant="fixed"
        text="수정하기"
        onClick={() => navigate(createSpaceInfoEditRoute(spaceCode ?? ''))}
      />
    </S.Wrapper>
  );
};

export default SpaceInfoPage;
