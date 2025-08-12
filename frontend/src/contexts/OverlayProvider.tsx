import {
  cloneElement,
  createContext,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Overlay from '../components/@common/overlay/Overlay';
import type { BaseModalProps } from '../types/modal.type';

const defaultOverlayClickOption = {
  clickOverlayClose: false,
};

type OverlaySubmitResult = unknown;

type OverlayOptions = {
  clickOverlayClose?: boolean;
};

type OverlayOpenFn = (
  children: ReactElement,
  options?: OverlayOptions,
) => Promise<OverlaySubmitResult>;

interface OverlayState {
  content: ReactElement;
  options: OverlayOptions;
  resolver?: (value: OverlaySubmitResult) => void;
  id: number;
}

export const OverlayContext = createContext<OverlayOpenFn | null>(null);

const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlayStack, setOverlayStack] = useState<OverlayState[]>([]);
  const nextIdRef = useRef(0);

  const openOverlay: OverlayOpenFn = (children, options) => {
    // 엘리먼트는 필요하지만 number, string, 임의의 객체 및 배열 등의 값은 제외하고 싶을 때
    if (!isValidElement(children)) {
      return Promise.reject(new Error('Invalid element'));
    }

    return new Promise((resolver) => {
      const id = nextIdRef.current++;

      setOverlayStack((prev) => {
        // 첫 번째 모달일 때만 history push
        if (prev.length === 0) {
          history.pushState({ modal: true }, '');
        }
        
        return [
          ...prev,
          {
            content: children,
            options: { ...defaultOverlayClickOption, ...(options ?? {}) },
            resolver, // 모달이 닫힐 때의 결과값을 전달하는 함수
            id,
          },
        ];
      });
    });
  };

  const handleOverlayClose = (id: number) => {
    setOverlayStack((prev) => {
      const overlay = prev.find((overlayState) => overlayState.id === id);
      overlay?.resolver?.(undefined);
      return prev.filter((overlayState) => overlayState.id !== id);
    });
  };

  const handleSubmitOverlay = (id: number, result: unknown) => {
    setOverlayStack((prev) => {
      const overlay = prev.find((o) => o.id === id);
      overlay?.resolver?.(result);
      return prev.filter((o) => o.id !== id);
    });
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // 모달이 열려있는데 뒤로가기를 해서 이전 페이지로 이동한 경우
      if (overlayStack.length > 0 && !event.state?.modal) {
        overlayStack.forEach((overlay) => {
          overlay.resolver?.(undefined);
        });
        setOverlayStack([]);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [overlayStack]);

  useEffect(() => {
    if (overlayStack.length === 0) {
      if (history.state?.modal) {
        history.back();
      }
    }
  }, [overlayStack.length]);

  return (
    <OverlayContext.Provider value={openOverlay}>
      {children}
      {overlayStack.map((overlayState, index) => (
        <Overlay
          key={overlayState.id}
          onBackdropClick={
            index === overlayStack.length - 1 &&
            overlayState.options.clickOverlayClose
              ? () => handleOverlayClose(overlayState.id)
              : undefined
          }
        >
          {/* 리액트 엘리먼트는 수정할 수 없어서 새 엘리먼트를 생성한것 */}
          {cloneElement(overlayState.content as ReactElement<BaseModalProps>, {
            onClose: () => handleOverlayClose(overlayState.id),
            onSubmit: (result: unknown) =>
              handleSubmitOverlay(overlayState.id, result),
          })}
        </Overlay>
      ))}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;

export const useOverlay = () => {
  const context = useContext(OverlayContext);

  if (context === null) {
    throw new Error('useOverlay is only available within OverlayProvider.');
  }

  return context;
};
