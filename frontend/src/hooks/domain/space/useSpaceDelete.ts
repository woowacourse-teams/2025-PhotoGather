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

  const deleteSpace = async () => {
    const res = await spaceService.deleteSpace(mockSpaceCode);
    closeDeleteModal();

    if (res.success) {
      showToast({
        text: '스페이스가 삭제되었습니다.',
        type: 'info',
      });
      navigate(ROUTES.HOST.MAIN);
      return;
    }
    showToast({
      text: '스페이스 삭제에 실패했습니다.',
      type: 'error',
    });
  };

  return { deleteSpace };
};

export default useSpaceDelete;
