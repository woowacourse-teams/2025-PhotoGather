import { LockImg as lockImage } from '../../../@assets/images';
import StatusLayout from '../../../components/layout/statusLayout/StatusLayout';
import * as C from '../StatusPage.common.styles';

const NoAccessPage = () => {
  return (
    <StatusLayout
      image={{ src: lockImage, alt: '접근 불가 아이콘' }}
      element={
        <C.DescriptionContainer>
          <C.Description>스페이스 접근 권한이 없어요</C.Description>
          <C.Caption>내 스페이스가 맞는지 확인해 주세요</C.Caption>
        </C.DescriptionContainer>
      }
    />
  );
};

export default NoAccessPage;
