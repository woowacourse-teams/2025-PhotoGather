import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ToastBase } from '../../types/toast.type';
import { useToast } from './useToast';

type AfterAction = () => void;
type RedirectPath = string;
type ToastOptions = Omit<ToastBase, 'text'> & { text?: string };

interface ErrorRequiredProps {
  toast?: ToastOptions;
  afterAction?: AfterAction;
  redirect?: RedirectPath;
}

const useError = () => {
  const [isError, setIsError] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const baseToastSetting = {
    type: 'error',
    position: 'bottom',
  } as const;

  const mappingErrorHandler = {
    toast: (toastBase: ToastBase) => {
      showToast({ ...baseToastSetting, ...toastBase });
    },
    afterAction: (afterAction: AfterAction) => {
      afterAction();
    },
    redirect: (path: RedirectPath) => {
      navigate(path);
    },
  };

  type ErrorType = keyof typeof mappingErrorHandler;

  const runWithErrorHandling = async (
    taskFunction: () => void | Promise<void>,
    errorTypes: ErrorType[],
    context?: ErrorRequiredProps,
  ) => {
    try {
      setIsError(false);
      await Promise.resolve(taskFunction());
    } catch (error) {
      setIsError(true);
      if (!context) return;
      if (!(error instanceof Error)) return;

      if (errorTypes.includes('toast')) {
        const finalToastBase = {
          ...baseToastSetting,
          ...context.toast,
          text: context.toast?.text ?? error.message,
        };
        mappingErrorHandler.toast(finalToastBase);
      }
      if (errorTypes.includes('afterAction') && context.afterAction) {
        mappingErrorHandler.afterAction(context.afterAction);
      }
      if (errorTypes.includes('redirect') && context.redirect) {
        mappingErrorHandler.redirect(context.redirect);
      }
    }
  };

  return { isError, runWithErrorHandling };
};

export default useError;
