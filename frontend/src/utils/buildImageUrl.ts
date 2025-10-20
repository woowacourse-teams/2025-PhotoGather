type ReplacePath = 'product' | 'guestbook' | 'space';
type Preset = '300' | '800' | '1080';

interface BuildThumbnailUrlProps {
  path: string;
  replacePath?: ReplacePath;
  preset?: Preset;
}

const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || '';

export const buildThumbnailUrl = ({
  path,
  replacePath = 'product',
  preset = '800',
}: BuildThumbnailUrlProps): string => {
  const parsedPath = path.replace(/^photogather\//, '');
  const lastDotIndex = parsedPath.lastIndexOf('.');
  const pathWithoutExt =
    lastDotIndex !== -1 ? parsedPath.substring(0, lastDotIndex) : parsedPath;

  const thumbnailPath = pathWithoutExt.replace(
    `/${replacePath}/`,
    `/${replacePath}/thumbnails/`,
  );

  return `${baseUrl}/${thumbnailPath}_x${preset}.webp`;
};

export const buildOriginalImageUrl = (path: string): string => {
  const parsedPath = path.replace(/^photogather\//, '');

  return `${baseUrl}/${parsedPath}`;
};
