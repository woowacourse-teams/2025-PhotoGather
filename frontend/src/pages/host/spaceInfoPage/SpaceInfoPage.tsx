import { useEffect, useState } from 'react';
import { spaceService } from '../../../apis/services/space/space.service';
import Button from '../../../components/@common/buttons/button/Button';
import DeleteModal from '../../../components/@common/modal/deleteModal/DeleteModal';
import Thumbnail from '../../../components/@common/thumbnail/Thumbnail';
import InfoRow from '../../../components/specific/infoRow/InfoRow';
import { useToast } from '../../../hooks/@common/useToast';
import type { SpaceInfo } from '../../../types/domain/space.type';
import { mockSpaceCode } from '../../mockData';
import * as S from './SpaceInfoPage.styles';

const SpaceInfoPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>({
    id: 0,
    spaceCode: '',
    name: '',
    description: '',
    isPublic: false,
    instagramUsername: '',
    email: '',
    spacePhoto: {
      isExists: false,
      path: '',
    },
  });
  const { showToast } = useToast();

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const deleteSpace = () => {
    console.log('삭제 API 연동 + navigate');
    closeDeleteModal();
    showToast({
      text: '스페이스가 삭제되었습니다.',
      type: 'info',
    });
  };

  useEffect(() => {
    const fetchSpaceInfo = async () => {
      const res = await spaceService.getSpaceInfo(mockSpaceCode);
      if (res.success) {
        setSpaceInfo(res.data);
      }
    };
    try {
      fetchSpaceInfo();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <S.Wrapper>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCloseModal={closeDeleteModal}
        onDelete={deleteSpace}
      />
      <S.Title>스페이스 정보</S.Title>
      <Thumbnail src={spaceInfo?.spacePhoto.path ?? null} />
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
      <Button variant="primary" text="수정하기" onClick={() => {}} />
    </S.Wrapper>
  );
};

export default SpaceInfoPage;
