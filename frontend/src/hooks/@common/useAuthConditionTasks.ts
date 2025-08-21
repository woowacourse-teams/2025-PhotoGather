import { useEffect } from 'react';
import { CookieUtils } from '../../utils/CookieUtils';

interface UseAuthConditionTasksProps {
  taskWhenAuth?: () => void;
  taskWhenNoAuth?: () => void;
}

const useAuthConditionTasks = ({
  taskWhenAuth,
  taskWhenNoAuth,
}: UseAuthConditionTasksProps) => {
  const hasAuth = CookieUtils.has('access');

  useEffect(() => {
    if (hasAuth) taskWhenAuth?.();
    else taskWhenNoAuth?.();
  }, [hasAuth, taskWhenAuth, taskWhenNoAuth]);
};

export default useAuthConditionTasks;
