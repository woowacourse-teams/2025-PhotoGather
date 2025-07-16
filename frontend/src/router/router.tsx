import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ImageUploadPage from '../pages/guest/ImageUploadPage/ImageUploadPage';
import SharePage from '../pages/guest/sharePage/SharePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
    ],
  },
]);

export default router;
