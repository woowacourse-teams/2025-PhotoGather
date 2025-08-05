import type { buttonStyles } from '../components/@common/buttons/button/Button.styles';
import type { FloatingActionButtonStyles } from '../components/@common/buttons/floatingActionButton/FloatingActionButton.styles';
import type { IconContainerStyles } from '../components/@common/buttons/iconLabelButton/IconLabelButton.styles';

export type ButtonVariant = keyof typeof buttonStyles;
export type FloatingActionButtonVariant =
  keyof typeof FloatingActionButtonStyles;
export type IconButtonVariant = keyof typeof IconContainerStyles;
