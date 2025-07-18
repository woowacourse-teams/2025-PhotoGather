import * as S from './SpaceHeader.styles';

interface SpaceHeaderProps {
  /** 헤더의 제목 */
  title: string;
  /** 헤더의 설명 */
  description?: string;
  /** 헤더 우상단 아이콘 */
  icon?: React.ReactNode;
}

const SpaceHeader = ({ title, description, icon }: SpaceHeaderProps) => {
  return (
    <S.Wrapper>
      <S.TitleIconContainer>
        <S.Title>{title}</S.Title>
        <S.Icon>{icon}</S.Icon>
      </S.TitleIconContainer>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  );
};

export default SpaceHeader;
