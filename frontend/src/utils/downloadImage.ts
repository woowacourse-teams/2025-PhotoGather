export const downloadAsImage = async (url: string, fileName: string) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  const safeFileName = fileName.replace(/[/\\:*?"<>|]/g, '_');
  link.download = `${safeFileName}`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(objectUrl);
};
