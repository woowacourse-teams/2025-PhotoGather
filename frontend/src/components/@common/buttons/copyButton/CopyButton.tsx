import { ReactComponent as CopyIcon } from '@assets/icons/clipboard.svg';
import type { CopyButtonVariant } from '../../../../types/buttonTypes';
import { copyLinkToClipboard } from '../../../../utils/copyLinkToClipboard';
import * as S from './CopyButton.styles';

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 복사 버튼 라벨 */
  label: string;
  /** 복사할 문자열 */
  copyText: string;
  /** 복사 버튼 variant */
  variant?: CopyButtonVariant;
  /** 복사 아이콘 표시 여부 */
  showIcon?: boolean;
}
const CopyButton = ({
  label,
  copyText,
  variant = 'filled',
  showIcon = true,
  ...buttonProps
}: CopyButtonProps) => {
  return (
    <S.Wrapper
      {...buttonProps}
      $variant={variant}
      onClick={() => copyLinkToClipboard(copyText)}
    >
      <S.Container>
        {label}
        {showIcon && <CopyIcon />}
      </S.Container>
    </S.Wrapper>
  );
};

export default CopyButton;
