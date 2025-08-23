import { useState } from 'react';
import { ERROR } from '../../constants/messages';
import type { ImmediateOpenElementInitialValue } from '../../types/funnel.type';
import { calculateKstToday } from '../../utils/calculateKstToday';
import { checkIsPastDateTime } from '../../utils/checkIsPastDateTime';
import { useToast } from '../@common/useToast';

const useImmediateOpenElement = (
  initialValue: ImmediateOpenElementInitialValue,
) => {
  const { kstDateString, kstTimeString } = calculateKstToday();
  const [date, setDate] = useState(
    initialValue.date !== '' ? initialValue.date : kstDateString,
  );
  const [time, setTime] = useState(
    initialValue.time !== '' ? initialValue.time : kstTimeString,
  );
  const [isImmediateOpen, setIsImmediateOpen] = useState<boolean | null>(
    initialValue.isImmediateOpen,
  );
  const isNoInput =
    isImmediateOpen === false && (date.length === 0 || time.length === 0);
  const { showToast } = useToast();

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;
    setTime(selectedTime);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate < kstDateString) {
      showToast({ text: ERROR.INPUT.DATE });
      return;
    }
    setDate(selectedDate);
  };

  const onClickImmediateOpen = () => setIsImmediateOpen(true);
  const onClickLater = () => setIsImmediateOpen(false);

  const isPastTime = checkIsPastDateTime(date, time);
  const isNextDisabled =
    isImmediateOpen === null ||
    (isImmediateOpen === false && (isNoInput || isPastTime));

  return {
    date,
    handleDateChange,
    time,
    handleTimeChange,
    isImmediateOpen,
    onClickImmediateOpen,
    onClickLater,
    isNoInput,
    isPastTime,
    isNextDisabled,
    kstDateString,
  };
};

export default useImmediateOpenElement;
