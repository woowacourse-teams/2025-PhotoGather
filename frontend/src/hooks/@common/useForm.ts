import { useState } from 'react';

interface UseFormProps<T> {
  initialData: T;
  validators: Record<keyof T, (value: string) => void>;
  onSubmit: () => void;
}
const useForm = <T extends object>({
  initialData,
  validators,
  onSubmit,
}: UseFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [errorMessage, setErrorMessage] = useState<
    Partial<Record<keyof T, string>>
  >({});

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

  const checkAllValid = (): boolean => {
    let isValid = true;
    const newErrorMessages: Partial<Record<keyof T, string>> = {};

    (Object.keys(formData) as Array<keyof T>).forEach((name) => {
      if (validators[name] && typeof formData[name] === 'string') {
        try {
          validators[name](formData[name]);
          newErrorMessages[name] = '';
        } catch (error) {
          isValid = false;
          if (error instanceof Error) {
            newErrorMessages[name] = error.message;
          } else {
            newErrorMessages[name] = '알 수 없는 오류가 발생했어요';
          }
        }
      }
    });

    setErrorMessage(newErrorMessages);
    return isValid;
  };

  const changeErrorMessage = (key: keyof T, value: string) => {
    setErrorMessage({
      ...errorMessage,
      [key]: value,
    });
  };

  const changeFormData = <K extends keyof T>(key: K, value: T[K]) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value } = e.target;
    const key = name as keyof T;

    if (e.target instanceof HTMLInputElement && type === 'file') {
      changeFormData(key, Array.from(e.target.files || []) as T[keyof T]);
    } else {
      changeFormData(key, value as T[keyof T]);
    }

    if (validators[key]) {
      checkValid(key, value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = checkAllValid();
    if (isValid) {
      onSubmit();
    }
  };

  return { formData, changeFormData, handleChange, handleSubmit, errorMessage };
};
export default useForm;
