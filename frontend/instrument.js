import * as Sentry from '@sentry/react';

if (process.env.ENVIRONMENT === 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    sendDefaultPii: true,
  });
}
