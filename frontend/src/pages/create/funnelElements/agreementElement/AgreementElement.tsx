import { useNavigate } from 'react-router-dom';
import { INFORMATION } from '../../../../constants/messages';
import { ROUTES } from '../../../../constants/routes';
import { theme } from '../../../../styles/theme';
import type { FunnelElementProps } from '../../../../types/funnel.type';
import type { Agreements } from '../../../../types/space.type';
import FunnelBasePage from '../../funnel/FunnelBasePage/FunnelBasePage';
import * as S from './AgreementElement.styles';

interface AgreementElementProps extends FunnelElementProps<Agreements> {
  value: Agreements;
  onChange: (next: Agreements) => void;
}

const AgreementElement = ({
  value,
  onChange,
  onNext,
}: AgreementElementProps) => {
  const { agreedToService, agreedToPrivacy } = value;
  const isAllChecked = agreedToService && agreedToPrivacy;
  const navigate = useNavigate();

  const toggleAll = () => {
    const next = !isAllChecked;
    onChange({ agreedToService: next, agreedToPrivacy: next });
  };

  const toggleAt = (idx: 0 | 1) => {
    if (idx === 0) {
      onChange({ ...value, agreedToService: !value.agreedToService });
    } else {
      onChange({ ...value, agreedToPrivacy: !value.agreedToPrivacy });
    }
  };

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.AGREEMENT.TITLE.TEXT,
        highlightTextArray: [INFORMATION.AGREEMENT.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.AGREEMENT.DESCRIPTION}
      element={
        <S.Wrapper>
          <S.AllAgreeRow>
            <S.AllAgreeIcon
              fill={isAllChecked ? theme.colors.primary : theme.colors.gray03}
              onClick={toggleAll}
              type="button"
            />
            <S.AllAgreeText>전체 동의</S.AllAgreeText>
          </S.AllAgreeRow>
          <S.AgreeRow>
            <S.AgreeCheckContainer>
              <S.AgreeCheckIcon
                fill={
                  agreedToService ? theme.colors.primary : theme.colors.gray03
                }
                onClick={() => toggleAt(0)}
                type="button"
              />
              <S.AgreeText $showDetail={false}>
                서비스 이용약관 동의
              </S.AgreeText>
            </S.AgreeCheckContainer>
            <S.AgreeText
              $showDetail={true}
              onClick={() => {
                navigate(ROUTES.POLICY.TERMS_OF_SERVICE);
              }}
            >
              보기
            </S.AgreeText>
          </S.AgreeRow>
          <S.AgreeRow>
            <S.AgreeCheckContainer>
              <S.AgreeCheckIcon
                fill={
                  agreedToPrivacy ? theme.colors.primary : theme.colors.gray03
                }
                onClick={() => toggleAt(1)}
                type="button"
              />
              <S.AgreeText $showDetail={false}>
                개인정보 수집 및 이용 동의
              </S.AgreeText>
            </S.AgreeCheckContainer>
            <S.AgreeText
              $showDetail={true}
              onClick={() => {
                navigate(ROUTES.POLICY.PRIVACY_CONSENT);
              }}
            >
              보기
            </S.AgreeText>
          </S.AgreeRow>
        </S.Wrapper>
      }
      onNextButtonClick={() => onNext(value)}
      nextButtonDisabled={!isAllChecked}
    />
  );
};

export default AgreementElement;
