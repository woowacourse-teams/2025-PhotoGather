import lockImage from '@assets/images/lock.png';
import StatusLayout from '../../../components/layout/statusLayout/StatusLayout';
import * as S from './ExpiredPage.styles';

const ExpiredPage = () => {
  return (
    <StatusLayout
      image={{ src: lockImage, alt: '만료' }}
      element={
        <S.DescriptionContainer>
          <S.Description>스페이스 기간이</S.Description>
          <S.Description>만료되었어요</S.Description>
        </S.DescriptionContainer>
      }
    />
  );
};

export default ExpiredPage;
