import * as S from './UploadBox.styles';

interface UploadBoxProps {
  /** 박스 내 들어갈 텍스트 */
  text: string;
  /** 박스 내 아이콘 크기 */
  iconSize?: number;
  /** 파일 선택 시이벤트 핸들러 */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadBox = ({ text, iconSize = 100, onChange }: UploadBoxProps) => {
  return (
    <S.Wrapper htmlFor="file-input">
      <S.Container>
        <S.Icon iconSize={iconSize} />
        {text}
      </S.Container>
      <input id="file-input" type="file" hidden onChange={onChange} />
    </S.Wrapper>
  );
};

export default UploadBox;
