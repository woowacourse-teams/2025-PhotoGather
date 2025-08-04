import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DownloadCompletePage from '../pages/complete/DownloadCompletePage';
import UploadCompletePage from '../pages/complete/UploadCompletePage';
import SpaceCreateFunnel from '../pages/create/funnel/SpaceCreateFunnel';
import DemoHome from '../pages/demo/DemoHome';
import NetworkErrorPage from '../pages/error/NetworkErrorPage';
import ImageUploadPage from '../pages/guest/imageUploadPage/ImageUploadPage';
import SharePage from '../pages/guest/sharePage/SharePage';
import SpaceHome from '../pages/manager/spaceHome/SpaceHome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <DemoHome />,
      },
      {
        path: 'create',
        element: <SpaceCreateFunnel />,
      },
      {
        // TODO : 데모 후 삭제
        path: 'manager',
        children: [
          {
            path: 'space-home',
            element: <SpaceHome />,
          },
        ],
      },
      {
        // TODO : 데모 후 삭제
        path: 'guest',
        children: [
          {
            path: 'image-upload',
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
        path: 'network-error',
        element: <NetworkErrorPage />,
      },
    ],
  },
]);

export default router;
