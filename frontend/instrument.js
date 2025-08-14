import * as Sentry from '@sentry/react';

if (process.env.ENVIRONMENT === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    sendDefaultPii: true,
  });
}
