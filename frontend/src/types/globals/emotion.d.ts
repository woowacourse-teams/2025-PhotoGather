import '@emotion/react';

import type { theme } from '../../styles/theme';

type ExtendedTheme = typeof theme;

declare module '@emotion/react' {
  type Theme = ExtendedTheme;
}
