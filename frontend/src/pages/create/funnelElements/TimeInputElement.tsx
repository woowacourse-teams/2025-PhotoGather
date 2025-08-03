import { useState } from 'react';
import DateTimeInput from '../../../components/@common/dateTimeInput/DateTimeInput';
import useFunnelHistory from '../../../hooks/useFunnelHistory';
import type { FunnelElementProps } from '../../../types/funnel.type';
import { checkIsPastDateTime } from '../../../utils/checkIsPastDateTime';
import FunnelBasePage from '../funnel/funnelElementBase/FunnelElementBase';

interface TimeInputElementProps extends FunnelElementProps {
  date: string;
}

const TimeInputElement = ({ date, onNext, onPrev }: TimeInputElementProps) => {
  const [time, setTime] = useState<string>('');
  const isError = checkIsPastDateTime(date, time);
  const isDisabled = time.length === 0 || isError;
  const { navigateToNext } = useFunnelHistory({ stepId: 'time', onPrev });

  return (
    <FunnelBasePage
      title={{
        text: '스페이스를 몇시부터 열까요?',
        highlightTextArray: ['몇시부터'],
      }}
      description="선택한 시점부터 24시간 동안 열려요."
      element={
        <DateTimeInput
          inputType="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          data-testid="time-input"
          errorMessage={isError ? '현재 시간 이후 시간대를 입력해주세요.' : ''}
        />
      }
      handleNextButtonClick={() => {
        navigateToNext('check');
        onNext(time);
      }}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default TimeInputElement;
