import { useId, useState } from 'react';
import { EVENT_MODAL_HIDE_KEY } from '../../../../constants/constants';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import Button from '../../../@common/buttons/button/Button';
import Modal from '../../../@common/modal/Modal';
import * as S from './EventModal.styles';

interface EventContent {
  title: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
}

interface EventModalProps {
  eventContent: EventContent;
  isOpen: boolean;
  onClose: () => void;
  eventHideKey?: string;
  showNotShowTodayOption?: boolean;
}

const EventModal = ({
  isOpen,
  onClose,
  eventContent,
  eventHideKey = EVENT_MODAL_HIDE_KEY,
  showNotShowTodayOption = false,
}: EventModalProps) => {
  const [notShowToday, setNotShowToday] = useState(false);
  const { trackClick } = useButtonTracking();
  const checkboxId = useId();

  const handleClose = () => {
    if (notShowToday) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      localStorage.setItem(eventHideKey, tomorrow.getTime().toString());
    }
    onClose();
  };

  const handleButtonClick = () => {
    trackClick(`event_modal_participate_button${eventHideKey}`);
    handleClose();
    if (eventContent.buttonUrl)
      window.open(eventContent.buttonUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setNotShowToday(checked);
    trackClick(
      checked
        ? 'event_modal_hide_today_checked'
        : 'event_modal_hide_today_unchecked',
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Backdrop />
      <Modal.Content size="small">
        <S.Wrapper>
          <S.TopContainer>
            <S.Title>{eventContent.title}</S.Title>
            <S.Description style={{ textAlign: 'left' }}>
              {eventContent.description}
            </S.Description>
          </S.TopContainer>
          <Button
            text={eventContent.buttonText || '확인'}
            variant="primary"
            onClick={handleButtonClick}
          />
          {showNotShowTodayOption && (
            <S.CheckboxWrapper>
              <S.CheckboxContainer htmlFor={checkboxId}>
                <S.Checkbox
                  id={checkboxId}
                  type="checkbox"
                  checked={notShowToday}
                  onChange={handleCheckboxChange}
                />
                <S.CheckboxLabel>오늘 하루동안 보지 않기</S.CheckboxLabel>
              </S.CheckboxContainer>
            </S.CheckboxWrapper>
          )}
        </S.Wrapper>
      </Modal.Content>
    </Modal>
  );
};

export default EventModal;
