import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { workService } from '../../../apis/services/work/work.service';
import Button from '../../../components/@common/buttons/button/Button';
import VideoPlayer from '../../../components/@common/videoPlayer/VideoPlayer';
import { createWorkEditRoute } from '../../../constants/routes';
import useButtonTracking from '../../../hooks/@common/useButtonTracking';
import { useToast } from '../../../hooks/@common/useToast';
import type { WorkDetail } from '../../../types/domain/work.type';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import { buildYoutubeEmbedLink } from '../../../utils/buildYoutubeEmbedLink';
import * as C from '../../WorkDetail.common.styles';
import * as S from './HostWorkDetail.styles';

const HostWorkDetail = () => {
  const { spaceCode } = useParams<{ spaceCode: string }>();
  const navigate = useNavigate();
  const [workDetail, setWorkDetail] = useState<WorkDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const { trackClick } = useButtonTracking({ userType: 'host', spaceCode });

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

  if (isLoading) {
    return null;
  }

  const handleCreateWorkButtonClick = () => {
    trackClick('host_work_detail_create_click');
    if (!spaceCode) return;
    navigate(createWorkEditRoute(spaceCode));
  };

  const handleEditWorkButtonClick = () => {
    trackClick('host_work_detail_edit_click');
    if (!spaceCode) return;
    navigate(createWorkEditRoute(spaceCode));
  };

  if (!workDetail || !spaceCode) {
    return (
      <S.Wrapper>
        <S.EmptyStateContainer>
          <S.EmptyMessage>아직 작품 소개를 등록하지 않았어요</S.EmptyMessage>
        </S.EmptyStateContainer>
        {spaceCode && (
          <S.BottomSectionContainer>
            <Button text="등록하기" onClick={handleCreateWorkButtonClick} />
          </S.BottomSectionContainer>
        )}
      </S.Wrapper>
    );
  }

  const {
    title,
    category,
    authorName,
    description,
    photos,
    videoUrl,
    isVideoAfterPhoto,
  } = workDetail;

  return (
    <S.Wrapper>
      <C.WorkContainer>
        <C.TitleRowContainer>
          <S.TopButtonContainer>
            <C.TitleContainer>{title}</C.TitleContainer>
            <S.EditButton onClick={handleEditWorkButtonClick}>
              수정
            </S.EditButton>
          </S.TopButtonContainer>
          <C.CategoryContainer>{category}</C.CategoryContainer>
          <C.DesignerContainer>{authorName}</C.DesignerContainer>
        </C.TitleRowContainer>
        <C.DescriptionContainer>{description}</C.DescriptionContainer>
        <C.MediaContainer isVideoAfterPhoto={isVideoAfterPhoto}>
          {videoUrl && <VideoPlayer src={buildYoutubeEmbedLink(videoUrl)} />}
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
        </C.MediaContainer>
      </C.WorkContainer>
    </S.Wrapper>
  );
};

export default HostWorkDetail;
