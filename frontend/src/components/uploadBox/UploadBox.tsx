import { useDrag } from '../../hooks/useDrag';
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
}

const UploadBox = ({
  text,
  iconSize = 100,
  onChange,
  onDrop,
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
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <S.Container $isActive={isActive}>
        <S.Icon $iconSize={iconSize} />
        {text}
      </S.Container>
      <input
        id="file-input"
        type="file"
        multiple
        hidden
        onChange={onChange}
        accept="image/*"
      />
    </S.Wrapper>
  );
};

export default UploadBox;
