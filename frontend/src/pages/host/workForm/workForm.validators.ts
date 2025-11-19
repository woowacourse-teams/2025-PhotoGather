import { CONSTRAINTS } from '../../../constants/constraints';
import { createSafeValidator } from '../../../utils/validateForm';
import {
  checkInputEmpty,
  checkMaxLength,
  checkYoutubeUrlForm,
} from '../../../validators/form.validators';

export const workFormValidators = {
  title: {
    maxLength: createSafeValidator((value: string) =>
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.WORK.TITLE),
    ),
    inputEmpty: createSafeValidator((value: string) => checkInputEmpty(value)),
  },
  category: {
    maxLength: createSafeValidator((value: string) =>
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.WORK.CATEGORY),
    ),
  },
  designer: {
    maxLength: createSafeValidator((value: string) =>
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.WORK.DESIGNER),
    ),
  },
  description: {
    maxLength: createSafeValidator((value: string) =>
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.WORK.DESCRIPTION),
    ),
    inputEmpty: createSafeValidator((value: string) => checkInputEmpty(value)),
  },
  videoUrl: {
    maxLength: createSafeValidator((value: string) =>
      checkMaxLength(value, CONSTRAINTS.MAX_LENGTH.WORK.VIDEO_URL),
    ),
    isYoutubeUrl: createSafeValidator((value: string) => {
      checkYoutubeUrlForm(value);
    }),
  },
};
