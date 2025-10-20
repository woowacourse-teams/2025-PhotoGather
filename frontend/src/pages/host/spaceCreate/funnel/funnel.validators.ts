import { CONSTRAINTS } from '../../../../constants/constraints';
import {
  checkEmailForm,
  checkMaxLength,
  checkNoWhitespaceOnly,
} from '../../../../validators/form.validators';

export const funnelValidators = {
  profileImage: () => {},
  name: (value: string) => {
    checkNoWhitespaceOnly(value);
    checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.SPACE.NAME);
  },
  visibility: () => {},
  description: (value: string) => {
    checkNoWhitespaceOnly(value);
    checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.SPACE.DESCRIPTION);
  },
  email: (value: string) => {
    checkNoWhitespaceOnly(value);
    checkEmailForm(value);
  },
  instagram: (value: string) => {
    checkNoWhitespaceOnly(value);
  },
};
