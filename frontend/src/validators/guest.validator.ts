export const validateGuestId = () => {
  const guestId = localStorage.getItem('guestId');
  if (!guestId) {
    throw new Error('guestId가 없습니다. create 요청이 필요합니다.');
  }

  return guestId;
};
