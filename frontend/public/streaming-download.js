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
    return;
  }
});

const sendDownloadProgress = async (completed, total) => {
  const clients = await self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window',
  });
  clients.forEach((client) => {
    client.postMessage({
      type: 'DOWNLOAD_PROGRESS',
      completed: completed,
      total: total,
    });
  });
};

async function* downloadFilesGenerator(downloadInfos) {
  let completedFetches = 0;
  for (const info of downloadInfos) {
    const response = await fetch(info.url);
    if (!response.ok || !response.body) {
      throw new Error(`다운로드 실패 : ${info.url}`);
    }
    completedFetches++;
    await sendDownloadProgress(completedFetches, downloadInfos.length);
    yield {
      name: info.originalName,
      input: response.body,
      lastModified: new Date(),
    };
  }
}

const handleZipStream = async (request) => {
  const { downloadInfos, zipName } = await request.json();

  const files = downloadFilesGenerator(downloadInfos);

  const zipResponse = downloadZip(files);
  const encodedZipName = encodeURIComponent(zipName);

  return new Response(zipResponse.body, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedZipName}`,
    },
  });
};
