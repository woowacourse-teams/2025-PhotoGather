import QRCode from '../../qrCode/QRCode';
import Modal from '../Modal';
import * as S from './ShareModal.styles';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  // TODO : spaceCode를 추가해서 변경 필요
  const copyAddress = `${import.meta.env.DOMAIN}/space/guest-home`;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Content>
        <S.ShareModalContainer>
          <S.ShareModalCommentContainer>
            <S.ShareModalTitle>공유하기</S.ShareModalTitle>
            <S.ShareModalDescription>
              QR코드를 눌러 저장하세요
            </S.ShareModalDescription>
          </S.ShareModalCommentContainer>
          <QRCode address={copyAddress} />
        </S.ShareModalContainer>
      </Modal.Content>
    </Modal>
  );
};

export default ShareModal;
