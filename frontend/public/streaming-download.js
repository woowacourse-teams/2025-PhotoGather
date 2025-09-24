import { downloadZip } from 'https://cdn.jsdelivr.net/npm/client-zip@2.5.0/index.js';

let isDownloading = false;
let reloadFlag = false;

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'STOP_DOWNLOAD') {
    reloadFlag = true;
    isDownloading = false;
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === '/streaming-download') {
    console.log('Fetch 시작');

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
    if (reloadFlag) {
      throw new Error('다운로드 중 새로고침 발생');
    }
    const response = await fetch(info.url);
    if (!response.ok || !response.body) {
      throw new Error(`다운로드 실패 : ${info.url}`);
    }
    completedFetches++;
    await sendDownloadProgress(completedFetches, downloadInfos.length);
    yield {
      name: info.originalName,
      input: response.clone().body,
      lastModified: new Date(),
    };
  }
}

const handleZipStream = async (request) => {
  if (isDownloading) {
    return new Response('이미 다운로드 중입니다.', { status: 400 });
  }
  if (request.method !== 'POST') {
    return new Response('POST 요청만 허용합니다.', { status: 400 });
  }
  try {
    isDownloading = true;
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
  } catch (error) {
    throw new Error(`개별 fetch 중 다운로드 실패, ${error}`);
  } finally {
    isDownloading = false;
  }
};
