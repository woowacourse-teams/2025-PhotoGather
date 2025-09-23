import { useState } from 'react';
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
    variant: BorderButtonAccessType,
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
          {BorderButtons.map(({ variant, onClick, color }) => (
            <AccessTypeBorderButton
              key={variant}
              variant={variant}
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

interface AccessTypeBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: SpaceAccessType;
  /** 테두리 버튼 요소의 색깔 */
  color?: string;
  /** 테두리 버튼 내부 요소 */
  element?: React.ReactNode;
  /** 버튼 클릭했을 때 실행할 함수*/
  onClick: () => void;
  /** 버튼 활성화 여부*/
  disabled?: boolean;
}

const AccessTypeBorderButton = ({
  variant,
  color = theme.colors.gray03,
  onClick,
  disabled,
  ...buttonProps
}: AccessTypeBorderButtonProps) => {
  const title =
    variant === 'PUBLIC'
      ? INFORMATION.ACCESS_TYPE.OPTIONS.PUBLIC.TITLE
      : INFORMATION.ACCESS_TYPE.OPTIONS.PRIVATE.TITLE;
  const description =
    variant === 'PUBLIC'
      ? INFORMATION.ACCESS_TYPE.OPTIONS.PUBLIC.DESCRIPTION
      : INFORMATION.ACCESS_TYPE.OPTIONS.PRIVATE.DESCRIPTION;

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
          <AccessTypeIcon accessType={variant} color={color} />
        </S.TitleContainer>
        <S.Description>{description}</S.Description>
      </S.ContentContainer>
    </S.ButtonWrapper>
  );
};

export default AccessTypeElement;
