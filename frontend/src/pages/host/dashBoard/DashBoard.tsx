import { useState } from 'react';
import Button from '../../../components/@common/buttons/button/Button';
import DeleteModal from '../../../components/@common/modal/deleteModal/DeleteModal';
import InfoRow from '../../../components/host/infoRow/InfoRow';
import { mockDashboardData } from '../../mockData';
import { Thumbnail } from '../Host.common.styles';
import * as S from './Dashboard.styles';

const Dashboard = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <S.Wrapper>
      <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
      <S.Title>스페이스 정보</S.Title>
      <Thumbnail src={mockDashboardData.thumbnail} />
      <S.InfoRowContainer>
        <InfoRow label="스페이스 이름" value={mockDashboardData.title} />
        <InfoRow
          label="방명록 공개 범위"
          value={mockDashboardData.publicRange}
        />
        <InfoRow label="스페이스 설명" value={mockDashboardData.introduction} />
        <InfoRow label="E-mail" value={mockDashboardData.email} />
        <InfoRow label="Instagram" value={mockDashboardData.instagramId} />
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

export default Dashboard;
