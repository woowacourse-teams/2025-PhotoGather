export const hasCookie = (name: string) => {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  return cookies.some((cookie) => cookie.startsWith(`${name}=`));
};
