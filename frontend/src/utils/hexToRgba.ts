export const hexToRgba = (hex: string, alpha = 1) => {
  const rawHex = hex.replace('#', '');

  const r = parseInt(rawHex.slice(0, 2), 16);
  const g = parseInt(rawHex.slice(2, 4), 16);
  const b = parseInt(rawHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
