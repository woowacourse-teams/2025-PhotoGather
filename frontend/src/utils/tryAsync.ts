export const tryAsync = async <T>(
  fn: () => Promise<T>,
  onFinally: () => void,
) => {
  try {
    return await fn();
  } catch (error) {
    console.error(error);
    return error;
  } finally {
    onFinally();
  }
};
