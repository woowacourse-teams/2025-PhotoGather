import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { workService } from '../../../apis/services/work/work.service';
import Button from '../../../components/@common/buttons/button/Button';
import WorkCard from '../../../components/specific/workCard/WorkCard';
import {
  createCreateGuestbookRoute,
  createGuestWorkDetailRoute,
} from '../../../constants/routes';
import useButtonTracking from '../../../hooks/@common/useButtonTracking';
import { useToast } from '../../../hooks/@common/useToast';
import type { WorkSummary } from '../../../types/domain/work.type';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import { buildYoutubeThumbnail } from '../../../utils/buildYoutubeThumbnail';
import { checkIsYoutube } from '../../../utils/checkIsYoutube';
import * as S from './GuestWorkListPage.styles';

const GuestWorkListPage = () => {
  const { spaceCode } = useParams<{ spaceCode: string }>();
  const { showToast } = useToast();
  const { trackClick } = useButtonTracking({ userType: 'guest', spaceCode });
  const navigate = useNavigate();

  const { data: works = [], isLoading } = useQuery<WorkSummary[]>({
    queryKey: ['guestWorks', spaceCode],
    enabled: !!spaceCode,
    queryFn: async () => {
      if (!spaceCode) return [];

      const response = await workService.getWorks(spaceCode);

      if (!response.success) {
        showToast({ text: '작품 목록을 불러오지 못했어요.', type: 'error' });
        throw new Error(response.error.message);
      }

      return response.data.products;
    },
  });

  const handleWorkCardClick = (workId: string) => {
    if (!spaceCode) return;

    trackClick('guest_work_list_work_card', {
      workId,
    });

    navigate(createGuestWorkDetailRoute(spaceCode, workId));
  };

  const handleNavigateToGuestbook = () => {
    trackClick('guest_work_detail_guestbook_create_button', {
      page: '/work-list',
    });
    if (!spaceCode) return;
    navigate(createCreateGuestbookRoute(spaceCode));
  };

  const createWorkCardThumbnailUrl = (imgUrl: string, videoUrl: string) => {
    if (imgUrl)
      return buildThumbnailUrl({
        path: imgUrl,
        replacePath: 'product',
        preset: '800',
      });
    if (videoUrl && checkIsYoutube(videoUrl)) {
      return buildYoutubeThumbnail(videoUrl);
    }
    return '';
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>작품 목록</S.Title>
        <S.Description>등록한 작품 정보를 한눈에 확인하세요.</S.Description>
      </S.Header>
      <S.WorkCardsContainer>
        {isLoading && (
          <S.StateMessage>작품 목록을 불러오는 중입니다.</S.StateMessage>
        )}
        {!isLoading && works.length === 0 && (
          <S.StateMessage>등록한 작품이 아직 없어요.</S.StateMessage>
        )}
        {!isLoading &&
          works.map((work) => {
            return (
              <WorkCard
                key={work.id}
                title={work.title}
                category={work.category}
                thumbnailUrl={createWorkCardThumbnailUrl(
                  work.firstPhoto?.path || '',
                  work.videoUrl || '',
                )}
                onClick={() => handleWorkCardClick(work.id.toString())}
              />
            );
          })}
      </S.WorkCardsContainer>
      <S.BottomSectionContainer>
        <Button text="방명록 작성하기" onClick={handleNavigateToGuestbook} />
      </S.BottomSectionContainer>
    </S.Wrapper>
  );
};

export default GuestWorkListPage;
