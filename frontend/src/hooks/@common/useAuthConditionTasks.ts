import { useEffect } from 'react';
import { AUTH_COOKIES } from '../../constants/keys';
import { CookieUtils } from '../../utils/CookieUtils';

interface UseAuthConditionTasksProps {
  taskWhenAuth?: () => void;
  taskWhenNoAuth?: () => void;
}

const useAuthConditionTasks = ({
  taskWhenAuth,
  taskWhenNoAuth,
}: UseAuthConditionTasksProps) => {
  const hasAuth = CookieUtils.has(AUTH_COOKIES.ACCESS);

  useEffect(() => {
    if (hasAuth) taskWhenAuth?.();
    else taskWhenNoAuth?.();
  }, [hasAuth, taskWhenAuth, taskWhenNoAuth]);
};

export default useAuthConditionTasks;
