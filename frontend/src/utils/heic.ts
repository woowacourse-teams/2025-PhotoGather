import heic2any from 'heic2any';

export const isHeic = (file: File) => {
  const HEIC_RE = /\.(heic|heif)$/i;
  return /image\/hei(c|f)/i.test(file.type) || HEIC_RE.test(file.name);
};

export const heicToJpegBlob = async (file: File) => {
  const output = await heic2any({
    blob: file,
    toType: 'image/jpeg',
  });
  const convertedJpeg = Array.isArray(output) ? output[0] : output;
  return convertedJpeg as Blob;
};
