import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { workService } from '../../../apis/services/work/work.service';
import Button from '../../../components/@common/buttons/button/Button';
import DeleteModal from '../../../components/@common/modal/deleteModal/DeleteModal';
import { createWorkEditRoute } from '../../../constants/routes';
import { useToast } from '../../../hooks/@common/useToast';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import type { WorkDetail } from '../../../types/domain/work.type';
import { buildThumbnailUrl } from '../../../utils/buildThumbnailUrl';
import * as C from '../../WorkDetail.common.styles';
import * as S from './HostWorkDetail.styles';

const HostWorkDetail = () => {
  const { spaceCode } = useParams<{ spaceCode: string }>();
  const navigate = useNavigate();
  const [workDetail, setWorkDetail] = useState<WorkDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  // biome-ignore lint/correctness/useExhaustiveDependencies: showToast is stable
  useEffect(() => {
    const fetchWorkDetail = async () => {
      if (!spaceCode) return;

      try {
        const response = await workService.getWork(spaceCode);

        if (response.success) {
          setWorkDetail(response.data);
        } else {
          setWorkDetail(null);
        }
      } catch (error) {
        console.error(error);
        showToast({ text: '작품 정보를 불러오는 데 실패했습니다.' });
        setWorkDetail(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkDetail();
  }, [spaceCode]);

  const handleDeleteWork = async () => {
    if (!spaceCode) return;

    try {
      setIsDeleting(true);
      const response = await workService.deleteWork(spaceCode);

      if (response.success) {
        setIsDeleteModalOpen(false);
        setWorkDetail(null);
      } else {
        console.error(response.error);
        showToast({ text: '작품 삭제에 실패했습니다.' });
      }
    } catch (error) {
      console.error(error);
      showToast({ text: '작품 삭제에 실패했습니다.' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return null;
  }

  if (!workDetail || !spaceCode) {
    return (
      <S.Wrapper>
        <S.EmptyStateContainer>
          <S.EmptyMessage>아직 작품 소개를 등록하지 않았어요</S.EmptyMessage>
        </S.EmptyStateContainer>
        {spaceCode && (
          <S.BottomSectionContainer>
            <Button
              text="등록하기"
              onClick={() => navigate(createWorkEditRoute(spaceCode))}
            />
          </S.BottomSectionContainer>
        )}
      </S.Wrapper>
    );
  }

  const { title, category, authorName, description, photos } = workDetail;

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCloseModal={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteWork}
        buttonDisabled={isDeleting}
      />
      <S.TopButtonContainer>
        <S.EditButton onClick={() => navigate(createWorkEditRoute(spaceCode))}>
          수정
        </S.EditButton>
      </S.TopButtonContainer>
      <S.Wrapper>
        <C.WorkContainer>
          <C.TitleRowContainer>
            <C.TitleContainer>{title}</C.TitleContainer>
            <C.CategoryContainer>{category}</C.CategoryContainer>
          </C.TitleRowContainer>
          <C.DesignerContainer>{authorName}</C.DesignerContainer>
          <C.DescriptionContainer>{description}</C.DescriptionContainer>
          {photos.map((photo, index) => (
            <C.ImageContainer
              key={photo.id}
              src={buildThumbnailUrl({
                path: photo.path,
                replacePath: 'product',
                preset: '800',
              })}
              alt={`work-detail-${index}`}
            />
          ))}
          <DividerLine width="100%" />
        </C.WorkContainer>
        <S.BottomSectionContainer>
          <Button
            text="수정하기"
            onClick={() => navigate(createWorkEditRoute(spaceCode))}
          />
        </S.BottomSectionContainer>
      </S.Wrapper>
    </>
  );
};

export default HostWorkDetail;
