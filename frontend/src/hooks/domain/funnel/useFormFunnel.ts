import { useState } from 'react';
import useFunnel from './useFunnel.tsx';

const useFormFunnel = <Step extends string, Form>(
  initialStep: Step,
  initialFormData: Form,
) => {
  const funnel = useFunnel(initialStep);
  const [form, setForm] = useState<Form>(initialFormData);

  const updateFormData = (updates: Partial<Form>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const goNextWithData = (nextStep: Step, data: Partial<Form>) => {
    updateFormData(data);
    funnel.goNextStep(nextStep);
  };

  return {
    ...funnel,
    form,
    updateFormData,
    goNextWithData,
  };
};

export default useFormFunnel;
