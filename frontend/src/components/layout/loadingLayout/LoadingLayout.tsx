import useScrollLock from '../../../hooks/@common/useScrollLock';
import * as C from '../../../styles/@common/BackDrop.styles';
import LinearProgressBar from '../../specific/progressBar/linear/LinearProgressBar';
import * as S from './LoadingLayout.styles';

interface LoadingLayoutProps {
  /** 로딩 컨텐츠 */
  loadingContents: {
    /** 로딩 아이콘 리스트 */
    icon: IconProps;
    /** 로딩 텍스트 리스트 */
    description: string;
  }[];
  /** 현재 진행된 양 */
  currentAmount: number;
  /** 전체 진행해야 할 양 */
  totalAmount: number;
}

interface IconProps {
  src: string;
  alt: string;
}

const LoadingLayout = ({
  loadingContents,
  currentAmount,
  totalAmount,
}: LoadingLayoutProps) => {
  useScrollLock();
  const progress =
    totalAmount > 0 ? Math.min(currentAmount / totalAmount, 1) : 0;
  const percentage = Math.round(progress * 100);

  const currentRange = Math.min(
    Math.floor(progress * loadingContents.length),
    loadingContents.length - 1,
  );
  const currentContent = loadingContents[currentRange];

  return (
    <C.BackDrop>
      <S.Container>
        <S.ContentContainer>
          <S.IconTextContainer>
            <S.Icon
              src={currentContent.icon.src}
              alt={currentContent.icon.alt}
            />
            <S.Text>{currentContent.description}</S.Text>
          </S.IconTextContainer>
          <S.Percentage>{percentage}%</S.Percentage>
          <LinearProgressBar percentage={percentage} />
        </S.ContentContainer>
      </S.Container>
    </C.BackDrop>
  );
};

export default LoadingLayout;
