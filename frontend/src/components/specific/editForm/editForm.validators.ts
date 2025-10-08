import { CONSTRAINTS } from '../../../constants/constraints';
import { createSafeValidator } from '../../../utils/validateForm';
import {
  checkEmailForm,
  checkInputEmpty,
  checkMaxLength,
} from '../../../validators/form.validators';

export const editFormValidators = {
  name: {
    maxLength: createSafeValidator((value: string) =>
      checkMaxLength(value, CONSTRAINTS.NAME_MAX_LENGTH),
    ),
    inputEmpty: createSafeValidator((value: string) => checkInputEmpty(value)),
  },
  description: {
    maxLength: createSafeValidator((value: string) =>
      checkMaxLength(value, CONSTRAINTS.DESCRIPTION_MAX_LENGTH),
    ),
    inputEmpty: createSafeValidator((value: string) => checkInputEmpty(value)),
  },
  email: {
    email: createSafeValidator((value: string) => checkEmailForm(value)),
  },
};
