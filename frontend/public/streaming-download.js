import { downloadZip } from 'https://cdn.jsdelivr.net/npm/client-zip@2.5.0/index.js';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === '/streaming-download') {
    event.respondWith(handleZipStream(event.request));
  }
});

const handleZipStream = async (request) => {
  const { downloadInfos, zipName } = await request.json();

  const BATCH_SIZE = 20;
  const tempFiles = [];

  for (let i = 0; i < downloadInfos.length; i += BATCH_SIZE) {
    const batchInfos = downloadInfos.slice(i, i + BATCH_SIZE);
    const files = await Promise.all(
      batchInfos.map(async (f) => {
        const response = await fetch(f.url);
        if (!response.ok || !response.body) {
          throw new Error(`다운로드 실패 : ${f.url}`);
        }
        return {
          name: f.originalName,
          input: response.body,
          lastModified: new Date(),
        };
      }),
    );
    tempFiles.push(...files);
  }

  const zipResponse = downloadZip(tempFiles);

  const encodedZipName = encodeURIComponent(zipName);

  return new Response(zipResponse.body, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedZipName}`,
    },
  });
};
