import type { HTMLAttributes } from 'react';
import * as S from './DashboardBox.styles';

interface DashboardBoxProps extends HTMLAttributes<HTMLDivElement> {
  /** 박스 내 들어갈 텍스트 */
  title: string;
  /** 박스 내 들어갈 설명 */
  description?: string;
}

const DashboardBox = ({
  title,
  description,
  ...restProps
}: DashboardBoxProps) => {
  return (
    <S.Wrapper {...restProps}>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  );
};

export default DashboardBox;
