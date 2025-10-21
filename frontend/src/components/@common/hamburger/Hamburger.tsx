import { AnimatePresence, motion } from 'framer-motion';
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
    <AnimatePresence>
      {isOpen && (
        <S.Wrapper>
          <S.HamburgerBackdrop onClick={onClose} />
          <S.HamburgerBackground
            initial={{ width: '0%', opacity: 0 }}
            animate={{ width: '70%', opacity: 1 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          >
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
    </AnimatePresence>
  );
};

export default Hamburger;
