import Button from '../../@common/buttons/button/Button';
import HighlightText from '../../@common/highlightText/HighlightText';
import * as S from './CompletePage.styles';

interface CompletePageProps {
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
}

const CompletePage = ({
  image,
  title,
  description,
  buttonText,
  highlightWords,
}: CompletePageProps) => {
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
        <Button text={buttonText} onClick={() => console.log(1)} />
      </S.BottomContainer>
    </S.Wrapper>
  );
};

export default CompletePage;
