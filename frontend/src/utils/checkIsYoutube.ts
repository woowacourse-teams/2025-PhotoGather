export const checkIsYoutube = (youtubeUrl: string) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
  return youtubeRegex.test(youtubeUrl);
};
