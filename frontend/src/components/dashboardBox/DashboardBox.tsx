import * as S from './DashboardBox.styles';

interface DashboardBoxProps {
  /** 박스 내 들어갈 텍스트 */
  title: string;
  /** 박스 내 들어갈 설명 */
  description?: string;
  /** 박스 비활성화 여부 */
  isClosed: boolean;
}

const DashboardBox = ({ title, description, isClosed }: DashboardBoxProps) => {
  return (
    <S.Wrapper $isClosed={isClosed}>
      <S.Title $isClosed={isClosed}>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  );
};

export default DashboardBox;
