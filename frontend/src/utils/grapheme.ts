const segmenter = new Intl.Segmenter('und', { granularity: 'grapheme' });

export const calculateValidLength = (text: string) => {
  const graphemes = Array.from(segmenter.segment(text), (s) => s.segment);
  return graphemes.length;
};
