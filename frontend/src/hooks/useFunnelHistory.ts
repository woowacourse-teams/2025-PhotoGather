import { useCallback, useEffect } from 'react';

const useFunnelHistory = <TStep extends string>(
  step: TStep,
  setStep: (step: TStep) => void,
) => {
  useEffect(() => {
    const currentState = {
      funnelStep: step,
    };
    window.history.replaceState(currentState, '', window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state?.funnelStep && state.funnelStep !== step) {
        setStep(state.funnelStep);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [step, setStep]);

  const navigateToNext = useCallback((nextStepId: string) => {
    const nextState = {
      funnelStep: nextStepId,
      timestamp: Date.now(),
    };
    window.history.pushState(nextState, '', window.location.href);
  }, []);

  return { navigateToNext };
};

export default useFunnelHistory;
