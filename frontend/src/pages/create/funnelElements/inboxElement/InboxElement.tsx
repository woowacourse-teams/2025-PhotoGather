import { useState } from 'react';
import { CrossedFolderIcon, FolderIcon } from '../../../../@assets/icons';
import BorderButton from '../../../../components/@common/buttons/borderButton/BorderButton';
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
      heading: {
        text: INFORMATION.INBOX.OPTIONS.ENABLE.TITLE,
        icon: <FolderIcon />,
      },
      description: INFORMATION.INBOX.OPTIONS.ENABLE.DESCRIPTION,
      onClick: () => setIsUsingInbox(true),
      color: isUsingInbox === true ? theme.colors.primary : theme.colors.gray03,
    },
    {
      heading: {
        text: INFORMATION.INBOX.OPTIONS.DISABLE.TITLE,
        icon: <CrossedFolderIcon />,
      },
      description: INFORMATION.INBOX.OPTIONS.DISABLE.DESCRIPTION,
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
          {BorderButtons.map(({ heading, description, onClick, color }) => (
            <BorderButton
              key={heading.text}
              heading={heading}
              description={description}
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

export default InboxElement;
