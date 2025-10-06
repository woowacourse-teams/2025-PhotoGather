export const validateCanWebShare = () => {
  if (!navigator.canShare || !navigator.share)
    throw new Error('공유 기능을 지원하지 않는 브라우저에요.');
};

export const validateCanShareFile = (files?: File[]) => {
  if (files && !navigator.canShare({ files }))
    throw new Error('파일 중 공유를 할 수 없는 파일이 있습니다.');
};
