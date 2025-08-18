import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INFORMATION } from '../../../../constants/messages';
import { ROUTES } from '../../../../constants/routes';
import type { FunnelElementProps } from '../../../../types/funnel.type';
import FunnelBasePage from '../../funnel/FunnelBasePage/FunnelBasePage';
import * as S from './AgreementElement.styles';

const AgreementElement = ({ onNext }: FunnelElementProps<boolean[]>) => {
  const [agreement, setAgreement] = useState([false, false]);
  const isAllChecked = agreement[0] && agreement[1];
  const navigate = useNavigate();

  const toggleAll = () => {
    const next = !isAllChecked;
    setAgreement([next, next]);
  };

  const toggleAt = (idx: 0 | 1) => {
    setAgreement((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.AGREEMENT.TITLE.TEXT,
        highlightTextArray: [INFORMATION.AGREEMENT.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.NAME_INPUT.DESCRIPTION}
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
                isChecked={agreement[0]}
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
                isChecked={agreement[1]}
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
      onNextButtonClick={() => onNext(agreement)}
      nextButtonDisabled={!isAllChecked}
    />
  );
};

export default AgreementElement;
