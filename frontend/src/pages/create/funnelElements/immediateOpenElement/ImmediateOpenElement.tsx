import Button from '../../../../components/@common/buttons/button/Button';
import DateTimeInput from '../../../../components/@common/inputs/DateTimeInput';
import { ERROR, INFORMATION } from '../../../../constants/messages';
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
        text: INFORMATION.WHEN_OPEN_INPUT.TITLE.TEXT,
        highlightTextArray: [INFORMATION.WHEN_OPEN_INPUT.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.WHEN_OPEN_INPUT.DESCRIPTION}
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
