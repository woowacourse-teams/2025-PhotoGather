import { useCallback, useEffect, useRef } from 'react';

const useFunnelHistory = <TStep extends string>(
  step: TStep,
  setStep: (step: TStep) => void,
) => {
  const isInitialized = useRef(false);

  const setupHistory = useCallback(() => {
    if (isInitialized.current) return;

    const currentState = {
      funnelStep: step,
      timestamp: Date.now(),
    };

    const currentHistoryState = window.history.state;

    if (currentHistoryState && currentHistoryState.funnelStep === step) {
      window.history.replaceState(currentState, '', window.location.href);
    } else {
      window.history.pushState(currentState, '', window.location.href);
    }

    isInitialized.current = true;
  }, [step]);

  useEffect(() => {
    setupHistory();

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;

      if (state.funnelStep && state.funnelStep !== step) {
        setStep(state.funnelStep);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [step, setStep, setupHistory]);

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
