import * as Sentry from '@sentry/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TryTaskResultType } from '../../types/common.type';
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

  const errorHandler = {
    toast: (toastBase: ToastBase) => {
      showToast(toastBase);
    },
    afterAction: (afterAction: AfterAction) => {
      afterAction();
    },
    redirect: (path: RedirectPath) => {
      navigate(path);
    },
    console: (message: string) => {
      console.error(message);
    },
  };

  type ErrorType = keyof typeof errorHandler;

  interface TryTaskProps<T> {
    task: () => T | Promise<T>;
    errorActions: ErrorType[];
    context?: ErrorRequiredProps;
    onFinally?: () => void;
    shouldLogToSentry?: boolean;
  }

  const tryTask = async <T>({
    task,
    errorActions,
    context,
    onFinally,
    shouldLogToSentry = false,
  }: TryTaskProps<T>): Promise<TryTaskResultType<T>> => {
    try {
      setIsError(false);
      const data = await Promise.resolve(task());
      return { success: true, data };
    } catch (e) {
      setIsError(true);
      const error = e instanceof Error ? e : new Error(String(e));
      const extraContext = (error as any).sentryContext;
      if (shouldLogToSentry) {
        Sentry.captureException(error, {
          captureContext: extraContext,
        });
      }

      matchingErrorHandler(errorActions, context, error);

      return { success: false, data: null };
    } finally {
      onFinally?.();
    }
  };

  const baseToastSetting = {
    type: 'error',
    position: 'bottom',
  } as const;

  const matchingErrorHandler = (
    errorActions: ErrorType[],
    context: ErrorRequiredProps | undefined,
    error: Error,
  ) => {
    if (errorActions.includes('toast')) {
      const finalToastBase = {
        ...baseToastSetting,
        ...context?.toast,
        text: context?.toast?.text ?? error.message,
      };
      errorHandler.toast(finalToastBase);
    }
    if (errorActions.includes('afterAction') && context?.afterAction) {
      errorHandler.afterAction(context.afterAction);
    }
    if (errorActions.includes('redirect') && context?.redirect) {
      errorHandler.redirect(context.redirect);
    }
    if (errorActions.includes('console')) {
      errorHandler.console(error.message);
    }
  };

  return { isError, tryTask };
};

export default useError;
