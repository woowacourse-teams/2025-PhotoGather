import diamondImage from '@assets/images/diamond.png';
import { useState } from 'react';
import ProgressBar from '../../../components/progressBar/ProgressBar';
import { parseIsoStringFromDateTime } from '../../../utils/parseIsoStringFromDateTime';
import CheckSpaceInfoElement from '../funnelElements/CheckSpaceInfoElement';
import DateInputElement from '../funnelElements/DateInputElement';
import NameInputElement from '../funnelElements/NameInputElement';
import TimeInputElement from '../funnelElements/TimeInputElement';
import * as S from './SpaceCreateFunnel.styles';

const PROGRESS_STEP_LIST = ['name', 'date', 'time', 'check'] as const;
const STEP_LIST = [...PROGRESS_STEP_LIST, 'complete'] as const;
type STEP = (typeof STEP_LIST)[number];

interface SpaceFunnelInfo {
  name: string;
  date: string;
  time: string;
}

const SpaceCreateFunnel = () => {
  const [step, setStep] = useState<STEP>('name');
  const [spaceInfo, setSpaceInfo] = useState<SpaceFunnelInfo>({
    name: '',
    date: '',
    time: '',
  });
  const currentStep =
    PROGRESS_STEP_LIST.findIndex((oneStep) => oneStep === step) + 1;

  return (
    <S.Wrapper>
      <ProgressBar
        currentStep={currentStep}
        maxStep={PROGRESS_STEP_LIST.length}
      />
      <S.TopContainer>
        <S.IconContainer>
          <S.Icon src={diamondImage} alt="다이아몬드 이미지" />
          <S.UnderBar />
        </S.IconContainer>
      </S.TopContainer>
      <S.ContentContainer>
        {step === 'name' && (
          <NameInputElement
            onNext={(data) => {
              setStep('date');
              setSpaceInfo((prev) => ({ ...prev, name: data }));
            }}
          />
        )}
        {step === 'date' && (
          <DateInputElement
            onPrev={() => setStep('name')}
            onNext={(data) => {
              setStep('time');
              setSpaceInfo((prev) => ({ ...prev, date: data }));
            }}
          />
        )}
        {step === 'time' && (
          <TimeInputElement
            date={spaceInfo.date}
            onPrev={() => setStep('date')}
            onNext={(data) => {
              setStep('check');
              setSpaceInfo((prev) => ({ ...prev, time: data }));
            }}
          />
        )}
        {step === 'check' && (
          <CheckSpaceInfoElement
            onPrev={() => setStep('time')}
            spaceInfo={{
              name: spaceInfo.name,
              openedAt: parseIsoStringFromDateTime(
                spaceInfo.date,
                spaceInfo.time,
              ),
            }}
            onNext={(data) => alert(data)}
          />
        )}
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
