import { useState } from 'react';

interface useDragProps {
  onDrop?: (event: React.DragEvent<HTMLLabelElement>) => void;
}

export const useDrag = ({ onDrop }: useDragProps) => {
  const [isActive, setActive] = useState(false);

  const stopEvent = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    stopEvent(event);
    setActive(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    stopEvent(event);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    stopEvent(event);
    setActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    stopEvent(event);
    setActive(false);
    onDrop?.(event);
  };

  return {
    isActive,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
