import { useNavigate } from 'react-router-dom';
import { INFORMATION } from '../../../../constants/messages';
import { ROUTES } from '../../../../constants/routes';
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
  const { service, privacy } = value;
  const isAllChecked = service && privacy;
  const navigate = useNavigate();

  const toggleAll = () => {
    const next = !isAllChecked;
    onChange({ service: next, privacy: next });
  };

  const toggleAt = (idx: 0 | 1) => {
    if (idx === 0) {
      onChange({ ...value, service: !value.service });
    } else {
      onChange({ ...value, privacy: !value.privacy });
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
              isChecked={isAllChecked}
              onClick={toggleAll}
              type="button"
            />
            <S.AllAgreeText>전체 동의</S.AllAgreeText>
          </S.AllAgreeRow>
          <S.AgreeRow>
            <S.AgreeCheckContainer>
              <S.AgreeCheckIcon
                isChecked={service}
                onClick={() => toggleAt(0)}
                type="button"
              />
              <S.AgreeText showDetail={false}>서비스 이용약관 동의</S.AgreeText>
            </S.AgreeCheckContainer>
            <S.AgreeText
              showDetail={true}
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
                isChecked={privacy}
                onClick={() => toggleAt(1)}
                type="button"
              />
              <S.AgreeText showDetail={false}>
                개인정보 수집 및 이용 동의
              </S.AgreeText>
            </S.AgreeCheckContainer>
            <S.AgreeText
              showDetail={true}
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
