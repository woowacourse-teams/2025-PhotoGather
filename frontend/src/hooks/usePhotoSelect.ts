import { useState } from 'react';
import type { Photo } from '../types/photo.type';

interface UsePhotoSelectProps {
  photosList: Photo[];
}

const usePhotoSelect = ({ photosList }: UsePhotoSelectProps) => {
  const createInitialSelectedPhotoMap = () =>
    new Map<number, boolean>(photosList.map((photo) => [photo.id, false]));

  const [selectedPhotoMap, setSelectedPhotoMap] = useState(() =>
    createInitialSelectedPhotoMap(),
  );

  const selectedPhotosCount = Array.from(selectedPhotoMap.values()).filter(
    (value) => value,
  ).length;

  const selectedPhotoIds = Array.from(selectedPhotoMap.entries())
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const extractRemainingPhotos = () => {
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

  const isAllSelected =
    Array.from(selectedPhotoMap.values()).filter((value) => value).length ===
    photosList.length;

  const toggleAllSelected = () => {
    if (isAllSelected) {
      resetSelectedPhotoMap();
      return;
    }
    const allSelectedPhotoMap = new Map(
      photosList.map((photo) => [photo.id, true]),
    );
    setSelectedPhotoMap(allSelectedPhotoMap);
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
    extractRemainingPhotos,
    toggleSelectedPhoto,
    isAllSelected,
    toggleAllSelected,
  };
};

export default usePhotoSelect;
