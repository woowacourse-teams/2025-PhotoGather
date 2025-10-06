import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeProps {
  address: string;
  size?: number;
  bgColor?: string;
}

const QRCode = ({ address, size = 128, bgColor = '#FFFFFF' }: QRCodeProps) => {
  return <QRCodeCanvas value={address} size={size} bgColor={bgColor} />;
};

export default QRCode;
