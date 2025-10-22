import { Outlet } from 'react-router-dom';

const HostPageAccessGuard = () => {
  // TODO : 소유자 정보와 공간 정보를 비교하는 API 연동 필요
  return <Outlet />;
};

export default HostPageAccessGuard;
