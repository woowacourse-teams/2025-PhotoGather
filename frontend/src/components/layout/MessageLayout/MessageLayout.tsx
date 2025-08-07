import Button from '../../@common/buttons/button/Button';
import HighlightText from '../../@common/highlightText/HighlightText';
import * as S from './MessageLayout.styles';

interface MessageLayoutProps {
  /** 완료 페이지 아이콘 */
  image: string;
  /** 완료 페이지 제목 */
  title: string;
  /** 완료 페이지 설명 */
  description: string;
  /** 완료 페이지 버튼 텍스트 */
  buttonText: string;
  /** 완료 페이지에서 강조할 텍스트 */
  highlightWords: string[];
  /** 버튼 클릭했을 때 실행할 함수*/
  onButtonClick: () => void;
}

const MessageLayout = ({
  image,
  title,
  description,
  buttonText,
  highlightWords,
  onButtonClick,
}: MessageLayoutProps) => {
  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.Icon src={image} alt={title} />
        <S.TextContainer>
          <HighlightText
            text={title}
            fontStyle="header02"
            highlightTextArray={[...highlightWords]}
            highlightColorStyle="primary"
          />
          <S.Description>{description}</S.Description>
        </S.TextContainer>
      </S.ContentWrapper>

      <S.BottomContainer>
        <Button text={buttonText} onClick={onButtonClick} />
      </S.BottomContainer>
    </S.Wrapper>
  );
};

export default MessageLayout;
