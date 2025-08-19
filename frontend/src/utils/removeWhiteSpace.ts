export const removeWhiteSpace = (text: string) => {
  console.log(text, text.replace(/\s+/g, ''));
  return text.replace(/\s+/g, '');
};
