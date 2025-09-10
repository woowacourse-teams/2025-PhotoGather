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

  const BorderButtons = (['PUBLIC', 'PRIVATE'] as const).map(
    (BorderButtonPublicType) => ({
      variant: BorderButtonPublicType,
      onClick: () => setPublicType(BorderButtonPublicType),
      element: (
        <PublicTypeBorderButtonContent variant={BorderButtonPublicType} />
      ),
      color:
        publicType === BorderButtonPublicType
          ? theme.colors.primary
          : theme.colors.gray03,
    }),
  );

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.PUBLIC_OR_NOT.TITLE.TEXT,
        highlightTextArray: [INFORMATION.PUBLIC_OR_NOT.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.PUBLIC_OR_NOT.DESCRIPTION}
      element={BorderButtons.map(({ variant, onClick, element, color }) => (
        <BorderButton
          key={variant}
          onClick={onClick}
          element={element}
          color={color}
        />
      ))}
      onNextButtonClick={() => onNext(publicType)}
      nextButtonDisabled={!publicType}
    />
  );
};

const PublicTypeBorderButtonContent = ({
  variant,
}: {
  variant: SpacePublicType;
}) => {
  return <p>{variant === 'PUBLIC' ? '공개' : '비공개'}</p>;
};

export default PublicTypeElement;
