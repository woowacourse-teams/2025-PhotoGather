import { Activity, useContext } from 'react';
import ModalContext from '../../../contexts/ModalContext';
import useScrollLock from '../../../hooks/@common/useScrollLock';
import useEscapeKeyClose from '../../../hooks/domain/modal/useEscapeKeyClose';
import { Backdrop } from '../../../styles/@common/Backdrop.styles';
import { CloseButton } from '../../../styles/@common/Closebutton.styles';
import type {
  BackdropProps,
  ModalContentProps,
  ModalProps,
} from '../../../types/modal.type';
import * as S from './Modal.styles';

const Modal = ({
  children,
  isOpen,
  onClose,
  closeOnEscape = true,
}: ModalProps) => {
  useScrollLock(isOpen);
  useEscapeKeyClose({ closeOnEscape, isOpen, onClose });
  const isModalVisible = isOpen ? 'visible' : 'hidden';

  return (
    <Activity mode={isModalVisible}>
      <ModalContext.Provider value={{ onClose }}>
        {children}
      </ModalContext.Provider>
    </Activity>
  );
};

const ModalBackdrop = ({ closeOnClick = true }: BackdropProps) => {
  const { onClose } = useContext(ModalContext);

  const handleClick = () => {
    if (!closeOnClick) return;
    onClose();
  };

  return <Backdrop onClick={handleClick} />;
};

const Content = ({
  children,
  hasTopCloseButton = true,
  size = 'mobile',
  ...props
}: ModalContentProps) => {
  const { onClose } = useContext(ModalContext);

  return (
    <S.ModalContent $size={size} {...props}>
      {hasTopCloseButton && <CloseButton size={24} onClick={() => onClose()} />}
      {children}
    </S.ModalContent>
  );
};

Modal.Backdrop = ModalBackdrop;
Modal.Content = Content;

export default Modal;
