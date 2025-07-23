import { createBrowserRouter } from 'react-router-dom';
import CompletePage from '../components/@common/completePage/CompletePage';
import Layout from '../components/layout/Layout';
import ImageUploadPage from '../pages/guest/imageUploadPage/ImageUploadPage';
import SharePage from '../pages/guest/sharePage/SharePage';
import SpaceHome from '../pages/manager/spaceHome/SpaceHome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
            element: <CompletePage variant="UPLOAD" />,
          },
          {
            path: 'download',
            element: <CompletePage variant="DOWNLOAD" />,
          },
          {
            path: 'space-created',
            element: <CompletePage variant="SPACE_CREATED" />,
          },
        ],
      },
    ],
  },
]);

export default router;
