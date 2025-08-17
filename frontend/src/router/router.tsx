import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DownloadCompletePage from '../pages/complete/DownloadCompletePage';
import UploadCompletePage from '../pages/complete/UploadCompletePage';
import SpaceCreateFunnel from '../pages/create/funnel/SpaceCreateFunnel';
import DemoHome from '../pages/demo/DemoHome';
import NetworkErrorPage from '../pages/error/NetworkErrorPage';
import NotFoundErrorPage from '../pages/error/NotFoundErrorPage';
import ImageUploadPage from '../pages/guest/imageUploadPage/ImageUploadPage';
import SharePage from '../pages/guest/sharePage/SharePage';
import LandingPage from '../pages/landing/LandingPage';
import SpaceHome from '../pages/manager/spaceHome/SpaceHome';
import PrivacyPolicyPage from '../pages/privacyPolicy/PrivacyPolicyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/demo',
        element: <DemoHome />,
      },
      {
        path: 'create',
        element: <SpaceCreateFunnel />,
      },
      {
        path: 'space-home/:spaceCode',
        element: <SpaceHome />,
      },
      {
        // TODO : 데모 후 삭제
        path: 'manager',
        children: [
          {
            path: 'space-home/:spaceId',
            element: <SpaceHome />,
          },
        ],
      },
      {
        // TODO : 데모 후 삭제
        path: 'guest',
        children: [
          {
            path: 'image-upload/:spaceId',
            element: <ImageUploadPage />,
          },
          {
            path: 'share',
            element: <SharePage />,
          },
        ],
      },
      {
        path: 'complete',
        children: [
          {
            path: 'upload',
            element: <UploadCompletePage />,
          },
          {
            path: 'download',
            element: <DownloadCompletePage />,
          },
        ],
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: 'network-error',
        element: <NetworkErrorPage />,
      },
      {
        path: '*',
        element: <NotFoundErrorPage />,
      },
    ],
  },
]);

export default router;
