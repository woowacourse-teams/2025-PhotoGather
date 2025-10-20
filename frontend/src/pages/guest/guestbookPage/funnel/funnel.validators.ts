import { CONSTRAINTS } from '../../../../constants/constraints';
import {
  checkMaxLength,
  checkNoWhitespaceOnly,
} from '../../../../validators/form.validators';

export const funnelValidators = {
  message: {
    validator: (value: string) => {
      checkNoWhitespaceOnly(value);
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.GUESTBOOK.MESSAGE);
    },
  },
  nickname: {
    validator: (value: string) => {
      checkNoWhitespaceOnly(value);
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.GUESTBOOK.NICKNAME);
    },
  },
};
