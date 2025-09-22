import { LockImg as lockImage } from '../../../@assets/images';
import StatusLayout from '../../../components/layout/statusLayout/StatusLayout';
import * as C from '../StatusPage.common.styles';

const ExpiredPage = () => {
  return (
    <StatusLayout
      image={{ src: lockImage, alt: '만료' }}
      element={
        <C.DescriptionContainer>
          <C.Description>스페이스 기간이</C.Description>
          <C.Description>만료되었어요</C.Description>
        </C.DescriptionContainer>
      }
    />
  );
};

export default ExpiredPage;
