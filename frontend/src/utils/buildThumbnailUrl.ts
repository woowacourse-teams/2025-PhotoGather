type ReplacePath = 'product' | 'guestbook' | 'space';
type Preset = '300' | '800' | '1080';

interface BuildThumbnailUrlProps {
  path: string;
  replacePath?: ReplacePath;
  preset?: Preset;
}

export const buildThumbnailUrl = ({
  path,
  replacePath = 'product',
  preset = '800',
}: BuildThumbnailUrlProps): string => {
  const lastDotIndex = path.lastIndexOf('.');
  const pathWithoutExt =
    lastDotIndex !== -1 ? path.substring(0, lastDotIndex) : path;

  const thumbnailPath = pathWithoutExt.replace(
    `/${replacePath}/`,
    `/${replacePath}/thumbnails/`,
  );

  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL || '';
  return `${baseUrl}${thumbnailPath}_x${preset}.webp`;
};
