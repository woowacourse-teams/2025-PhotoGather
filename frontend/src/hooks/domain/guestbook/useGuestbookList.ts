import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { guestbookService } from '../../../apis/services/guestbook/guestbook.service';
import { CONSTRAINTS } from '../../../constants/constraints';
import { useToast } from '../../@common/useToast';

const useGuestbookList = (spaceCode: string) => {
  const { showToast } = useToast();

  const fetchGuestbookListByPage = async (page: number) => {
    const res = await guestbookService.getList(spaceCode, {
      page,
      size: CONSTRAINTS.GUESTBOOK_PAGINATION_UNIT,
    });
    if (res.success) {
      return res.data;
    }
    throw new Error('방명록 목록 조회에 실패했습니다');
  };

  const { data, fetchNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['guestbookList', spaceCode],
    queryFn: ({ pageParam }) => fetchGuestbookListByPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastGuestbookList) => lastGuestbookList.currentPage + 1,
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

  const guestbookList =
    data?.pages.flatMap((page) => page.guestBookCards ?? []) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  return { guestbookList, totalCount, isLoading, isError, fetchNextPage };
};

export default useGuestbookList;
