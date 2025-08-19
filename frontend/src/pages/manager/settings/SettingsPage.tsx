import { ReactComponent as WarningIcon } from '@assets/icons/warning.svg';
import Button from '../../../components/@common/buttons/button/Button';
import InfoBox from '../../../components/@common/infoBox/InfoBox';
import DateTimeInput from '../../../components/@common/inputs/DateTimeInput';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import ConfirmModal from '../../../components/@common/modal/confirmModal/ConfirmModal';
import { INFORMATION } from '../../../constants/messages';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import * as S from './SettingsPage.styles';

const SettingsPage = () => {
  const { spaceCode } = useSpaceCodeFromPath();
  const overlay = useOverlay();

  const spaceDelete = async () => {
    const confirmResult = await overlay(
      <ConfirmModal
        icon={<WarningIcon />}
        title="정말 삭제하시겠어요?"
        description="삭제 후에는 복구할 수 없어요"
        confirmText="삭제"
        cancelText="취소"
        mode="error"
      />,
      {
        clickOverlayClose: true,
      },
    );
    if (!confirmResult) return;
  };

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
          <S.InputWrapper style={{ marginBottom: '-8px' }}>
            <S.InputLabel>스페이스 이름</S.InputLabel>
            <TextInput
              placeholder="스페이스 이름을 입력하세요"
              value=""
              onChange={() => {}}
              maxCount={10}
            />
          </S.InputWrapper>
          <S.DateTimeContainer>
            <S.InputWrapper>
              <S.InputLabel>시작 날짜</S.InputLabel>
              <DateTimeInput
                inputType="date"
                // value={date}
                // min={kstDateString}
                // onChange={handleDateChange}
                data-testid="date-input"
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.InputLabel>시작 시간</S.InputLabel>
              <DateTimeInput
                inputType="time"
                // value={time}
                // onChange={handleTimeChange}
                data-testid="time-input"
                // errorMessage={isPastTime ? ERROR.INPUT.TIME : ''}
              />
            </S.InputWrapper>
          </S.DateTimeContainer>
        </S.InputContainer>
      </S.InfoContainer>
      <S.SpaceDeleteButtonContainer>
        <S.SpaceDeleteButton onClick={spaceDelete}>
          스페이스 삭제
        </S.SpaceDeleteButton>
      </S.SpaceDeleteButtonContainer>
      <Button text="수정하기" onClick={() => {}} disabled={false} />
    </S.Wrapper>
  );
};

export default SettingsPage;
