import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import type { TryTaskResultType } from '../../types/common.type';
import { HttpError } from '../../types/error.type';
import type { ToastBase } from '../../types/toast.type';
import { useToast } from './useToast';

interface AfterAction {
  action: () => void;
}
interface RedirectPath {
  path: string;
}
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
      afterAction.action();
    },
    redirect: (path: RedirectPath) => {
      navigate(path.path);
    },
    console: (error: Error) => {
      console.error(error);
    },
  };

  type ErrorType = keyof typeof errorHandler;

  interface TryTaskProps<T> {
    task: () => T;
    errorActions: ErrorType[];
    context?: ErrorRequiredProps;
    onFinally?: () => void;
  }

  const tryTask = <T>({
    task,
    errorActions,
    context,
    onFinally,
  }: TryTaskProps<T>): TryTaskResultType<T> => {
    try {
      setIsError(false);
      const data = task();
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

  interface TryFetchProps<T> {
    task: () => Promise<T>;
    errorActions: ErrorType[];
    context?: ErrorRequiredProps;
    onFinally?: () => void;
  }

  const ERROR_CODES_TO_HANDLE = [401, 403];

  const tryFetch = async <T>({
    task,
    errorActions,
    context,
    onFinally,
  }: TryFetchProps<T>) => {
    try {
      const response = await task();
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
      const redirectPath = context.redirect;
      errorHandler.redirect(redirectPath);
    }
    if (errorActions.includes('console')) {
      errorHandler.console(error);
    }
  };

  const matchingErrorHandlerByCode = (errorCode: number) => {
    if (errorCode === 401) {
      errorHandler.toast({
        ...baseToastSetting,
        text: '로그인이 필요합니다.',
      });
      errorHandler.redirect({ path: ROUTES.LOGIN });
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
