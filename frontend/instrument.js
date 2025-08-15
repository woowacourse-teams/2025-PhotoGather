import Clarity from '@microsoft/clarity';
import * as Sentry from '@sentry/react';

if (process.env.ENVIRONMENT === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    sendDefaultPii: true,
  });
  Clarity.init(process.env.CLARITY_PROJECT_ID);
}
