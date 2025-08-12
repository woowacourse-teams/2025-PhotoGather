import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ToastBase } from '../../types/toast.type';
import { useToast } from './useToast';

interface ToastContext {
  toastContext: ToastBase;
}

interface ToastActionContext extends ToastContext {
  afterAction: () => void;
}

interface RedirectContext {
  path: string;
}

interface ContextMap {
  toast: ToastContext;
  toastAction: ToastActionContext;
  redirect: RedirectContext;
}

type Handlers = {
  [K in keyof ContextMap]: (context: ContextMap[K]) => void;
};

const useError = () => {
  const mappingErrorHandler: Handlers = {
    toast: ({ toastContext }: ToastContext) => {
      showToast(toastContext);
    },
    toastAction: ({ toastContext, afterAction }: ToastActionContext) => {
      showToast(toastContext);
      afterAction();
    },
    redirect: ({ path }: RedirectContext) => {
      navigate(path);
    },
  };

  type ErrorType = keyof typeof mappingErrorHandler;

  const [isError, setIsError] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const runWithErrorHandling = async <K extends ErrorType>(
    taskFunction: () => void | Promise<void>,
    errorType: K,
    context?: ContextMap[K],
  ) => {
    try {
      setIsError(false);
      await Promise.resolve(taskFunction());
    } catch (_error) {
      setIsError(true);
      if (context) {
        mappingErrorHandler[errorType](context);
      }
    }
  };

  return { isError, runWithErrorHandling };
};

export default useError;
