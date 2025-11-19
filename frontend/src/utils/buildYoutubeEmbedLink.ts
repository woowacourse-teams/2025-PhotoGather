// https://www.youtube.com/embed/KsGBitYXn3M?si=Cd6nxQpAKrVpCe4E
// https://youtu.be/embed/KsGBitYXn3M?si=vEtbIFtzQ9srNwa3

export const buildYoutubeEmbedLink = (youtubeUrl: string) => {
  if (youtubeUrl.includes('embed')) {
    return youtubeUrl;
  }
  const parsedUrl = youtubeUrl
    .replace('youtu.be/', 'www.youtube.com/embed/')
    .replace('watch?v=', 'embed/');
  return parsedUrl;
};
