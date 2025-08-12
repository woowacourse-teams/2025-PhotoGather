export const copyLinkToClipboard = async (copyText: string) => {
  await navigator.clipboard.writeText(copyText);
};
