import type { Toast, ToastListPosition } from '../../../../types/toast.type';
import { Toast as ToastComponent } from '../toast/Toast';
import * as S from './ToastList.styles';

interface ToastListProps {
  toasts: Toast[];
}

const toastListPosition: ToastListPosition[] = ['top', 'bottom'];

export const ToastList = ({ toasts }: ToastListProps) => {
  return (
    <>
      {toastListPosition.map((position) => (
        <S.ToastList key={position} $position={position}>
          {toasts
            .filter((toast) => toast.position === position)
            .map(({ id, text, type, duration }) => (
              <ToastComponent
                key={id}
                text={text}
                type={type}
                duration={duration}
              />
            ))}
        </S.ToastList>
      ))}
    </>
  );
};
