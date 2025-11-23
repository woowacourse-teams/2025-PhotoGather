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
    trackClick('guest_work_list_guestbook_create_button', {
      page: '/work-list',
    });
    if (!spaceCode) return;
    navigate(createCreateGuestbookRoute(spaceCode));
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>작품 목록</S.Title>
        <S.Description>
          작품을 선택하면 상세 정보를 확인할 수 있습니다
        </S.Description>
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
                firstPhotoPath={work.firstPhoto?.path}
                videoUrl={work.videoUrl}
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
