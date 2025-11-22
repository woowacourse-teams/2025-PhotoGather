import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { workService } from '../../../apis/services/work/work.service';
import Button from '../../../components/@common/buttons/button/Button';
import WorkCard from '../../../components/specific/workCard/WorkCard';
import { createWorkDetailRoute } from '../../../constants/routes';
import useButtonTracking from '../../../hooks/@common/useButtonTracking';
import { useToast } from '../../../hooks/@common/useToast';
import type { WorkSummary } from '../../../types/domain/work.type';
import { buildThumbnailUrl } from '../../../utils/buildImageUrl';
import * as S from './WorkListPage.styles';

const WorkListPage = () => {
  const { spaceCode } = useParams<{ spaceCode: string }>();
  const { showToast } = useToast();
  const { trackClick } = useButtonTracking({ userType: 'host', spaceCode });
  const navigate = useNavigate();

  const { data: works = [], isLoading } = useQuery<WorkSummary[]>({
    queryKey: ['hostWorks', spaceCode],
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

  const canAddMoreWorks = works.length < 3;

  const handleWorkCardClick = (workId: number) => {
    if (!spaceCode) return;

    trackClick('host_work_list_work_card', {
      workId,
    });

    navigate(createWorkDetailRoute(spaceCode, workId));
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
            const thumbnailUrl = work.firstPhoto?.path
              ? buildThumbnailUrl({
                  path: work.firstPhoto.path,
                  replacePath: 'product',
                  preset: '800',
                })
              : undefined;

            return (
              <WorkCard
                key={work.id}
                title={work.title}
                category={work.category}
                thumbnailUrl={thumbnailUrl}
                onClick={() => handleWorkCardClick(work.id)}
              />
            );
          })}
      </S.WorkCardsContainer>
      <S.BottomSectionContainer>
        <Button
          text="작품 추가하기"
          onClick={() => {}}
          disabled={!canAddMoreWorks}
        />
      </S.BottomSectionContainer>
    </S.Wrapper>
  );
};

export default WorkListPage;
