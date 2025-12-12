import Button from '../../../@common/buttons/button/Button';
import Modal from '../../../@common/modal/Modal';
import * as S from './TextModal.styles';

interface TextModalProps {
  text: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const TextModal = ({
  text,
  description,
  isOpen,
  onClose,
  onConfirm,
}: TextModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Content>
        <S.TextModalContainer>
          <S.TextModalMessageContainer>
            <S.TextConfirmComment>{text}</S.TextConfirmComment>
            {description && (
              <S.TextConfirmDescription>{description}</S.TextConfirmDescription>
            )}
          </S.TextModalMessageContainer>
          <S.ButtonContainer>
            <Button variant="secondary" text="취소" onClick={onClose} />
            <Button variant="primary" text="확인" onClick={onConfirm} />
          </S.ButtonContainer>
        </S.TextModalContainer>
      </Modal.Content>
    </Modal>
  );
};

export default TextModal;
