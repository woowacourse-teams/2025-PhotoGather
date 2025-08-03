import { useCallback, useEffect, useRef } from 'react';

interface UseFunnelHistoryProps {
  stepId: string;
  onPrev?: () => void;
}

const useFunnelHistory = ({
  stepId,
  onPrev = () => {},
}: UseFunnelHistoryProps) => {
  const isInitialized = useRef(false);

  const setupHistory = useCallback(() => {
    if (isInitialized.current) return;

    const currentState = {
      funnelStep: stepId,
      timestamp: Date.now(),
    };

    const currentHistoryState = window.history.state;

    if (!currentHistoryState || currentHistoryState.funnelStep !== stepId) {
      window.history.pushState(currentState, '', window.location.href);
    } else {
      window.history.replaceState(currentState, '', window.location.href);
    }

    isInitialized.current = true;
  }, [stepId]);

  const handlePopState = useCallback(
    (event: PopStateEvent) => {
      const state = event.state;

      if (!state || !state.funnelStep || state.funnelStep !== stepId) {
        onPrev();
      }
    },
    [onPrev, stepId],
  );

  useEffect(() => {
    setupHistory();

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setupHistory, handlePopState]);

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
