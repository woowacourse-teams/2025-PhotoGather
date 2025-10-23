import { useEffect, useState } from 'react';

interface AutoReloadImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  reloadTimer?: number;
}

const AutoReloadImage = ({
  reloadTimer = 1000,
  src,
  ...imgProps
}: AutoReloadImageProps) => {
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setError(false);
      }, reloadTimer);
      return () => clearTimeout(timer);
    }
    console.log(error);
  }, [error, reloadTimer]);

  const cacheBypassSrc = `${src}?v=${retryCount}`;

  return (
    <img
      src={cacheBypassSrc}
      alt={imgProps.alt}
      onError={() => setError(true)}
      {...imgProps}
    />
  );
};

export default AutoReloadImage;
