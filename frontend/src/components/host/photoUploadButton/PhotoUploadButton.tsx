import { useId } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import useDrag from '../../../hooks/@common/useDrag';
import * as S from './PhotoUploadButton.styles';

interface PhotoUploadButtonProps {
  /** 박스 내 들어갈 텍스트 */
  mainText: string;
  /** 용량 안내 텍스트 */
  uploadLimitText?: string;
  /** 박스 내 아이콘 크기 */
  iconSize?: number;
  /** 파일 선택 시이벤트 핸들러 */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 드롭 이벤트 핸들러 */
  onDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
  /** 업로드 박스 비활성화 여부 */
  disabled: boolean;
}

const PhotoUploadButton = ({
  mainText,
  uploadLimitText,
  iconSize = 60,
  onChange,
  onDrop,
  disabled = false,
}: PhotoUploadButtonProps) => {
  const {
    isActive,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDrag({ onDrop });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    event.target.value = '';
  };

  const inputId = useId();

  return (
    <S.Wrapper
      htmlFor={inputId}
      $isActive={isActive || !disabled}
      onDragEnter={disabled ? undefined : handleDragEnter}
      onDragOver={disabled ? undefined : handleDragOver}
      onDragLeave={disabled ? undefined : handleDragLeave}
      onDrop={disabled ? undefined : handleDrop}
    >
      <S.Container $isActive={isActive}>
        <IoCameraOutline size={iconSize} />
        {mainText}
        <S.LimitTextContainer>{uploadLimitText}</S.LimitTextContainer>
      </S.Container>
      <input
        id={inputId}
        type="file"
        multiple
        hidden
        onChange={handleChange}
        accept="image/*"
        disabled={disabled}
      />
    </S.Wrapper>
  );
};

export default PhotoUploadButton;
