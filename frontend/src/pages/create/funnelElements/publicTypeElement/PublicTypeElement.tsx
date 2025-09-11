import { useState } from 'react';
import PublicTypeIcon from '../../../../components/publicTypeIcon/PublicTypeIcon';
import { INFORMATION } from '../../../../constants/messages';
import { theme } from '../../../../styles/theme';
import type { FunnelElementProps } from '../../../../types/funnel.type';
import type { SpacePublicType } from '../../../../types/space.type';
import FunnelBasePage from '../../funnel/FunnelBasePage/FunnelBasePage';
import * as S from './PublicTypeElement.styles';

const PublicTypeElement = ({
  onNext,
  initialValue = 'PUBLIC',
}: FunnelElementProps<SpacePublicType>) => {
  const [publicType, setPublicType] = useState<SpacePublicType>(initialValue);

  const BorderButtons = (['PUBLIC', 'PRIVATE'] as const).map(
    (BorderButtonPublicType) => ({
      variant: BorderButtonPublicType,
      onClick: () => setPublicType(BorderButtonPublicType),
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
      element={
        <S.BorderButtonContainer>
          {BorderButtons.map(({ variant, onClick, color }) => (
            <PublicTypeBorderButton
              key={variant}
              variant={variant}
              onClick={onClick}
              color={color}
            />
          ))}
        </S.BorderButtonContainer>
      }
      onNextButtonClick={() => onNext(publicType)}
      nextButtonDisabled={!publicType}
    />
  );
};

interface PublicTypeBorderButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: SpacePublicType;
  /** 테두리 버튼 요소의 색깔 */
  color?: string;
  /** 테두리 버튼 내부 요소 */
  element?: React.ReactNode;
  /** 버튼 클릭했을 때 실행할 함수*/
  onClick: () => void;
  /** 버튼 활성화 여부*/
  disabled?: boolean;
}

const PublicTypeBorderButton = ({
  variant,
  color = theme.colors.gray03,
  onClick,
  disabled,
  ...buttonProps
}: PublicTypeBorderButton) => {
  const title =
    variant === 'PUBLIC'
      ? INFORMATION.PUBLIC_OR_NOT.OPTIONS.PUBLIC.TITLE
      : INFORMATION.PUBLIC_OR_NOT.OPTIONS.PRIVATE.TITLE;
  const description =
    variant === 'PUBLIC'
      ? INFORMATION.PUBLIC_OR_NOT.OPTIONS.PUBLIC.DESCRIPTION
      : INFORMATION.PUBLIC_OR_NOT.OPTIONS.PUBLIC.DESCRIPTION;

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
          <PublicTypeIcon publicType={variant} color={color} />
        </S.TitleContainer>
        <S.Description>{description}</S.Description>
      </S.ContentContainer>
    </S.ButtonWrapper>
  );
};

export default PublicTypeElement;
