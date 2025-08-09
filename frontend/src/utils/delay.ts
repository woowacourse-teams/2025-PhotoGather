export const delay = (delayMilliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
