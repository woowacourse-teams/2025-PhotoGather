import { createContext } from 'react';
import useIntersectionObserver from '../hooks/@common/useIntersectionObserver';

interface ManagerScaffoldContextType {
  /** 최상위 이동 트리거 영역 */
  scrollTopTriggerRef: React.RefObject<HTMLDivElement | null>;
  isAtPageTop: boolean;
  /** 블러 영역 이동 트리거 영역 */
  hideBlurAreaTriggerRef: React.RefObject<HTMLDivElement | null>;
  isAtPageBottom: boolean;
  /** 이미지 리스트 페칭 트리거 영역 */
  fetchTriggerRef: React.RefObject<HTMLDivElement | null>;
  isFetchSectionVisible: boolean;
  reObserve: () => void;
}

export const ManagerScaffoldContext =
  createContext<ManagerScaffoldContextType | null>(null);

export const ManagerScaffoldProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { targetRef: hideBlurAreaTriggerRef, isIntersecting: isAtPageBottom } =
    useIntersectionObserver({});
  const { targetRef: scrollTopTriggerRef, isIntersecting: isAtPageTop } =
    useIntersectionObserver({ isInitialInView: true });
  const {
    targetRef: fetchTriggerRef,
    isIntersecting: isFetchSectionVisible,
    reObserve,
  } = useIntersectionObserver({ rootMargin: '200px' });

  const contextValue = {
    scrollTopTriggerRef,
    isAtPageTop,
    hideBlurAreaTriggerRef,
    fetchTriggerRef,
    isFetchSectionVisible,
    reObserve,
    isAtPageBottom,
  };

  return (
    <ManagerScaffoldContext.Provider value={contextValue}>
      {children}
    </ManagerScaffoldContext.Provider>
  );
};
