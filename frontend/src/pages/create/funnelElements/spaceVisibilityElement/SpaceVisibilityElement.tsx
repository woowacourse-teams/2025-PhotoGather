import { useState } from 'react';
import { IoGlobeOutline, IoLockClosedOutline } from 'react-icons/io5';
import BorderButton from '../../../../components/@common/buttons/borderButton/BorderButton';
import type { FunnelElementProps } from '../../../../types/funnel.type';
import type { SpaceVisibility } from '../../../../types/space.type';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';
import * as S from './SpaceVisibilityElement.styles';

const INFORMATION = {
  ACCESS_TYPE: {
    OPTIONS: {
      PUBLIC: {
        TITLE: '공개',
        DESCRIPTION: '링크만 있으면 누구나 방명록을 볼 수 있어요.',
      },
      PRIVATE: {
        TITLE: '비공개',
        DESCRIPTION: '링크가 있어도 방명록은 나만 볼 수 있어요.',
      },
    },
  },
} as const;

const SpaceVisibilityElement = ({
  onNext,
  initialValue = 'PUBLIC',
}: FunnelElementProps<SpaceVisibility>) => {
  const [accessType, setAccessType] = useState<SpaceVisibility>(initialValue);

  const BorderButtons = [
    {
      heading: {
        text: INFORMATION.ACCESS_TYPE.OPTIONS.PUBLIC.TITLE,
        icon: <IoGlobeOutline size={24} />,
      },
      description: INFORMATION.ACCESS_TYPE.OPTIONS.PUBLIC.DESCRIPTION,
      variant: accessType === 'PUBLIC' ? 'selected' : 'unselected',
      onClick: () => setAccessType('PUBLIC'),
    },
    {
      heading: {
        text: INFORMATION.ACCESS_TYPE.OPTIONS.PRIVATE.TITLE,
        icon: <IoLockClosedOutline size={24} />,
      },
      description: INFORMATION.ACCESS_TYPE.OPTIONS.PRIVATE.DESCRIPTION,
      variant: accessType === 'PRIVATE' ? 'selected' : 'unselected',
      onClick: () => setAccessType('PRIVATE'),
    },
  ] as const;

  return (
    <FunnelBasePage
      title="스페이스 공개 범위를 정해주세요"
      description="공개 범위는 언제든 바꿀 수 있어요."
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
