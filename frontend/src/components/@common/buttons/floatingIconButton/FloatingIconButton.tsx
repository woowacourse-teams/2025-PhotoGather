import { ReactComponent as UpwardArrow } from '@assets/icons/upwardArrow.svg';
import { theme } from '../../../../styles/theme';
import * as S from './FloatingIconButton.styles';

interface FloatingIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 클릭했을 때 실행할 함수*/
  onClick: () => void;
}

const FloatingIconButton = ({
  onClick,
  ...buttonProps
}: FloatingIconButtonProps) => {
  return (
    <S.Wrapper onClick={onClick} {...buttonProps}>
      <UpwardArrow fill={theme.colors.gray03} />
    </S.Wrapper>
  );
};

export default FloatingIconButton;
