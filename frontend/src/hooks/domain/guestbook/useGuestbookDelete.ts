import { useMutation } from '@tanstack/react-query';
import { guestbookService } from '../../../apis/services/guestbook/guestbook.service';
import { queryClient } from '../../../main';
import { useToast } from '../../@common/useToast';

const useGuestbookDelete = (
  spaceCode: string,
  guestbookCardId: number | string,
) => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: () => guestbookService.deleteCard(spaceCode, guestbookCardId),
    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
      showToast({
        text: '방명록 삭제에 실패했습니다',
        type: 'error',
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['guestbookList', spaceCode],
      });

      showToast({
        text: '방명록이 성공적으로 삭제되었습니다',
        type: 'info',
      });
    },
  });
};

export default useGuestbookDelete;
