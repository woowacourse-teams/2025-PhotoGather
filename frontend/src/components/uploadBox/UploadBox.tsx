import { ReactComponent as CameraIcon } from '@assets/icons/camera.svg';
import useDrag from '../../hooks/@common/useDrag';
import { theme } from '../../styles/theme';
import * as S from './UploadBox.styles';

interface UploadBoxProps {
  /** 박스 내 들어갈 텍스트 */
  text: string;
  /** 박스 내 아이콘 크기 */
  iconSize?: number;
  /** 파일 선택 시이벤트 핸들러 */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 드롭 이벤트 핸들러 */
  onDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
  /** 업로드 박스 비활성화 여부 */
  disabled: boolean;
}

const UploadBox = ({
  text,
  iconSize = 60,
  onChange,
  onDrop,
  disabled = false,
}: UploadBoxProps) => {
  const {
    isActive,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDrag({ onDrop });

  return (
    <S.Wrapper
      htmlFor="file-input"
      $isActive={isActive}
      onDragEnter={disabled ? undefined : handleDragEnter}
      onDragOver={disabled ? undefined : handleDragOver}
      onDragLeave={disabled ? undefined : handleDragLeave}
      onDrop={disabled ? undefined : handleDrop}
    >
      <S.Container $isActive={isActive}>
        <CameraIcon fill={theme.colors.white} width={iconSize} />
        {text}
      </S.Container>
      <input
        id="file-input"
        type="file"
        multiple
        hidden
        onChange={onChange}
        accept="image/*"
        disabled={disabled}
      />
    </S.Wrapper>
  );
};

export default UploadBox;
