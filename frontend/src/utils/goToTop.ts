export const goToTop = () => {
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
};
