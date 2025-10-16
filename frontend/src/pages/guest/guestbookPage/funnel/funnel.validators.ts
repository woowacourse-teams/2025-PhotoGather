import { CONSTRAINTS } from '../../../../constants/constraints';
import { checkMaxLength } from '../../../../validators/form.validators';

export const funnelValidators = {
  message: {
    maxLength: (value: string) =>
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.GUESTBOOK.MESSAGE),
  },
  nickname: {
    maxLength: (value: string) =>
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.GUESTBOOK.NICKNAME),
  },
};
