import { useState } from 'react';
import type { Photo } from '../types/photo.type';

interface UsePhotoSelectProps {
  photosList: Photo[];
}

const usePhotoSelect = ({ photosList }: UsePhotoSelectProps) => {
  const createInitialSelectedPhotoMap = () => {
    return new Map<number, boolean>(
      photosList.map((photo) => [photo.id, false]) ?? [],
    );
  };

  const [selectedPhotoMap, setSelectedPhotoMap] = useState(() =>
    createInitialSelectedPhotoMap(),
  );

  const selectedPhotosCount = Array.from(selectedPhotoMap.values()).filter(
    (value) => value,
  ).length;

  const selectedPhotoIds = Array.from(selectedPhotoMap.entries())
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const filterSelectedPhotos = () => {
    return photosList.filter((photo) => !selectedPhotoMap.get(photo.id));
  };

  const toggleSelectedPhoto = (id: number) => {
    setSelectedPhotoMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, !newMap.get(id));
      return newMap;
    });
  };

  const resetSelectedPhotoMap = () => {
    setSelectedPhotoMap(createInitialSelectedPhotoMap());
  };

  const [isSelectMode, setIsSelectMode] = useState(false);
  const toggleSelectMode = () => {
    setIsSelectMode((prev) => !prev);
    resetSelectedPhotoMap();
  };

  return {
    isSelectMode,
    toggleSelectMode,
    selectedPhotoMap,
    selectedPhotosCount,
    selectedPhotoIds,
    filterSelectedPhotos,
    toggleSelectedPhoto,
  };
};

export default usePhotoSelect;
