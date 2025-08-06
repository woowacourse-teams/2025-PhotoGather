import type { Toast } from '../../../../types/toast.type';
import { Toast as ToastComponent } from '../toast/Toast';
import * as S from './ToastList.styles';

interface ToastListProps {
  toasts: Toast[];
}

export const ToastList = ({ toasts }: ToastListProps) => {
  return (
    <S.ToastList>
      {toasts.map(({ id, text, type, duration }) => (
        <ToastComponent key={id} text={text} type={type} duration={duration} />
      ))}
    </S.ToastList>
  );
};
