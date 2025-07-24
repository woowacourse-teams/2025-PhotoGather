import downloadImage from '@assets/images/download.png';
import spaceCreateImage from '@assets/images/space_create.png';
import uploadImage from '@assets/images/upload.png';
import { createBrowserRouter } from 'react-router-dom';
import CompletePage from '../components/layout/completePage/CompletePage';
import Layout from '../components/layout/Layout';
import { COMPLETE } from '../constants/messages';
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
            element: (
              <CompletePage
                image={uploadImage}
                title={COMPLETE.UPLOAD.TITLE}
                description={COMPLETE.UPLOAD.DESCRIPTION}
                buttonText={COMPLETE.UPLOAD.BUTTON_TEXT}
                highlightWords={COMPLETE.UPLOAD.HIGHLIGHT_WORDS}
                onButtonClick={() => console.log(1)}
              />
            ),
          },
          {
            path: 'download',
            element: (
              <CompletePage
                image={downloadImage}
                title={COMPLETE.DOWNLOAD.TITLE}
                description={COMPLETE.DOWNLOAD.DESCRIPTION}
                buttonText={COMPLETE.DOWNLOAD.BUTTON_TEXT}
                highlightWords={COMPLETE.DOWNLOAD.HIGHLIGHT_WORDS}
                onButtonClick={() => console.log(1)}
              />
            ),
          },
          {
            path: 'space-created',
            element: (
              <CompletePage
                image={spaceCreateImage}
                title={COMPLETE.SPACE_CREATED.TITLE}
                description={COMPLETE.SPACE_CREATED.DESCRIPTION}
                buttonText={COMPLETE.SPACE_CREATED.BUTTON_TEXT}
                highlightWords={COMPLETE.SPACE_CREATED.HIGHLIGHT_WORDS}
                onButtonClick={() => console.log(1)}
              />
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
