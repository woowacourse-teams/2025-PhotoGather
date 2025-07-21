import { useState } from 'react';

interface useDragProps {
  onDrop?: (event: React.DragEvent<HTMLLabelElement>) => void;
}

export const useDrag = ({ onDrop }: useDragProps) => {
  const [isActive, setActive] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);
    onDrop?.(e);
  };

  return {
    isActive,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
