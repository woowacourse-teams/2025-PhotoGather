import { CONSTRAINTS } from '../../../../constants/constraints';
import {
  checkEmailForm,
  checkMaxLength,
} from '../../../../validators/form.validators';

export const funnelValidators = {
  profileImage: () => {},
  name: (value: string) => {
    checkMaxLength(value, CONSTRAINTS.NAME_MAX_LENGTH);
  },
  visibility: () => {},
  description: (value: string) => {
    checkMaxLength(value, CONSTRAINTS.DESCRIPTION_MAX_LENGTH);
  },
  email: (value: string) => {
    checkEmailForm(value);
  },
  instagram: () => {},
};
