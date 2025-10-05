import { useState } from 'react';

interface UseFormProps<T> {
  initialData: T;
  validators: Record<keyof T, (value: string) => void>;
  validateBeforeSubmit?: () => void;
  onSubmit: () => void;
}
const useForm = <T extends Record<string, string | File[]>>({
  initialData,
  validators,
  validateBeforeSubmit,
  onSubmit,
}: UseFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [errorMessage, setErrorMessage] = useState<
    Partial<Record<keyof T, string>>
  >({});

  const changeErrorMessage = (key: keyof T, value: string) => {
    setErrorMessage({
      ...errorMessage,
      [key]: value,
    });
  };

  const checkValid = (name: keyof T, value: string) => {
    try {
      validators[name](value);
      changeErrorMessage(name, '');
    } catch (error) {
      if (error instanceof Error) {
        changeErrorMessage(name, error.message);
        return;
      }
      changeErrorMessage(name, '알 수 없는 오류가 발생했어요');
    }
  };

  const changeFormData = (key: keyof T, value: string | File[]) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value } = e.target;
    if (e.target instanceof HTMLInputElement && type === 'file') {
      changeFormData(name, Array.from(e.target.files || []));
    } else {
      changeFormData(name, value);
    }

    if (validators[name as keyof T]) {
      checkValid(name, value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateBeforeSubmit) {
      validateBeforeSubmit();
    }
    console.log('formData', formData);
    onSubmit();
  };

  return { formData, handleChange, handleSubmit, errorMessage };
};
export default useForm;
