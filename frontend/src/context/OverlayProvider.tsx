import {
  cloneElement,
  createContext,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useContext,
  useState,
} from 'react';
import Overlay from '../components/@common/overlay/Overlay';

const defaultOverlayClickOption = {
  clickOverlayClose: false,
};

export type OverlaySubmitResult = unknown;

export type OverlayOption = {
  clickOverlayClose?: boolean;
};

export type OverlayOpenFn = (
  children: ReactNode,
  option?: OverlayOption,
) => Promise<OverlaySubmitResult> | null;

export const OverlayContext = createContext<OverlayOpenFn | null>(null);

interface OverlayChildProps {
  onClose?: () => void;
  onSubmit?: (result: OverlaySubmitResult) => void;
}

interface OverlayState {
  content: ReactNode;
  options: OverlayOption;
  resolver?: (value: OverlaySubmitResult) => void;
}

const OverlayProvider = ({ children }: PropsWithChildren) => {
  const [overlay, setOverlay] = useState<OverlayState | null>(null);

  const openOverlay: OverlayOpenFn = (children, option) => {
    // 엘리먼트는 필요하지만 number, string, 임의의 객체 및 배열 등의 값은 제외하고 싶을 때
    if (isValidElement(children)) {
      return new Promise((resolver) => {
        // 비동기 -> 모달이 반환할 결과를 기다림
        setOverlay({
          content: children,
          options: { ...defaultOverlayClickOption, ...(option ?? {}) },
          resolver, // 모달이 닫힐 때의 결과값을 전달하는 함수
        });
      });
    }
    return null;
  };

  const handleOverlayClose = () => {
    setOverlay(null);
  };

  const handleSubmitOverlay = (result: OverlaySubmitResult) => {
    overlay?.resolver?.(result);
    handleOverlayClose();
  };

  return (
    <OverlayContext.Provider value={openOverlay}>
      {children}
      {overlay && (
        <Overlay
          onClose={handleOverlayClose}
          closeOnOverlayClick={overlay.options.clickOverlayClose ?? false}
        >
          {/* 리액트 엘리먼트는 수정할 수 없어서 새 엘리먼트를 생성한것 */}
          {cloneElement(overlay.content as ReactElement<OverlayChildProps>, {
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
