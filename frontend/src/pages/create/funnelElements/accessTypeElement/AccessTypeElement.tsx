import { useState } from 'react';
import BorderButton from '../../../../components/@common/buttons/borderButton/BorderButton';
import AccessTypeIcon from '../../../../components/accessTypeIcon/AccessTypeIcon';
import { INFORMATION } from '../../../../constants/messages';
import { theme } from '../../../../styles/theme';
import type { FunnelElementProps } from '../../../../types/funnel.type';
import type { SpaceAccessType } from '../../../../types/space.type';
import FunnelBasePage from '../../funnel/FunnelBasePage/FunnelBasePage';
import * as S from './AccessTypeElement.styles';

const AccessTypeElement = ({
  onNext,
  initialValue = 'PUBLIC',
}: FunnelElementProps<SpaceAccessType>) => {
  const [accessType, setAccessType] = useState<SpaceAccessType>(initialValue);

  const accessTypeOptions: SpaceAccessType[] = ['PUBLIC', 'PRIVATE'];

  const BorderButtons = accessTypeOptions.map((BorderButtonAccessType) => ({
    heading: {
      text:
        BorderButtonAccessType === 'PUBLIC'
          ? INFORMATION.ACCESS_TYPE.OPTIONS.PUBLIC.TITLE
          : INFORMATION.ACCESS_TYPE.OPTIONS.PRIVATE.TITLE,
      icon: <AccessTypeIcon accessType={BorderButtonAccessType} />,
    },
    description:
      BorderButtonAccessType === 'PUBLIC'
        ? INFORMATION.ACCESS_TYPE.OPTIONS.PUBLIC.DESCRIPTION
        : INFORMATION.ACCESS_TYPE.OPTIONS.PRIVATE.DESCRIPTION,
    onClick: () => setAccessType(BorderButtonAccessType),
    color:
      accessType === BorderButtonAccessType
        ? theme.colors.primary
        : theme.colors.gray03,
  }));

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.ACCESS_TYPE.TITLE.TEXT,
        highlightTextArray: [INFORMATION.ACCESS_TYPE.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.ACCESS_TYPE.DESCRIPTION}
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
      onNextButtonClick={() => onNext(accessType)}
      nextButtonDisabled={!accessType}
    />
  );
};

export default AccessTypeElement;
