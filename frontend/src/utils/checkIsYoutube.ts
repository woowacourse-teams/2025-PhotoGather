export const checkIsYoutube = (youtubeUrl: string) => {
  const youtubeRegex =
    /^(https?:\/\/)(www\.)?(m\.)?(youtube\.com\/(watch\?v=[A-Za-z0-9_-]+|shorts\/[A-Za-z0-9_-]+|embed\/[A-Za-z0-9_-]+)|youtu\.be\/[A-Za-z0-9_-]+)/;

  return youtubeRegex.test(youtubeUrl);
};
