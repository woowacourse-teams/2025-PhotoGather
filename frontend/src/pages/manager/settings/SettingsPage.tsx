import { ReactComponent as WarningIcon } from '@assets/icons/warning.svg';
import { useEffect, useState } from 'react';
import Button from '../../../components/@common/buttons/button/Button';
import InfoBox from '../../../components/@common/infoBox/InfoBox';
import DateTimeInput from '../../../components/@common/inputs/DateTimeInput';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import ConfirmModal from '../../../components/@common/modal/confirmModal/ConfirmModal';
import { INFORMATION } from '../../../constants/messages';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import useSpaceInfo from '../../../hooks/useSpaceInfo';
import { track } from '../../../utils/googleAnalytics/track';
import * as S from './SettingsPage.styles';

const SettingsPage = () => {
  const { spaceCode } = useSpaceCodeFromPath();
  const { spaceInfo } = useSpaceInfo(spaceCode || '');
  const overlay = useOverlay();

  const [spaceName, setSpaceName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const isDateTimeDisabled = () => {
    if (!spaceInfo) return false;

    const now = new Date();
    const openedAt = new Date(spaceInfo.openedAt);

    return now >= openedAt || spaceInfo.isExpired;
  };

  useEffect(() => {
    if (spaceInfo) {
      setSpaceName(spaceInfo.name);

      const openedAtDate = new Date(spaceInfo.openedAt);
      const dateString = openedAtDate.toISOString().split('T')[0];
      const timeString = openedAtDate.toTimeString().slice(0, 5);

      setDate(dateString);
      setTime(timeString);
    }
  }, [spaceInfo]);

  useEffect(() => {
    if (!spaceInfo) {
      setHasChanges(false);
      return;
    }

    const openedAtDate = new Date(spaceInfo.openedAt);
    const originalDate = openedAtDate.toISOString().split('T')[0];
    const originalTime = openedAtDate.toTimeString().slice(0, 5);

    const hasNameChanged = spaceName !== spaceInfo.name;
    const hasDateChanged = date !== originalDate;
    const hasTimeChanged = time !== originalTime;

    setHasChanges(hasNameChanged || hasDateChanged || hasTimeChanged);
  }, [spaceName, date, time, spaceInfo]);

  const handleUpdate = () => {
    // TODO: 수정 API 호출
    console.log('수정하기', { spaceName, date, time });
  };

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

    // TODO: 삭제 API 호출
    track.button('space_delete_button', {
      page: 'settings',
      section: 'settings_danger_zone',
      action: 'delete_space',
    });
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
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              maxCount={10}
            />
          </S.InputWrapper>
          <S.DateTimeContainer>
            <S.InputWrapper>
              <S.InputLabel>시작 날짜</S.InputLabel>
              <DateTimeInput
                inputType="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isDateTimeDisabled()}
                data-testid="date-input"
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.InputLabel>시작 시간</S.InputLabel>
              <DateTimeInput
                inputType="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={isDateTimeDisabled()}
                data-testid="time-input"
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
      <Button text="수정하기" onClick={handleUpdate} disabled={!hasChanges} />
    </S.Wrapper>
  );
};

export default SettingsPage;
