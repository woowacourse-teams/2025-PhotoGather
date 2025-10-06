import Modal from '../Modal';
import * as S from './ShareModal.styles';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Content>
        <S.ShareModalCommentContainer>
          <S.ShareModalTitle>공유하기</S.ShareModalTitle>
          <S.ShareModalDescription>
            QR코드를 눌러서 저장
          </S.ShareModalDescription>
        </S.ShareModalCommentContainer>
      </Modal.Content>
    </Modal>
  );
};

export default ShareModal;
