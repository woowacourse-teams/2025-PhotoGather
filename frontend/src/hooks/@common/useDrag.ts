import { useState } from 'react';

interface UseDragProps {
  onDrop?: (event: React.DragEvent<HTMLLabelElement>) => void;
}

const useDrag = ({ onDrop }: UseDragProps) => {
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

export default useDrag;
