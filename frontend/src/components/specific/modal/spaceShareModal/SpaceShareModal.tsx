import { useRef } from 'react';
import { MdDownload, MdLink } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Kakao from '../../../../@assets/icons/kakaotalk.svg?react';
import { KAKAO_TEMPLATE_ID } from '../../../../constants/constants';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import { useToast } from '../../../../hooks/@common/useToast';
import { theme } from '../../../../styles/theme';
import { copyLinkToClipboard } from '../../../../utils/copyLinkToClipboard';
import { saveImage } from '../../../../utils/saveImage';
import IconButton from '../../../@common/buttons/iconButton/IconButton';
import Modal from '../../../@common/modal/Modal';
import QRCode from '../../../@common/qrCode/QRCode';
import * as S from './SpaceShareModal.styles';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  spaceName?: string;
}

const SpaceShareModal = ({
  isOpen,
  onClose,
  userName,
  spaceName,
}: ShareModalProps) => {
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

  const shareKakao = () => {
    trackClick('space_kakao_share_button');
    const isDev = import.meta.env.VITE_ENVIRONMENT === 'development';
    const link = `guest/${spaceCode}/home`;

    if (!window.Kakao) {
      console.error('Kakao SDK가 로드되지 않았습니다.');
      showToast({
        text: '카카오톡 공유 기능을 사용할 수 없습니다.',
        type: 'error',
      });
      return;
    }

    try {
      window.Kakao.Share.sendCustom({
        templateId: isDev ? KAKAO_TEMPLATE_ID.DEV : KAKAO_TEMPLATE_ID.PROD,
        templateArgs: {
          userName: userName || '사용자',
          spaceName: spaceName || '스페이스',
          link: link,
        },
      });
    } catch (error) {
      console.error('카카오톡 공유 중 오류가 발생했습니다:', error);
      showToast({
        text: '카카오톡 공유에 실패했습니다.',
        type: 'error',
      });
    }
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
            <IconButton
              icon={<Kakao />}
              variant="dark"
              onClick={shareKakao}
              style={{ background: theme.colors.kakaoTalk }}
            />
          </S.ButtonContainer>
        </S.Container>
      </Modal.Content>
    </Modal>
  );
};

export default SpaceShareModal;
