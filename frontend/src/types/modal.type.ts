import type { ModalSize } from '../components/@common/modal/Modal.styles';

export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
}

export interface BackdropProps extends BaseProps {
  closeOnClick?: boolean;
}

export interface ModalContentProps extends BaseProps {
  hasTopCloseButton?: boolean;
  size?: keyof typeof ModalSize;
}
