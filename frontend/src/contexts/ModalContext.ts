import { createContext } from 'react';

const ModalContext = createContext<{
  onClose: () => void;
}>({
  onClose: () => {},
});

export default ModalContext;
