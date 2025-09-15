import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WarningIcon } from '../../../@assets/icons';
import { spaceService } from '../../../apis/services/space.service';
import Button from '../../../components/@common/buttons/button/Button';
import InfoBox from '../../../components/@common/infoBox/InfoBox';
import DateTimeInput from '../../../components/@common/inputs/DateTimeInput';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import ConfirmModal from '../../../components/@common/modal/confirmModal/ConfirmModal';
import { INFORMATION } from '../../../constants/messages';
import { ROUTES } from '../../../constants/routes';
import { useOverlay } from '../../../contexts/OverlayProvider';
import useGraphemeInput from '../../../hooks/@common/useGraphemeInput';
import useTaskHandler from '../../../hooks/@common/useTaskHandler';
import { useToast } from '../../../hooks/@common/useToast';
import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import useSpaceInfo from '../../../hooks/useSpaceInfo';
import type {
  SpaceAccessType,
  SpaceCreateInfo,
} from '../../../types/space.type';
import { track } from '../../../utils/googleAnalytics/track';
import { parseIsoStringFromDateTime } from '../../../utils/parseIsoStringFromDateTime';
import * as S from './SettingsPage.styles';

const SettingsPage = () => {
  const { spaceCode } = useSpaceCodeFromPath();
  const { spaceInfo, refetchSpaceInfo } = useSpaceInfo(spaceCode || '');
  const { tryFetch } = useTaskHandler();
  const overlay = useOverlay();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [spaceName, setSpaceName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const isDateTimeDisabled = () => {
    if (!spaceInfo) return false;

    const now = new Date();
    const openedAt = new Date(spaceInfo.openedAt);

    return now >= openedAt || spaceInfo.isExpired;
  };

  const { handleChange, validValue, validLength } = useGraphemeInput({
    initialValue: spaceName,
    onChange: (e) => setSpaceName(e.target.value),
  });

  const [accessType, setAccessType] = useState<SpaceAccessType>();

  useEffect(() => {
    if (spaceInfo) {
      setSpaceName(spaceInfo.name);

      const openedAtDate = new Date(spaceInfo.openedAt);
      const dateString = openedAtDate.toISOString().split('T')[0];
      const timeString = openedAtDate.toTimeString().slice(0, 5);

      setDate(dateString);
      setTime(timeString);
      setAccessType(spaceInfo.type);
    }
  }, [spaceInfo]);

  const hasChanges = (() => {
    if (!spaceInfo) return false;

    const openedAtDate = new Date(spaceInfo.openedAt);
    const originalDate = openedAtDate.toISOString().split('T')[0];
    const originalTime = openedAtDate.toTimeString().slice(0, 5);

    return (
      validValue !== spaceInfo.name ||
      date !== originalDate ||
      time !== originalTime ||
      accessType !== spaceInfo.type
    );
  })();

  const handleUpdateSpaceInfo = async () => {
    if (!spaceCode || !spaceInfo) return;

    const updateData: Partial<SpaceCreateInfo> = {};

    if (validValue !== spaceInfo.name) {
      updateData.name = validValue;
    }

    if (!isDateTimeDisabled()) {
      const openedAtDate = new Date(spaceInfo.openedAt);
      const originalDate = openedAtDate.toISOString().split('T')[0];
      const originalTime = openedAtDate.toTimeString().slice(0, 5);

      if (date !== originalDate || time !== originalTime) {
        updateData.openedAt = parseIsoStringFromDateTime(date, time);

        const newOpenedDate = new Date(updateData.openedAt);
        const expiredDate = new Date(spaceInfo.expiredAt);
        const newValidHours = Math.round(
          (expiredDate.getTime() - newOpenedDate.getTime()) / (1000 * 60 * 60),
        );
        updateData.validHours = newValidHours > 0 ? newValidHours : 72;
      }
    }

    if (accessType !== spaceInfo.type) {
      updateData.type = accessType;
    }

    const result = await tryFetch({
      task: () => spaceService.update(spaceCode, updateData),
      errorActions: ['toast'],
      context: {
        toast: {
          text: '스페이스 정보 수정에 실패했어요.',
        },
      },
    });

    if (result.success) {
      track.button('space_update_button', {
        page: 'settings',
        section: 'settings_space_info',
        action: 'update_space',
      });

      showToast({
        text: '스페이스 정보가 수정되었어요.',
        type: 'info',
      });

      await refetchSpaceInfo();
    }
  };

  const handleDeleteSpace = async () => {
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

    if (!spaceCode) return;

    const result = await tryFetch({
      task: () => spaceService.delete(spaceCode),
      errorActions: ['toast'],
      context: {
        toast: {
          text: '스페이스 삭제에 실패했어요.',
        },
      },
    });

    if (result.success) {
      track.button('space_delete_button', {
        page: 'settings',
        section: 'settings_danger_zone',
        action: 'delete_space',
      });

      showToast({
        text: '스페이스가 성공적으로 삭제됐어요.',
        type: 'info',
      });

      navigate(ROUTES.MAIN);
    }
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
          <S.InputWrapper style={{ marginBottom: '-24px' }}>
            <S.InputLabel htmlFor="space-name-input">
              스페이스 이름
            </S.InputLabel>
            <TextInput
              id="space-name-input"
              placeholder="스페이스 이름을 입력하세요"
              value={validValue}
              onChange={handleChange}
              maxCount={10}
              validLength={validLength}
            />
          </S.InputWrapper>
          <S.DateTimeContainer>
            <S.InputWrapper>
              <S.InputLabel htmlFor="start-date-input">시작 날짜</S.InputLabel>
              <DateTimeInput
                id="start-date-input"
                inputType="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isDateTimeDisabled()}
                data-testid="date-input"
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.InputLabel htmlFor="start-time-input">시작 시간</S.InputLabel>
              <DateTimeInput
                id="start-time-input"
                inputType="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={isDateTimeDisabled()}
                data-testid="time-input"
              />
            </S.InputWrapper>
          </S.DateTimeContainer>
          <S.InputWrapper>
            <S.InputLabel htmlFor="access-type-input">공개 범위</S.InputLabel>
            <S.AccessTypeButtonContainer id="access-type-input">
              <Button
                onClick={() => setAccessType('PUBLIC')}
                text="공개"
                variant={accessType === 'PUBLIC' ? 'primary' : 'secondary'}
              />
              <Button
                onClick={() => setAccessType('PRIVATE')}
                text="비공개"
                variant={accessType === 'PRIVATE' ? 'primary' : 'secondary'}
              />
            </S.AccessTypeButtonContainer>
          </S.InputWrapper>
        </S.InputContainer>
      </S.InfoContainer>
      <S.SpaceDeleteButtonContainer>
        <S.SpaceDeleteButton onClick={handleDeleteSpace}>
          스페이스 삭제
        </S.SpaceDeleteButton>
      </S.SpaceDeleteButtonContainer>
      <Button
        text="수정하기"
        onClick={handleUpdateSpaceInfo}
        disabled={!hasChanges}
      />
    </S.Wrapper>
  );
};

export default SettingsPage;
