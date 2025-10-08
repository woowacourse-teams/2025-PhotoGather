import { CONSTRAINTS } from '../../../constants/constraints';
import {
  checkEmailForm,
  checkInputEmpty,
  checkMaxLength,
} from '../../../validators/form.validators';

export const editFormValidators = {
  profileImage: () => {},
  name: (value: string) => {
    checkMaxLength(value, CONSTRAINTS.NAME_MAX_LENGTH);
    checkInputEmpty(value);
  },
  visibility: () => {},
  description: (value: string) => {
    checkMaxLength(value, CONSTRAINTS.DESCRIPTION_MAX_LENGTH);
    checkInputEmpty(value);
  },
  email: (value: string) => {
    checkEmailForm(value);
  },
  instagram: () => {},
};
