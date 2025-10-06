import { MdWarning } from 'react-icons/md';
import { useToast } from '../../../../hooks/@common/useToast';
import Button from '../../buttons/button/Button';
import Modal from '../Modal';
import * as S from './DeleteModal.styles';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteModal = ({ isOpen, onClose }: DeleteModalProps) => {
  const { showToast } = useToast();
  const deleteSpace = () => {
    console.log('삭제 API 연동 + navigate');
    onClose();
    showToast({
      text: '스페이스가 삭제되었습니다.',
      type: 'info',
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Content>
        <S.DeleteModalContainer>
          <MdWarning />
          <S.DeleteModalMessageContainer>
            <S.DeleteConfirmComment>
              정말 삭제하시겠습니까?
            </S.DeleteConfirmComment>
            <S.DeleteConfirmDescription>
              삭제 후에는 복구할 수 없습니다.
            </S.DeleteConfirmDescription>
          </S.DeleteModalMessageContainer>
          <S.ButtonContainer>
            <Button variant="secondary" text="취소" onClick={onClose} />
            <Button variant="danger" text="삭제" onClick={deleteSpace} />
          </S.ButtonContainer>
        </S.DeleteModalContainer>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteModal;
