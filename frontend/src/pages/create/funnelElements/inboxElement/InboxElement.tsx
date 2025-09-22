import { useState } from 'react';
import { CrossedFolderIcon, FolderIcon } from '../../../../@assets/icons';
import { INFORMATION } from '../../../../constants/messages';
import { theme } from '../../../../styles/theme';
import type { FunnelElementProps } from '../../../../types/funnel.type';
import FunnelBasePage from '../../funnel/FunnelBasePage/FunnelBasePage';
import * as S from './InboxElement.styles';

const InboxElement = ({
  onNext,
  initialValue = true,
}: FunnelElementProps<boolean>) => {
  const [isUsingInbox, setIsUsingInbox] = useState(initialValue);

  const BorderButtons = [
    {
      variant: true,
      onClick: () => setIsUsingInbox(true),
      color: isUsingInbox === true ? theme.colors.primary : theme.colors.gray03,
    },
    {
      variant: false,
      onClick: () => setIsUsingInbox(false),
      color:
        isUsingInbox === false ? theme.colors.primary : theme.colors.gray03,
    },
  ];

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.INBOX.TITLE.TEXT,
        highlightTextArray: [INFORMATION.INBOX.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.INBOX.DESCRIPTION}
      element={
        <S.BorderButtonContainer>
          {BorderButtons.map(({ variant, onClick, color }) => (
            <InboxBorderButton
              key={`Inbox${String(variant)}`}
              variant={variant}
              onClick={onClick}
              color={color}
            />
          ))}
        </S.BorderButtonContainer>
      }
      onNextButtonClick={() => onNext(isUsingInbox)}
    />
  );
};

interface InboxBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: boolean;
  /** 테두리 버튼 요소의 색깔 */
  color?: string;
  /** 테두리 버튼 내부 요소 */
  element?: React.ReactNode;
  /** 버튼 클릭했을 때 실행할 함수*/
  onClick: () => void;
  /** 버튼 활성화 여부*/
  disabled?: boolean;
}

const InboxBorderButton = ({
  variant,
  color = theme.colors.gray03,
  onClick,
  disabled,
  ...buttonProps
}: InboxBorderButtonProps) => {
  const title =
    variant === true
      ? INFORMATION.INBOX.OPTIONS.ENABLE.TITLE
      : INFORMATION.INBOX.OPTIONS.DISABLE.TITLE;
  const description =
    variant === true
      ? INFORMATION.INBOX.OPTIONS.ENABLE.DESCRIPTION
      : INFORMATION.INBOX.OPTIONS.DISABLE.DESCRIPTION;

  return (
    <S.ButtonWrapper
      {...buttonProps}
      $color={color}
      onClick={onClick}
      disabled={disabled}
    >
      <S.ContentContainer>
        <S.TitleContainer>
          <S.Title>{title}</S.Title>
          {variant === true ? (
            <FolderIcon fill={color} />
          ) : (
            <CrossedFolderIcon fill={color} />
          )}
        </S.TitleContainer>
        <S.Description>{description}</S.Description>
      </S.ContentContainer>
    </S.ButtonWrapper>
  );
};

export default InboxElement;
