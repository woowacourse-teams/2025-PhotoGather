import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SpaceHome from '../pages/guest/spaceHome/SpaceHome';
import ImageUploadPage from '../pages/manager/imageUploadPage/ImageUploadPage';

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
        ],
      },
    ],
  },
]);

export default router;
