import { useState } from 'react';
import type { Photo } from '../types/photo.type';

interface UsePhotoSelectProps {
  photosList: Photo[];
}

const usePhotoSelect = ({ photosList }: UsePhotoSelectProps) => {
  const createInitialSelectedPhotoMap = (initialValue: boolean) =>
    new Map<number, boolean>(
      photosList.map((photo) => [photo.id, initialValue]),
    );

  const [selectedPhotoMap, setSelectedPhotoMap] = useState(() =>
    createInitialSelectedPhotoMap(false),
  );

  const selectedPhotosCount = Array.from(selectedPhotoMap.values()).filter(
    (value) => value,
  ).length;

  const selectedPhotoIds = Array.from(selectedPhotoMap.entries())
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const extractUnselectedPhotos = () => {
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
    setSelectedPhotoMap(createInitialSelectedPhotoMap(false));
  };

  const checkAllSelected = () => {
    setSelectedPhotoMap(createInitialSelectedPhotoMap(true));
  };

  const isAllSelected =
    Array.from(selectedPhotoMap.values()).filter((value) => value).length ===
    photosList.length;

  const toggleAllSelected = () => {
    if (isAllSelected) {
      resetSelectedPhotoMap();
      return;
    }
    checkAllSelected();
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
    extractUnselectedPhotos,
    toggleSelectedPhoto,
    isAllSelected,
    toggleAllSelected,
  };
};

export default usePhotoSelect;
