import { useState } from 'react';
import BorderButton from '../../../../components/@common/buttons/borderButton/BorderButton';
import { INFORMATION } from '../../../../constants/messages';
import { theme } from '../../../../styles/theme';
import type { FunnelElementProps } from '../../../../types/funnel.type';
import type { SpacePublicType } from '../../../../types/space.type';
import FunnelBasePage from '../../funnel/FunnelBasePage/FunnelBasePage';

const PublicTypeElement = ({
  onNext,
  initialValue = 'PUBLIC',
}: FunnelElementProps<SpacePublicType>) => {
  const [publicType, setPublicType] = useState<SpacePublicType>(initialValue);

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.PUBLIC_OR_NOT.TITLE.TEXT,
        highlightTextArray: [INFORMATION.PUBLIC_OR_NOT.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.PUBLIC_OR_NOT.DESCRIPTION}
      element={
        <>
          <BorderButton
            onClick={() => {
              setPublicType('PUBLIC');
            }}
            element={<p>공개</p>}
            color={
              publicType === 'PUBLIC'
                ? theme.colors.primary
                : theme.colors.gray03
            }
          />
          <BorderButton
            onClick={() => {
              setPublicType('PRIVATE');
            }}
            element={<p>비공개</p>}
            color={
              publicType === 'PRIVATE'
                ? theme.colors.primary
                : theme.colors.gray03
            }
          />
        </>
      }
      onNextButtonClick={() => onNext(publicType)}
      nextButtonDisabled={!publicType}
    />
  );
};

export default PublicTypeElement;
