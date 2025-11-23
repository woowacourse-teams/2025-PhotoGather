export const checkIsYoutube = (youtubeUrl: string) => {
  const youtubeRegex =
    /^(https?:\/\/)(www\.)?(m\.)?(youtube\.com\/(watch\?v=.+|shorts\/.+|embed\/.+)|youtu\.be\/.+)/;

  return youtubeRegex.test(youtubeUrl);
};
