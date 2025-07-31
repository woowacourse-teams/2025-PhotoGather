import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DownloadCompletePage from '../pages/complete/DownloadCompletePage';
import SpaceCreatedCompletePage from '../pages/complete/SpaceCreatedCompletePage';
import UploadCompletePage from '../pages/complete/UploadCompletePage';
import DemoHome from '../pages/demo/DemoHome';
import ErrorPage from '../pages/error/ErrorPage';
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
          {
            path: 'space-created',
            element: <SpaceCreatedCompletePage />,
          },
        ],
      },
      {
        path: 'network-error',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
