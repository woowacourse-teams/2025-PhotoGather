import Modal from '../../../@common/modal/Modal';
import * as S from './LoadingModal.style';

interface LoadingModalProps {
  isOpen: boolean;
  text?: string;
}

const LoadingModal = ({ isOpen, text = '전송 중...' }: LoadingModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} closeOnEscape={false}>
      <Modal.Backdrop />
      <S.Wrapper>
        <S.Spinner />
        <S.TextContainer>{text}</S.TextContainer>
      </S.Wrapper>
    </Modal>
  );
};

export default LoadingModal;
