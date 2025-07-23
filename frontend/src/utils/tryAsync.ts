export const tryAsync = async <T>(fn: () => Promise<T>) => {
  try {
    return await fn();
  } catch (error) {
    console.error(error);
    return error;
  }
};
