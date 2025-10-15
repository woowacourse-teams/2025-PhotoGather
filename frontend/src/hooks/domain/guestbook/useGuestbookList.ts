import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { guestbookService } from '../../../apis/services/guestbook/guestbook.service';
import type {
  GuestbookElement,
  GuestbookListSort,
} from '../../../types/domain/guestbook.type';
import { useToast } from '../../@common/useToast';

interface UseGuestbookListProps {
  spaceCode: string;
  options?: {
    page: number;
    size: number;
    sort?: GuestbookListSort;
  };
}

const useGuestbookList = ({ spaceCode, options }: UseGuestbookListProps) => {
  const { showToast } = useToast();

  const initialData: GuestbookElement[] = [];

  const {
    data: guestbookList,
    isLoading,
    isError,
  } = useQuery({
    initialData,
    queryKey: ['guestbookList', spaceCode],
    queryFn: async () => {
      const res = await guestbookService.getList(spaceCode, options);
      if (res.success) {
        return res.data.guestBookCards;
      }
      throw new Error('방명록 목록 조회에 실패했습니다');
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: isError 변경 시에만 토스트 띄우기
  useEffect(() => {
    if (isError) {
      showToast({
        text: '방명록 목록 조회에 실패했습니다',
        type: 'error',
      });
    }
  }, [isError]);

  return { guestbookList, isLoading, isError };
};

export default useGuestbookList;
