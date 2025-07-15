export const createImageErrorHandler = (defaultImageSrc: string) => {
  return (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.style.background = 'none';
    target.src = defaultImageSrc;
  };
};
