import SparkleLightTrail from '../../../components/@common/sparkleLightTrail/SparkleLightTrail';
import * as C from '../../../styles/@common/Overlay.styles';
import * as S from './LoadingLayout.styles';

interface LoadingLayoutProps {
  /** 로딩 컨텐츠 */
  loadingContents: {
    /** 로딩 아이콘 리스트 */
    icon: IconProps;
    /** 로딩 텍스트 리스트 */
    description: string;
  }[];
  /** 로딩 퍼센트 */
  percentage: number;
}

interface IconProps {
  src: string;
  alt: string;
}


const LoadingLayout = ({ loadingContents, percentage }: LoadingLayoutProps) => {
  const interval = 100 / loadingContents.length;

  const loadingContentMapping = new Map(
    loadingContents.map(({ icon, description }, index) => [
      index,
      { icon, description },
    ]),
  );

  const currentRange = Math.min(
    Math.floor(percentage / interval),
    loadingContents.length - 1,
  );

  return (
   <C.BackDrop>
      <S.Container>
        <SparkleLightTrail />
        <S.ContentContainer>
          <S.IconTextContainer>
            <S.Icon
              src={loadingContentMapping.get(currentRange)?.icon.src}
              alt={loadingContentMapping.get(currentRange)?.icon.alt}
            />
            <S.Text>
              {loadingContentMapping.get(currentRange)?.description}
            </S.Text>
          </S.IconTextContainer>
          <S.Percentage>{percentage}%</S.Percentage>
        </S.ContentContainer>
      </S.Container>
    </C.BackDrop>
  );
};

export default LoadingLayout;
