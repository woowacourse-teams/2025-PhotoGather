import Button from '../../../../components/@common/buttons/button/Button';
import DateTimeInput from '../../../../components/@common/inputs/DateTimeInput';
import { ERROR } from '../../../../constants/messages';
import useImmediateOpenElement from '../../../../hooks/domain/useImmediateOpenElement';
import type {
  FunnelElementProps,
  ImmediateOpenElementInitialValue,
} from '../../../../types/funnel.type';
import FunnelBasePage from '../../funnel/FunnelBasePage/FunnelBasePage';
import * as S from './ImmediateOpenElement.styles';

const ImmediateOpenElement = ({
  onNext,
  initialValue = {
    date: '',
    time: '',
    isImmediateOpen: null,
  },
}: FunnelElementProps<ImmediateOpenElementInitialValue>) => {
  const {
    date,
    handleDateChange,
    time,
    handleTimeChange,
    isImmediateOpen,
    onClickImmediateOpen,
    onClickLater,
    isPastTime,
    isNoInput,
    kstDateString,
  } = useImmediateOpenElement(initialValue);

  return (
    <FunnelBasePage
      title={{
        text: '스페이스를 지금 당장 열어볼까요?',
        highlightTextArray: ['지금 당장'],
      }}
      description="스페이스가 열릴 시간을 정할 수 있어요."
      element={
        <>
          <S.ButtonContainer>
            <Button
              onClick={onClickImmediateOpen}
              text="지금 당장"
              variant={isImmediateOpen === true ? 'primary' : 'secondary'}
            />
            <Button
              onClick={onClickLater}
              text="나중에"
              variant={isImmediateOpen === false ? 'primary' : 'secondary'}
            />
          </S.ButtonContainer>
          {isImmediateOpen === false && (
            <S.InputContainer>
              <DateTimeInput
                inputType="date"
                value={date}
                min={kstDateString}
                onChange={handleDateChange}
                data-testid="date-input"
              />
              <DateTimeInput
                inputType="time"
                value={time}
                onChange={handleTimeChange}
                data-testid="time-input"
                errorMessage={isPastTime ? ERROR.INPUT.TIME : ''}
              />
            </S.InputContainer>
          )}
        </>
      }
      onNextButtonClick={() =>
        onNext({ date, time, isImmediateOpen: isImmediateOpen ?? false })
      }
      nextButtonDisabled={
        isImmediateOpen === null ||
        (isImmediateOpen === false && (isNoInput || isPastTime))
      }
    />
  );
};

export default ImmediateOpenElement;
