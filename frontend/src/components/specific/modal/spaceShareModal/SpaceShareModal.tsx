import { useRef } from 'react';
import { MdDownload, MdLink } from 'react-icons/md';
import useImageDownload from '../../../../hooks/@common/useImageDownload';
import { useToast } from '../../../../hooks/@common/useToast';
import { copyLinkToClipboard } from '../../../../utils/coptLinkToClipboard';
import IconButton from '../../../@common/buttons/iconButton/IconButton';
import Modal from '../../../@common/modal/Modal';
import QRCode from '../../../@common/qrCode/QRCode';
import * as S from './SpaceShareModal.styles';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpaceShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const { showToast } = useToast();
  const qrCodeRef = useRef<HTMLCanvasElement>(null);
  const { saveImage } = useImageDownload();
  const copyAddress = `${import.meta.env.VITE_DOMAIN}/guest/main`;

  const saveQRCodeImage = async () => {
    const canvas = qrCodeRef.current;
    if (!canvas) return;

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png'),
    );
    if (!blob) return;
    saveImage(blob, 'qrcode_share.png');
  };

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
          <QRCode address={copyAddress} ref={qrCodeRef} />
          <S.ButtonContainer>
            <IconButton
              icon={<MdDownload />}
              variant="dark"
              onClick={saveQRCodeImage}
            />
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

export default SpaceShareModal;
