import type { HTMLAttributes } from 'react';
import * as S from './DashboardBox.styles';

interface DashboardBoxProps extends HTMLAttributes<HTMLDivElement> {
  /** 박스 내 들어갈 텍스트 */
  title: string;
  /** 박스 내 들어갈 설명 */
  description?: string;
  /** 박스 비활성화 여부 */
  isClosed: boolean;
}

const DashboardBox = ({ 
  title, 
  description, 
  isClosed, 
  ...restProps 
}: DashboardBoxProps) => {
  return (
    <S.Wrapper $isClosed={isClosed} {...restProps}>
      <S.Title $isClosed={isClosed}>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  );
};

export default DashboardBox;
