import { useState } from 'react';
import useFunnelHistory from './useFunnelHistory';

interface FunnelStepProps<T> {
  name: T;
  children: React.ReactNode;
}

const useFunnel = <Step extends string>(initialStep: Step) => {
  const [funnelStep, setFunnelStep] = useState<Step>(initialStep);

  const { navigateToNext } = useFunnelHistory<Step>(funnelStep, setFunnelStep);

  const goNextStep = (nextStep: Step) => {
    navigateToNext(nextStep);
    setFunnelStep(nextStep);
  };

  const Step = ({ name, children }: FunnelStepProps<Step>) => {
    if (funnelStep === name) return children;
    return null;
  };

  return { Step, funnelStep, setFunnelStep, goNextStep };
};

export default useFunnel;
