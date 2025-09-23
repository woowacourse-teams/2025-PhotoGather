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

  const BorderButtons = accessTypeOptions.map((BorderButtonAccessType) => {
    const option = INFORMATION.ACCESS_TYPE.OPTIONS[BorderButtonAccessType];

    return {
      heading: {
        text: option.TITLE,
        icon: <AccessTypeIcon accessType={BorderButtonAccessType} />,
      },
      description: option.DESCRIPTION,
      color:
        accessType === BorderButtonAccessType
          ? theme.colors.primary
          : theme.colors.gray03,
      onClick: () => setAccessType(BorderButtonAccessType),
    };
  });

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.ACCESS_TYPE.TITLE.TEXT,
        highlightTextArray: [INFORMATION.ACCESS_TYPE.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.ACCESS_TYPE.DESCRIPTION}
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
      onNextButtonClick={() => onNext(accessType)}
      nextButtonDisabled={!accessType}
    />
  );
};

export default AccessTypeElement;
