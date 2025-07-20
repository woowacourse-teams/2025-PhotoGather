import * as S from './UploadBox.styles';

interface UploadBoxProps {
  /** 박스 내 들어갈 텍스트 */
  text: string;
  /** 박스 내 아이콘 크기 */
  iconSize?: number;
}

const UploadBox = ({ text, iconSize = 100 }: UploadBoxProps) => {
  return (
    <S.Wrapper>
      <S.Icon iconSize={iconSize} />
      {text}
    </S.Wrapper>
  );
};

export default UploadBox;
