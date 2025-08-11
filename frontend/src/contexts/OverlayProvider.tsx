import {
  cloneElement,
  createContext,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  useContext,
  useEffect,
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
}

export const OverlayContext = createContext<OverlayOpenFn | null>(null);

const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlayState, setOverlayState] = useState<OverlayState | null>(null);

  const openOverlay: OverlayOpenFn = (children, options) => {
    // 엘리먼트는 필요하지만 number, string, 임의의 객체 및 배열 등의 값은 제외하고 싶을 때
    if (!isValidElement(children)) {
      return Promise.reject(new Error('Invalid element'));
    }

    return new Promise((resolver) => {
      history.pushState({ modal: true }, '');
      // 비동기 -> 모달이 반환할 결과를 기다림
      setOverlayState({
        content: children,
        options: { ...defaultOverlayClickOption, ...(options ?? {}) },
        resolver, // 모달이 닫힐 때의 결과값을 전달하는 함수
      });
    });
  };

  const handleOverlayClose = () => {
    overlayState?.resolver?.(undefined);
    setOverlayState(null);
  };

  const handleSubmitOverlay = (result: unknown) => {
    overlayState?.resolver?.(result);
    setOverlayState(null);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // 모달이 열려있는데 뒤로가기를 해서 이전 페이지로 이동한 경우
      if (overlayState && !event.state?.modal) {
        overlayState?.resolver?.(undefined);
        setOverlayState(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [overlayState]);

  useEffect(() => {
    if (!overlayState) {
      if (history.state?.modal) {
        history.back();
      }
    }
  }, [overlayState]);

  return (
    <OverlayContext.Provider value={openOverlay}>
      {children}
      {overlayState && (
        <Overlay
          onBackdropClick={
            overlayState.options.clickOverlayClose
              ? handleOverlayClose
              : undefined
          }
        >
          {/* 리액트 엘리먼트는 수정할 수 없어서 새 엘리먼트를 생성한것 */}
          {cloneElement(overlayState.content as ReactElement<BaseModalProps>, {
            onClose: handleOverlayClose,
            onSubmit: handleSubmitOverlay,
          })}
        </Overlay>
      )}
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
