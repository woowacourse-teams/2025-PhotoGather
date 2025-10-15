import type { buttonStyles } from '../components/@common/buttons/button/Button.styles';
import type {
  IconButtonSizes,
  IconButtonStyles,
} from '../components/@common/buttons/iconButton/IconButton.styles';

export type ButtonVariant = keyof typeof buttonStyles;
export type IconButtonVariant = keyof typeof IconButtonStyles;
export type IconButtonSize = keyof typeof IconButtonSizes;
