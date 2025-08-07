import { createShareUrl } from './createSpaceUrl';

export const copyLinkToClipboard = async (spaceId: string) => {
  // TODO : try catch 유틸 분리
  try {
    await navigator.clipboard.writeText(createShareUrl(spaceId));
  } catch (error) {
    console.log(error);
  }
};
