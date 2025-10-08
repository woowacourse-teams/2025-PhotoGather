export const CONSTRAINTS = {
  MAX_LENGTH: {
    SPACE: {
      NAME: 10,
      DESCRIPTION: 100,
    },
    WORK: {
      TITLE: 50,
      CATEGORY: 20,
      DESIGNER: 20,
      DESCRIPTION: 1000,
    },
  },
  MAX_FILE_COUNT: 10,
  NOT_ALLOWED_FILE_TYPES: ['image/gif', 'image/svg', 'image/svg+xml'],
} as const;
