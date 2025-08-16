import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import type { TryTaskResultType } from '../../types/common.type';
import { HttpError } from '../../types/error.type';
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
  }

  // TODO :async 제거
  const tryTask = async <T>({
    task,
    errorActions,
    context,
    onFinally,
  }: TryTaskProps<T>): Promise<TryTaskResultType<T>> => {
    try {
      setIsError(false);
      const data = await Promise.resolve(task());
      return { success: true, data };
    } catch (e) {
      setIsError(true);
      const error = e instanceof Error ? e : new Error(String(e));
      matchingErrorHandler(errorActions, context, error);

      return { success: false, data: null };
    } finally {
      onFinally?.();
    }
  };

  interface TryFetchProps {
    url: string;
    options: RequestInit;
    errorActions: ErrorType[];
    context: ErrorRequiredProps;
  }

  const ERROR_CODES_TO_HANDLE = [401, 403];

  const tryFetch = async ({
    url,
    options,
    errorActions,
    context,
  }: TryFetchProps) => {
    try {
      const response = await fetch(url, options);
      return { success: true, data: response };
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));

      if (
        error instanceof HttpError &&
        ERROR_CODES_TO_HANDLE.includes(error.status)
      ) {
        matchingErrorHandlerByCode(error.status);
        return { success: false, data: null };
      }

      matchingErrorHandler(errorActions, context, error);
      return { success: false, data: null };
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

  const matchingErrorHandlerByCode = (errorCode: number) => {
    if (errorCode === 401) {
      errorHandler.toast({
        ...baseToastSetting,
        text: '로그인이 필요합니다.',
      });
      errorHandler.redirect(ROUTES.LOGIN);
    }
    if (errorCode === 403) {
      errorHandler.toast({
        ...baseToastSetting,
        text: '접근 권한이 없습니다.',
      });
    }

    return;
  };

  return { isError, tryTask, tryFetch };
};

export default useError;
