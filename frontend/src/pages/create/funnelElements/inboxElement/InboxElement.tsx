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
  const [isInboxEnabled, setIsInboxEnabled] = useState(initialValue);

  const BorderButtons = [
    {
      heading: {
        text: INFORMATION.INBOX.OPTIONS.ENABLE.TITLE,
        icon: <FolderIcon />,
      },
      description: INFORMATION.INBOX.OPTIONS.ENABLE.DESCRIPTION,
      color:
        isInboxEnabled === true ? theme.colors.primary : theme.colors.gray03,
      onClick: () => setIsInboxEnabled(true),
    },
    {
      heading: {
        text: INFORMATION.INBOX.OPTIONS.DISABLE.TITLE,
        icon: <CrossedFolderIcon />,
      },
      description: INFORMATION.INBOX.OPTIONS.DISABLE.DESCRIPTION,
      color:
        isInboxEnabled === false ? theme.colors.primary : theme.colors.gray03,
      onClick: () => setIsInboxEnabled(false),
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
          {BorderButtons.map(({ heading, description, color, onClick }) => (
            <BorderButton
              key={heading.text}
              heading={heading}
              description={description}
              color={color}
              onClick={onClick}
            />
          ))}
        </S.BorderButtonContainer>
      }
      onNextButtonClick={() => onNext(isInboxEnabled)}
    />
  );
};

export default InboxElement;
