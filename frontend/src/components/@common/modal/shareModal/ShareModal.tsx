import { MdDownload, MdLink } from 'react-icons/md';
import { useToast } from '../../../../hooks/@common/useToast';
import { copyLinkToClipboard } from '../../../../utils/coptLinkToClipboard';
import IconButton from '../../buttons/iconButton/IconButton';
import QRCode from '../../qrCode/QRCode';
import Modal from '../Modal';
import * as S from './ShareModal.styles';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  // TODO : spaceCode를 추가해서 변경 필요
  const copyAddress = `${import.meta.env.VITE_DOMAIN}/space/guest-home`;
  const { showToast } = useToast();
  const copyShareLink = () => {
    copyLinkToClipboard(copyAddress);
    showToast({
      text: '링크가 복사되었습니다.',
      type: 'info',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Content>
        <S.Container>
          <S.CommentContainer>
            <S.Title>공유하기</S.Title>
            <S.Description>QR 저장 또는 링크 복사</S.Description>
          </S.CommentContainer>
          <QRCode address={copyAddress} />
          <S.ButtonContainer>
            <IconButton icon={<MdDownload />} variant="dark" />
            <IconButton
              icon={<MdLink style={{ rotate: '-45deg' }} />}
              variant="dark"
              onClick={copyShareLink}
            />
          </S.ButtonContainer>
        </S.Container>
      </Modal.Content>
    </Modal>
  );
};

export default ShareModal;
