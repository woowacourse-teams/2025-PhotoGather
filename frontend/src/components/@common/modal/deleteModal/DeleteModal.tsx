import { MdWarning } from 'react-icons/md';
import Button from '../../buttons/button/Button';
import Modal from '../Modal';
import * as S from './DeleteModal.styles';

interface DeleteModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  onDelete: () => void;
  buttonDisabled: boolean;
}

const DeleteModal = ({
  isOpen,
  onCloseModal,
  onDelete,
  buttonDisabled,
}: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
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
            <Button variant="secondary" text="취소" onClick={onCloseModal} />
            <Button
              variant="danger"
              text="삭제"
              onClick={onDelete}
              disabled={buttonDisabled}
            />
          </S.ButtonContainer>
        </S.DeleteModalContainer>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteModal;
