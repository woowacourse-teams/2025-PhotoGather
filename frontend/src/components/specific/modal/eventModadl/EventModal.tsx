import { useId, useState } from 'react';
import { EVENT_MODAL_HIDE_KEY } from '../../../../constants/constants';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import Button from '../../../@common/buttons/button/Button';
import Modal from '../../../@common/modal/Modal';
import * as S from './EventModal.styles';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceCode?: string;
  eventHideKey?: string;
}

//TODO: EventModal 리팩터링
// 이벤트 내용, 버튼 텍스트, 버튼 액션 등 props로 받도록 수정 필요

const EventModal = ({
  isOpen,
  onClose,
  spaceCode,
  eventHideKey = EVENT_MODAL_HIDE_KEY,
}: EventModalProps) => {
  const [notShowToday, setNotShowToday] = useState(false);
  const { trackClick } = useButtonTracking({
    userType: 'host',
    spaceCode: spaceCode,
  });
  // const checkboxId = useId();

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
    // window.open(EVENT_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const checked = e.target.checked;
  //   setNotShowToday(checked);
  //   trackClick(
  //     checked
  //       ? 'event_modal_hide_today_checked'
  //       : 'event_modal_hide_today_unchecked',
  //   );
  // };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Backdrop />
      <Modal.Content size="small">
        <S.Wrapper>
          <S.TopContainer>
            <S.Title>[서비스 중단] 11/27 새벽 인프라 이전 작업 공지</S.Title>
            <S.Description
              style={{ textAlign: 'left' }}
            >{`더 안정적인 서비스 제공을 위해\n11/27(수) 00:00–06:00 동안 인프라 이전 작업이 진행됩니다. \n\n해당 시간 동안 서비스 이용이 불가능합니다.
(방명록 작성 및 수정, 작품 등록 및 편집 등 전체 기능 일시 중단) \n\n최대한 빠르게 작업을 마칠 수 있도록 하겠습니다.
이용에 불편을 드려 죄송합니다.`}</S.Description>
          </S.TopContainer>
          <Button text="확인" variant="primary" onClick={handleButtonClick} />
          {/* <S.CheckboxWrapper>
            <S.CheckboxContainer htmlFor={checkboxId}>
              <S.Checkbox
                id={checkboxId}
                type="checkbox"
                checked={notShowToday}
                onChange={handleCheckboxChange}
              />
              <S.CheckboxLabel>오늘 하루동안 보지 않기</S.CheckboxLabel>
            </S.CheckboxContainer>
          </S.CheckboxWrapper> */}
        </S.Wrapper>
      </Modal.Content>
    </Modal>
  );
};

export default EventModal;
