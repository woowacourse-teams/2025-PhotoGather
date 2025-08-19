export interface BaseModalProps {
  confirmButtonProps?: ModalButtonProps;
  cancelButtonProps?: ModalButtonProps;
}

export interface ModalButtonProps {
  text: string;
  onClick: () => void;
}
