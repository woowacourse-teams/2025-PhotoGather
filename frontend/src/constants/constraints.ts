export const CONSTRAINTS = {
  NAME_MAX_LENGTH: 10,
  MAX_FILE_COUNT: 500,
  NOT_ALLOWED: ['image/gif', 'image/svg', 'image/svg+xml'],
  BATCH_SIZE: 100,
} as const;
