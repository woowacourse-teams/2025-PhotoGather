import useIntersectionObserver from '../../@common/useIntersectionObserver';

const useScrollUITriggers = () => {
  const { targetRef: hideBlurAreaTriggerRef, isIntersecting: isAtPageBottom } =
    useIntersectionObserver({});
  const { targetRef: scrollTopTriggerRef, isIntersecting: isAtPageTop } =
    useIntersectionObserver({ isInitialInView: true });

  return {
    hideBlurAreaTriggerRef,
    scrollTopTriggerRef,
    isAtPageBottom,
    isAtPageTop,
  };
};

export default useScrollUITriggers;
