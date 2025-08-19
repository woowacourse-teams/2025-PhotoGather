import Button from '../../../components/@common/buttons/button/Button';
import InfoBox from '../../../components/@common/infoBox/InfoBox';
import DateTimeInput from '../../../components/@common/inputs/DateTimeInput';
import { INFORMATION } from '../../../constants/messages';
import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import * as S from './SettingsPage.styles';

const SettingsPage = () => {
  const { spaceCode } = useSpaceCodeFromPath();

  return (
    <S.Wrapper>
      <S.Title>스페이스 정보 수정</S.Title>
      <S.InfoBoxContainer>
        <InfoBox
          description={INFORMATION.SETTINGS.DESCRIPTION}
          highlightTextArray={[INFORMATION.SETTINGS.HIGHLIGHT_TEXT]}
        />
      </S.InfoBoxContainer>
      <S.InfoContainer>
        <S.InputContainer>
          <DateTimeInput
            inputType="date"
            // value={date}
            // min={kstDateString}
            // onChange={handleDateChange}
            data-testid="date-input"
          />
          <DateTimeInput
            inputType="time"
            // value={time}
            // onChange={handleTimeChange}
            data-testid="time-input"
            // errorMessage={isPastTime ? ERROR.INPUT.TIME : ''}
          />
        </S.InputContainer>
      </S.InfoContainer>
      <S.SpaceDeleteButtonContainer>
        <S.SpaceDeleteButton onClick={() => {}}>
          스페이스 삭제
        </S.SpaceDeleteButton>
      </S.SpaceDeleteButtonContainer>
      <Button text="수정하기" onClick={() => {}} disabled={false} />
    </S.Wrapper>
  );
};

export default SettingsPage;
