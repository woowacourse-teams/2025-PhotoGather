interface ShareOptions {
  files: File[];
  title?: string;
  text?: string;
  url?: string;
}

export const shareByWebShareAPI = async ({
  files,
  title,
  text,
  url,
}: ShareOptions) => {
  await navigator.share({ title, text, url, files });
};
