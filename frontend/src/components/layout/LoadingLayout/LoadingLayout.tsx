import SparkleLightTrail from '../../../components/@common/sparkleLightTrail/SparkleLightTrail';
import { DEBUG_MESSAGES } from '../../../constants/debugMessages';
import * as C from '../../../styles/@common/BackDrop.styles';
import * as S from './LoadingLayout.styles';

type IconListType = Array<IconProps>;
type DescriptionListType = Array<string>;

interface LoadingLayoutProps {
  /** 로딩 아이콘 리스트 */
  iconList: IconListType;
  /** 로딩 텍스트 리스트 */
  descriptionList: DescriptionListType;
  /** 로딩 퍼센트 */
  percentage: number;
}

interface IconProps {
  src: string;
  alt: string;
}

const LoadingLayout = ({
  iconList,
  descriptionList,
  percentage,
}: LoadingLayoutProps) => {
  if (iconList.length !== descriptionList.length) {
    throw new Error(DEBUG_MESSAGES.INVALID_ICON_LIST_LENGTH);
  }

  const interval = 100 / iconList.length;
  const IconMapping = new Map(iconList.map((icon, index) => [index, icon.src]));
  const textMapping = new Map(
    descriptionList.map((text, index) => [index, text]),
  );
  const currentRange = Math.min(
    Math.floor(percentage / interval),
    iconList.length - 1,
  );

  return (
    <C.BackDrop>
      <S.Container>
        <SparkleLightTrail />
        <S.ContentContainer>
          <S.IconTextContainer>
            <S.Icon src={IconMapping.get(currentRange)} alt={iconList[0].alt} />
            <S.Text>{textMapping.get(currentRange)}</S.Text>
          </S.IconTextContainer>
          <S.Percentage>{percentage}%</S.Percentage>
        </S.ContentContainer>
      </S.Container>
    </C.BackDrop>
  );
};

export default LoadingLayout;
