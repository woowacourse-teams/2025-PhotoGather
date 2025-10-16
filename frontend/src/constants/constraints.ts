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
  NOT_ALLOWED_FILE_TYPES: ['image/gif', 'image/svg', 'image/svg+xml'],
  GUESTBOOK_PAGINATION_UNIT: 15,
  GUEST_BOOK_CARD_SWIPE_DISTANCE: 80,
} as const;
