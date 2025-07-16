export const copyLinkToClipboard = async (copyText: string) => {
  try {
    await navigator.clipboard.writeText(copyText);
  } catch (error) {
    console.log(error);
  }
};
