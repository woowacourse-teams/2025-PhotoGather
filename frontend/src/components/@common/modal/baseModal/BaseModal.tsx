import * as S from './BaseModal.styles';

interface BaseModalProps {
  children: React.ReactNode;
}

const BaseModal = ({ children }: BaseModalProps) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default BaseModal;
