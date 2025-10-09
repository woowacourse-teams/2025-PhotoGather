import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { spaceService } from '../../../apis/services/space/space.service';
import { ROUTES } from '../../../constants/routes';
import { mockSpaceCode } from '../../../pages/mockData';
import { useToast } from '../../@common/useToast';

interface UseSpaceDeleteProps {
  closeDeleteModal: () => void;
}

const useSpaceDelete = ({ closeDeleteModal }: UseSpaceDeleteProps) => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutate: deleteSpace, isPending } = useMutation({
    mutationFn: () => spaceService.deleteSpace(mockSpaceCode),

    onSuccess: (res) => {
      closeDeleteModal();

      if (res.success) {
        showToast({ text: '스페이스가 삭제되었습니다.', type: 'info' });
        navigate(ROUTES.HOST.MAIN);
      } else {
        showToast({ text: '스페이스 삭제에 실패했습니다.', type: 'error' });
      }
    },

    onError: () => {
      closeDeleteModal();
      showToast({ text: '삭제 중 오류가 발생했습니다.', type: 'error' });
    },
  });

  return { deleteSpace, isPending };
};

export default useSpaceDelete;
