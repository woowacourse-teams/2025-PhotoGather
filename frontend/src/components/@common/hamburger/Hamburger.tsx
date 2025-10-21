import { Link } from 'react-router-dom';
import type { NavigateInfo } from '../../../types/route.type';
import * as S from './Hamburger.styles';

interface HamburgerProps {
  navigateInfo: NavigateInfo[];
  onClose: () => void;
  isOpen: boolean;
}

const Hamburger = ({ isOpen, onClose, navigateInfo }: HamburgerProps) => {
  return (
    <>
      {isOpen && (
        <S.Wrapper>
          <S.HamburgerBackdrop onClick={onClose} />
          <S.HamburgerBackground>
            {navigateInfo.map((info) => (
              <S.ItemContainer key={info.name}>
                <S.Item>
                  <Link to={info.path} onClick={onClose}>
                    {info.name}
                  </Link>
                </S.Item>
              </S.ItemContainer>
            ))}
          </S.HamburgerBackground>
        </S.Wrapper>
      )}
    </>
  );
};

export default Hamburger;
