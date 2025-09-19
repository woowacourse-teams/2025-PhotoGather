import { downloadZip } from 'https://cdn.jsdelivr.net/npm/client-zip@2.5.0/index.js';

let cachedDownloadInfos = [];
let cachedZipName = 'cached.zip';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'START_ZIP') {
    cachedDownloadInfos = event.data.downloadInfos;
    cachedZipName = event.data.zipName;
    event.source.postMessage({ type: 'READY' });
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === '/streaming-download') {
    console.log('fetch작동');
    event.respondWith(handleZipStream());
  }
});

const handleZipStream = async () => {
  const BATCH_SIZE = 20;
  const tempFiles = [];
  console.log('작동', cachedDownloadInfos);
  for (let i = 0; i < cachedDownloadInfos.length; i += BATCH_SIZE) {
    console.log(`${i}번째 루프`);
    const batchInfos = cachedDownloadInfos.slice(i, i + BATCH_SIZE);

    // 진행률 포함
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

  return new Response(zipResponse.body, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${cachedZipName}"`,
    },
  });
};
