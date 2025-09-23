import { useState } from 'react';
import { CrossedFolderIcon, FolderIcon } from '../../../../@assets/icons';
import BorderButton from '../../../../components/@common/buttons/borderButton/BorderButton';
import { INFORMATION } from '../../../../constants/messages';
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
      variant: isInboxEnabled === true ? 'selected' : 'unselected',
      onClick: () => setIsInboxEnabled(true),
    },
    {
      heading: {
        text: INFORMATION.INBOX.OPTIONS.DISABLE.TITLE,
        icon: <CrossedFolderIcon />,
      },
      description: INFORMATION.INBOX.OPTIONS.DISABLE.DESCRIPTION,
      variant: isInboxEnabled === false ? 'selected' : 'unselected',
      onClick: () => setIsInboxEnabled(false),
    },
  ] as const;

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.INBOX.TITLE.TEXT,
        highlightTextArray: [INFORMATION.INBOX.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.INBOX.DESCRIPTION}
      element={
        <S.BorderButtonContainer>
          {BorderButtons.map(({ heading, description, variant, onClick }) => (
            <BorderButton
              key={heading.text}
              heading={heading}
              description={description}
              variant={variant}
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
