import type { ReactNode } from 'react';
import * as C from '../../../styles/@common/BackDrop.styles';
import * as S from './StatusLayout.styles';

interface StatusBackdropProps {
  /** 아이콘 이미지 정보 */
  image: {
    src: string;
    alt: string;
  };
  /** 이미지 밑에 넣을 요소 */
  element: ReactNode;
}

const StatusLayout = ({ image, element }: StatusBackdropProps) => {
  return (
    <C.BackDrop>
      <S.Wrapper>
        <S.Icon src={image.src} alt={image.alt} />
        {element}
      </S.Wrapper>
    </C.BackDrop>
  );
};

export default StatusLayout;
