import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { guestbookService } from '../../../apis/services/guestbook/guestbook.service';
import type { GuestbookCard } from '../../../types/domain/guestbook.type';
import { useToast } from '../../@common/useToast';

interface UseGuestbookCardProps {
  spaceCode: string;
  guestbookCardId: string | number;
}

const useGuestbookCard = ({
  spaceCode,
  guestbookCardId,
}: UseGuestbookCardProps) => {
  const { showToast } = useToast();

  const initialData: GuestbookCard = {
    id: 0,
    nickname: '     ',
    message: '',
    createdAt: '2000-00-00T00:00:00.000Z',
    photos: [],
  };

  const {
    data: guestbookCard,
    isLoading,
    isError,
  } = useQuery({
    initialData,
    queryKey: ['guestbookCard', spaceCode, guestbookCardId],
    queryFn: async () => {
      const res = await guestbookService.getDetail(spaceCode, guestbookCardId);
      if (res.success) {
        return res.data;
      }
      throw new Error('방명록 상세 조회에 실패했습니다');
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: isError 변경 시에만 토스트 띄우기
  useEffect(() => {
    if (isError) {
      showToast({
        text: '방명록 상세 조회에 실패했습니다',
        type: 'error',
      });
    }
  }, [isError]);

  return { guestbookCard, isLoading, isError };
};

export default useGuestbookCard;
