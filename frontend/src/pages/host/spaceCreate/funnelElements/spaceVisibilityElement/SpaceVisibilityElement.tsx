import { useState } from 'react';
import { IoGlobeOutline, IoLockClosedOutline } from 'react-icons/io5';
import BorderButton from '../../../../../components/@common/buttons/borderButton/BorderButton';
import { INFORMATION } from '../../../../../constants/messages';
import useButtonTracking from '../../../../../hooks/@common/useButtonTracking';
import type { FunnelElementProps } from '../../../../../types/funnel.type';
import type { SpaceVisibility } from '../../../../../types/space.type';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';
import * as S from './SpaceVisibilityElement.styles';

const SpaceVisibilityElement = ({
  onNext,
  initialValue = 'PUBLIC',
}: FunnelElementProps<SpaceVisibility>) => {
  const [accessType, setAccessType] = useState<SpaceVisibility>(initialValue);
  const { trackClick } = useButtonTracking({
    userType: 'host',
  });

  const BorderButtons = [
    {
      heading: {
        text: INFORMATION.SPACE_CREATE.VISIBILITY.ACCESS_TYPE.OPTIONS.PUBLIC
          .TITLE,
        icon: <IoGlobeOutline size={16} />,
      },
      description:
        INFORMATION.SPACE_CREATE.VISIBILITY.ACCESS_TYPE.OPTIONS.PUBLIC
          .DESCRIPTION,
      variant: accessType === 'PUBLIC' ? 'selected' : 'unselected',
      onClick: () => {
        trackClick('create_space_public_access_button');
        setAccessType('PUBLIC');
      },
    },
    {
      heading: {
        text: INFORMATION.SPACE_CREATE.VISIBILITY.ACCESS_TYPE.OPTIONS.PRIVATE
          .TITLE,
        icon: <IoLockClosedOutline size={16} />,
      },
      description:
        INFORMATION.SPACE_CREATE.VISIBILITY.ACCESS_TYPE.OPTIONS.PRIVATE
          .DESCRIPTION,
      variant: accessType === 'PRIVATE' ? 'selected' : 'unselected',
      onClick: () => {
        trackClick('create_space_private_access_button');
        setAccessType('PRIVATE');
      },
    },
  ] as const;

  return (
    <FunnelBasePage
      title={INFORMATION.SPACE_CREATE.VISIBILITY.TITLE}
      description={INFORMATION.SPACE_CREATE.VISIBILITY.DESCRIPTION}
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
      onNextButtonClick={() => onNext(accessType)}
      nextButtonDisabled={!accessType}
    />
  );
};

export default SpaceVisibilityElement;
