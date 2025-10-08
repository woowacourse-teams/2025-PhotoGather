const segmenter = new Intl.Segmenter('und', { granularity: 'grapheme' });

export const calculateValidLength = (text: string) => {
  return Array.from(segmenter.segment(text), (s) => s.segment).length;
};
