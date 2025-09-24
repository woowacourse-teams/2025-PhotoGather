import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import useIntersectionObserver from '../../@common/useIntersectionObserver';
import useDownload from './useDownload';
import usePhotoSelect from './usePhotoSelect';
import usePhotosBySpaceCode from './usePhotosBySpaceCode';
import usePhotosDelete from './usePhotosDelete';

interface UsePhotosDomainProps {
  spaceCode: string;
  spaceName: string;
}

const usePhotosDomain = ({ spaceCode, spaceName }: UsePhotosDomainProps) => {
  // TODO : useSpaceCodeBySpaceCode 를 재활용 가능한 형태로 변경

  const navigate = useNavigate();

  const {
    targetRef: fetchTriggerRef,
    isIntersecting: isFetchSectionVisible,
    reObserve,
  } = useIntersectionObserver({ rootMargin: '200px' });

  const photosDomain = usePhotosBySpaceCode({
    reObserve,
    spaceCode: spaceCode ?? '',
  });

  const photoSelectDomain = usePhotoSelect({
    photosList: photosDomain.photosList ?? [],
  });

  const photosDeleteDomain = usePhotosDelete({
    spaceCode: spaceCode ?? '',
    toggleSelectMode: photoSelectDomain.toggleSelectMode,
    updatePhotos: photosDomain.updatePhotos,
    tryFetchPhotosList: photosDomain.tryFetchPhotosList,
    extractUnselectedPhotos: photoSelectDomain.extractUnselectedPhotos,
    photosList: photosDomain.photosList,
  });

  const photosDownloadDomain = useDownload({
    spaceCode: spaceCode ?? '',
    spaceName,
    onDownloadSuccess: () => {
      navigate(ROUTES.COMPLETE.DOWNLOAD, {
        state: {
          spaceCode: spaceCode ?? '',
        },
      });
    },
  });

  return {
    infiniteScroll: {
      fetchTriggerRef,
      isFetchSectionVisible,
      reObserve,
    },
    photosDomain,
    photoSelectDomain,
    photosDeleteDomain,
    photosDownloadDomain,
  };
};

export default usePhotosDomain;
