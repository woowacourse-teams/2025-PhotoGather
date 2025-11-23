import { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { workService } from '../../../apis/services/work/work.service';
import Button from '../../../components/@common/buttons/button/Button';
import VideoPlayer from '../../../components/@common/videoPlayer/VideoPlayer';
import {
  createCreateGuestbookRoute,
  createGuestWorkListRoute,
} from '../../../constants/routes';
import useButtonTracking from '../../../hooks/@common/useButtonTracking';
import { useToast } from '../../../hooks/@common/useToast';
import { DividerLine } from '../../../styles/@common/DividerLine.styles';
import type { WorkDetail } from '../../../types/domain/work.type';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import { buildYoutubeEmbedLink } from '../../../utils/buildYoutubeEmbedLink';
import * as C from '../../WorkDetail.common.styles';
import * as S from './GuestWorkDetail.styles';

const GuestWorkDetail = () => {
  const { spaceCode, workId } = useParams<{
    spaceCode: string;
    workId: string;
  }>();
  const [workDetail, setWorkDetail] = useState<WorkDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { trackClick } = useButtonTracking({
    userType: 'guest',
    spaceCode,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: showToast is stable
  useEffect(() => {
    const fetchWorkDetail = async () => {
      if (!spaceCode || !workId) return;

      try {
        const response = await workService.getWork(spaceCode, workId);

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

  if (!workDetail || !spaceCode) {
    return (
      <S.Wrapper>
        <S.EmptyStateContainer>
          <S.EmptyMessage>아직 작품 소개를 등록하지 않았어요</S.EmptyMessage>
        </S.EmptyStateContainer>
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

  const handleBackMove = () => {
    trackClick('guest_work_detail_back_button');
    navigate(createGuestWorkListRoute(spaceCode));
  };

  return (
    <S.Wrapper>
      <C.WorkContainer>
        <Button
          type="button"
          variant="fit"
          text={
            <>
              <MdArrowBack />
              <p>목록</p>
            </>
          }
          onClick={handleBackMove}
        />
        <C.TitleRowContainer>
          <C.TitleContainer>{title}</C.TitleContainer>
          <C.CategoryContainer>{category}</C.CategoryContainer>
          <C.DesignerContainer>{authorName}</C.DesignerContainer>
        </C.TitleRowContainer>
        <C.DescriptionContainer>{description}</C.DescriptionContainer>
        {isVideoAfterPhoto && videoUrl && (
          <VideoPlayer src={buildYoutubeEmbedLink(videoUrl)} />
        )}
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
        {!isVideoAfterPhoto && videoUrl && (
          <VideoPlayer src={buildYoutubeEmbedLink(videoUrl)} />
        )}
        <S.DividerLineContainer>
          <DividerLine width="60%" />
        </S.DividerLineContainer>
      </C.WorkContainer>
      <S.TextContainer>축하와 응원의 한 마디를 적어주세요</S.TextContainer>
      <Button
        text="방명록 작성하기"
        onClick={() => {
          trackClick('guest_work_detail_guestbook_create_button', {
            page: '/work-detail',
          });
          navigate(createCreateGuestbookRoute(spaceCode));
        }}
      />
    </S.Wrapper>
  );
};

export default GuestWorkDetail;
