import { useRef } from 'react';
import { MdDownload, MdLink } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import { useToast } from '../../../../hooks/@common/useToast';
import { copyLinkToClipboard } from '../../../../utils/copyLinkToClipboard';
import { saveImage } from '../../../../utils/saveImage';
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
  const { spaceCode } = useParams();
  const { trackClick } = useButtonTracking({
    userType: 'host',
    spaceCode,
  });

  const copyAddress = `${import.meta.env.VITE_DOMAIN}/guest/${spaceCode}/home`;

  const saveQRCodeImage = async () => {
    trackClick('space_qr_code_download_button');
    const canvas = qrCodeRef.current;
    if (!canvas) return;

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png'),
    );
    if (!blob) return;
    saveImage(blob, 'qrcode_share.png');
  };

  const copyShareLink = () => {
    trackClick('space_link_copy_button');
    copyLinkToClipboard(copyAddress);
    showToast({
      text: '링크가 복사되었습니다.',
      type: 'info',
    });
  };

  const handleOnClose = () => {
    trackClick('space_share_modal_close_button');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
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
              icon={<MdDownload size={24} />}
              variant="dark"
              onClick={saveQRCodeImage}
            />
            <IconButton
              icon={<MdLink style={{ rotate: '-45deg' }} size={24} />}
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
