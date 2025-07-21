import { useState } from 'react';
import * as S from './UploadBox.styles';

interface UploadBoxProps {
  /** 박스 내 들어갈 텍스트 */
  text: string;
  /** 박스 내 아이콘 크기 */
  iconSize?: number;
  /** 파일 선택 시이벤트 핸들러 */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 드롭 이벤트 핸들러 */
  onDrop?: (event: React.DragEvent<HTMLLabelElement>) => void;
}

const UploadBox = ({
  text,
  iconSize = 100,
  onChange,
  onDrop,
}: UploadBoxProps) => {
  const [isActive, setActive] = useState(false);
  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(true);
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);
    onDrop?.(e);
  };

  return (
    <S.Wrapper
      htmlFor="file-input"
      $active={isActive}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
    >
      <S.Container $active={isActive}>
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
