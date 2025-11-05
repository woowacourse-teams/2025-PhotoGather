import { useId, useState } from 'react';
import {
  EVENT_FORM_URL,
  EVENT_MODAL_HIDE_KEY,
} from '../../../../constants/constants';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import Button from '../../../@common/buttons/button/Button';
import Modal from '../../../@common/modal/Modal';
import * as S from './EventModal.styles';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceCode?: string;
}

const EventModal = ({ isOpen, onClose, spaceCode }: EventModalProps) => {
  const [notShowToday, setNotShowToday] = useState(false);
  const { trackClick } = useButtonTracking({
    userType: 'host',
    spaceCode: spaceCode,
  });
  const checkboxId = useId();

  const handleClose = () => {
    if (notShowToday) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      localStorage.setItem(EVENT_MODAL_HIDE_KEY, tomorrow.getTime().toString());
    }
    onClose();
  };

  const handleButtonClick = () => {
    trackClick('event_modal_participate_button');
    window.open(EVENT_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Backdrop />
      <Modal.Content size="small">
        <S.Wrapper>
          <S.TopContainer>
            <S.Title>🎁 포게더 이벤트 안내 🎁</S.Title>
            <S.Description>{`설문조사 참여하고 배민 쿠폰 받자!`}</S.Description>
          </S.TopContainer>
          <Button
            text="이벤트 참여하기"
            variant="primary"
            onClick={handleButtonClick}
          />
          <S.CheckboxWrapper>
            <S.CheckboxContainer htmlFor={checkboxId}>
              <S.Checkbox
                id={checkboxId}
                type="checkbox"
                checked={notShowToday}
                onChange={(e) => setNotShowToday(e.target.checked)}
              />
              <S.CheckboxLabel>오늘 하루동안 보지 않기</S.CheckboxLabel>
            </S.CheckboxContainer>
          </S.CheckboxWrapper>
        </S.Wrapper>
      </Modal.Content>
    </Modal>
  );
};

export default EventModal;
