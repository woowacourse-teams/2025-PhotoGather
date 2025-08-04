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

  const selectedPhotoCount = Array.from(selectedPhotoMap.values()).filter(
    Boolean,
  ).length;

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

  const extractSelectedPhoto = () => {
    return photosList.filter((photo) => selectedPhotoMap.get(photo.id));
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
    selectedPhotoCount,
    toggleSelectedPhoto,
    extractSelectedPhoto,
  };
};

export default usePhotoSelect;
