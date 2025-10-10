import { CONSTRAINTS } from '../../../../constants/constraints';
import {
  checkEmailForm,
  checkMaxLength,
} from '../../../../validators/form.validators';

export const funnelValidators = {
  profileImage: () => {},
  name: (value: string) => {
    checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.SPACE.NAME);
  },
  visibility: () => {},
  description: (value: string) => {
    checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.SPACE.DESCRIPTION);
  },
  email: (value: string) => {
    checkEmailForm(value);
  },
  instagram: () => {},
};
