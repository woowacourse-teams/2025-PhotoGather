import { useEffect, useRef } from 'react';
import { MdDownload, MdLink } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import CompleteImage from '../../../@assets/images/space-create.png';
import Button from '../../../components/@common/buttons/button/Button';
import IconButton from '../../../components/@common/buttons/iconButton/IconButton';
import QRCode from '../../../components/@common/qrCode/QRCode';
import { createSpaceMainRoute, ROUTES } from '../../../constants/routes';
import useButtonTracking from '../../../hooks/@common/useButtonTracking';
import useConfetti from '../../../hooks/@common/useConfetti';
import { useToast } from '../../../hooks/@common/useToast';
import { copyLinkToClipboard } from '../../../utils/copyLinkToClipboard';
import { saveImage } from '../../../utils/saveImage';
import * as S from './SharePage.styles';

const SharePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { canvasRef, canvasStyles } = useConfetti();
  const { spaceCode } = location.state || {};
  const { showToast } = useToast();
  const qrCodeRef = useRef<HTMLCanvasElement>(null);
  const { trackClick } = useButtonTracking({ userType: 'host', spaceCode });

  useEffect(() => {
    if (!location.state) {
      navigate(ROUTES.LANDING);
    }
  }, [location, navigate]);

  const copyAddress = `${import.meta.env.VITE_DOMAIN}/guest/${spaceCode}/main`;

  const handleSpaceMainButton = () => {
    trackClick('space_create_share_move_to_space_main', {
      page: '/space/create/share',
      spaceCode,
    });
    const spaceMainRoute = createSpaceMainRoute(spaceCode);
    navigate(spaceMainRoute);
  };

  const copyShareLink = () => {
    copyLinkToClipboard(copyAddress);
    trackClick('space_create_share_copy_link', {
      page: '/space/create/share',
      spaceCode,
    });
    showToast({
      text: '링크가 복사되었습니다.',
      type: 'info',
    });
  };

  const saveQRCodeImage = async () => {
    const canvas = qrCodeRef.current;
    if (!canvas) return;

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png'),
    );
    if (!blob) return;
    trackClick('space_create_share_download_qr_code', {
      page: '/space/create/share',
      spaceCode,
    });
    saveImage(blob, 'qrcode_share.png');
  };

  return (
    <>
      <canvas ref={canvasRef} style={canvasStyles} />

      <S.Wrapper>
        <S.TopContainer>
          <S.Image src={CompleteImage} alt="링크 이미지" />
          <S.TextContainer>
            <S.Title>스페이스 생성이 완료됐어요</S.Title>
          </S.TextContainer>
        </S.TopContainer>
        <S.BottomContainer>
          <S.ShareContainer>
            <QRCode address={copyAddress} ref={qrCodeRef} />
            <S.ShareLabel>스페이스 링크를 공유해 보세요.</S.ShareLabel>
            <S.IconLabelButtonContainer>
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
            </S.IconLabelButtonContainer>
          </S.ShareContainer>
          <Button text="나의 스페이스로 이동" onClick={handleSpaceMainButton} />
        </S.BottomContainer>
      </S.Wrapper>
    </>
  );
};

export default SharePage;
