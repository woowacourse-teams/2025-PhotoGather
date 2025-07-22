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
        path: 'complete/upload',
        element: <CompletePage type="upload" />,
      },
      {
        path: 'complete/download',
        element: <CompletePage type="download" />,
      },
      {
        path: 'complete/space-created',
        element: <CompletePage type="spaceCreated" />,
      },
    ],
  },
]);

export default router;
