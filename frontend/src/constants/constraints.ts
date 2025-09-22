export const CONSTRAINTS = {
  NAME_MAX_LENGTH: 10,
  MAX_FILE_COUNT: 500,
  NOT_ALLOWED: ['image/gif', 'image/svg', 'image/svg+xml'],
  MAX_COUNT_FOR_REFRESH: 5,
} as const;
