import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CloseButton } from '../../../styles/@common/Closebutton.styles';
import type { NavigateInfo } from '../../../types/route.type';
import * as S from './Hamburger.styles';

interface HamburgerProps {
  navigateInfo: NavigateInfo[];
  onClose: () => void;
  isOpen: boolean;
}

const hamburgerVariants = {
  hidden: {
    width: '0%',
    opacity: 0,
  },
  visible: {
    width: '70%',
    opacity: 1,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Hamburger = ({ isOpen, onClose, navigateInfo }: HamburgerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <S.Wrapper>
          <S.HamburgerBackdrop onClick={onClose} />
          <S.HamburgerBackground
            initial="hidden"
            animate="visible"
            variants={hamburgerVariants}
          >
            {navigateInfo.map((info) => (
              <S.ItemContainer key={info.name} variants={itemVariants}>
                <S.Item>
                  <Link to={info.path} onClick={onClose}>
                    {info.name}
                  </Link>
                </S.Item>
              </S.ItemContainer>
            ))}
          </S.HamburgerBackground>
          <CloseButton onClick={onClose} />
        </S.Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Hamburger;
