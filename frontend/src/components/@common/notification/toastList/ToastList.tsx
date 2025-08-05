import type { Toast } from '../../../../types/toast.type';
import { Toast as ToastComponent } from '../toast/Toast';
import * as S from './ToastList.styles';

interface ToastListProps {
  toasts: Toast[];
}

export const ToastList = ({ toasts }: ToastListProps) => {
  return (
    <S.ToastList>
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          text={toast.text}
          type={toast.type}
          duration={toast.duration}
        />
      ))}
    </S.ToastList>
  );
};
