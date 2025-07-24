export const copyLinkToClipboard = async (copyText: string) => {
  // TODO : try catch 유틸 분리
  try {
    await navigator.clipboard.writeText(copyText);
  } catch (error) {
    console.log(error);
  }
};
