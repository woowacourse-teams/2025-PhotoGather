import { useEffect, useState } from 'react';
import { Spinner } from '../../../styles/@common/Spinner.styles';
import * as S from './DelayedSpinner.styles';
import { SUSPENSE_DELAY } from '../../../constants/constants';

const DelayedSpinner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), SUSPENSE_DELAY);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <S.Wrapper>
      <Spinner />
    </S.Wrapper>
  );
};

export default DelayedSpinner;
