export const CONSTRAINTS = {
  MAX_LENGTH: {
    SPACE: {
      NAME: 15,
      DESCRIPTION: 200,
      EMAIL: 50,
      INSTAGRAM_USERNAME: 30,
    },
    WORK: {
      TITLE: 50,
      CATEGORY: 20,
      DESIGNER: 20,
      DESCRIPTION: 1000,
    },
    GUESTBOOK: {
      MESSAGE: 400,
      NICKNAME: 10,
    },
  },
  MAX_FILE_COUNT: 20,
  MAX_FILE_CAPACITY: 90 * 1024 * 1024,
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/heic',
    'image/heif',
    'image/gif',
    'image/avif',
    'image/webp',
  ],
  INSTAGRAM_USERNAME_REGEX: /^[a-zA-Z0-9_.]+$/,
  GUESTBOOK_PAGINATION_UNIT: 15,
  GUEST_BOOK_CARD_SWIPE_DISTANCE: 80,
  MAX_COUNT_FOR_REFRESH: 3,
} as const;
