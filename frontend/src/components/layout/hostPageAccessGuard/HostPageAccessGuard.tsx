// import { useContext } from 'react';
// import { UserContext } from '../../../contexts/UserContext';

// const HostPageAccessGuard = () => {
//   // 1. 로그인이 되어있지 않으면 PrivateRoute 에서 걸러줌
//   // 2. 로그인이 되어있지만 호스트 페이지에 접근하려고 하면 걸러줌
//   const { userInfo } = useContext(UserContext);

//   if(!userInfo){
//     return <Navigate to={ROUTES.AUTH.LOGIN} />;
//   }
// };

// export default HostPageAccessGuard;
