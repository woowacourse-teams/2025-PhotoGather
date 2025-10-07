import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeProps {
  address: string;
  size?: number;
  bgColor?: string;
  ref?: React.RefObject<HTMLCanvasElement | null>;
}

const QRCode = ({
  address,
  size = 128,
  bgColor = '#FFFFFF',
  ref,
}: QRCodeProps) => {
  return (
    <QRCodeCanvas value={address} size={size} bgColor={bgColor} ref={ref} />
  );
};

export default QRCode;
