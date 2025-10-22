import { CONSTRAINTS } from '../../../constants/constraints';
import { createSafeValidator } from '../../../utils/validateForm';
import {
  checkEmailForm,
  checkInputEmpty,
  checkInstagramUsernameForm,
  checkMaxLength,
} from '../../../validators/form.validators';

export const editFormValidators = {
  name: {
    maxLength: createSafeValidator((value: string) =>
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.SPACE.NAME),
    ),
    inputEmpty: createSafeValidator((value: string) => checkInputEmpty(value)),
  },
  description: {
    maxLength: createSafeValidator((value: string) =>
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.SPACE.DESCRIPTION),
    ),
  },
  email: {
    email: createSafeValidator((value: string) => checkEmailForm(value)),
  },
  instagramUsername: {
    instagramUsername: createSafeValidator((value: string) =>
      checkInstagramUsernameForm(value),
    ),
  },
};
