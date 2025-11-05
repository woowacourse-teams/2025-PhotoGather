import { useState } from 'react';
import { EVENT_FORM_URL } from '../../../../constants/constants';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import useSpaceInfoContext from '../../../../hooks/context/useSpaceInfoContext';
import Button from '../../../@common/buttons/button/Button';
import Modal from '../../../@common/modal/Modal';
import * as S from './EventModal.styles';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventModal = ({ isOpen, onClose }: EventModalProps) => {
  const [notShowToday, setNotShowToday] = useState(false);
  const { spaceInfo } = useSpaceInfoContext();
  const { trackClick } = useButtonTracking({
    userType: 'host',
    spaceCode: spaceInfo.spaceCode,
  });

  const handleClose = () => {
    if (notShowToday) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      localStorage.setItem(
        'eventModalHideUntil',
        tomorrow.getTime().toString(),
      );
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
            <S.CheckboxContainer>
              <S.Checkbox
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
