import { ReactComponent as CameraIcon } from '@assets/icons/camera.svg';
import * as S from './UploadBox.styles';

interface UploadBoxProps {
  /**박스 내 들어갈 텍스트 */
  text: string;
}

const UploadBox = ({ text }: UploadBoxProps) => {
  return (
    <S.Wrapper>
      <CameraIcon />
      {text}
    </S.Wrapper>
  );
};

export default UploadBox;
