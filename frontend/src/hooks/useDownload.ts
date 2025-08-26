import { downloadZip } from "client-zip";
import { useState } from "react";
import { photoService } from "../apis/services/photo.service";
import type { DownloadInfo } from "../types/photo.type";
import { checkSelectedPhotoExist } from "../validators/photo.validator";
import useError from "./@common/useError";

interface UseDownloadProps {
	spaceCode: string;
	spaceName: string;
	onDownloadSuccess?: () => void;
}

const useDownload = ({
	spaceCode,
	spaceName,
	onDownloadSuccess,
}: UseDownloadProps) => {
	const [isDownloading, setIsDownloading] = useState(false);
	const [totalProgress, setTotalProgress] = useState(0);
	const [currentProgress, setCurrentProgress] = useState(0);

	const { tryTask, tryFetch } = useError();

	const downloadAsImage = async (url: string, fileName: string) => {
		const response = await fetch(url);
		const blob = await response.blob();

		const objectUrl = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = objectUrl;
		const safeFileName = fileName.replace(/[/\\:*?"<>|]/g, "_");
		link.download = `${safeFileName}`;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(objectUrl);
	};

	const downloadAsZip = async (downloadInfos: DownloadInfo[]) => {
		const CHUNK_SIZE = 5;
		const files: {
			name: string;
			input: Blob;
			lastModified: Date;
		}[] = [];

		for (let i = 0; i < downloadInfos.length; i += CHUNK_SIZE) {
			const batch = downloadInfos.slice(i, i + CHUNK_SIZE);

			const results = await Promise.allSettled(
				batch.map(async (downloadInfo) => {
					const response = await fetch(downloadInfo.url);
					if (!response.ok) {
						throw new Error(`다운로드 실패: ${downloadInfo.originalName}`);
					}
					const blob = await response.blob();
					setCurrentProgress((prev) => prev + 1);

					return {
						name: downloadInfo.originalName,
						input: blob,
						lastModified: new Date(),
					};
				}),
			);

			if (results.some((r) => r.status === "rejected")) {
				throw new Error("다운로드가 실패했습니다. 다시 시도해 주세요.");
			}
			results.map((result) => {
				if (result.status === "fulfilled") {
					files.push({
						name: result.value.name,
						input: result.value.input,
						lastModified: result.value.lastModified,
					});
				}
			});
		}

		const zipBlob = await downloadZip(files).blob();
		const link = document.createElement("a");
		link.href = URL.createObjectURL(zipBlob);
		link.download = `${spaceName}.zip`;
		link.click();
		URL.revokeObjectURL(link.href);
	};

	const trySelectedDownload = async (photoIds: number[]) => {
		const taskResult = tryTask({
			task: () => checkSelectedPhotoExist(photoIds),
			errorActions: ["toast"],
		});
		if (!taskResult.success) return;

		await tryFetch({
			task: async () => {
				setIsDownloading(true);
				const response = await photoService.downloadPhotos(spaceCode, {
					photoIds: photoIds,
				});
				if (!response.data) return;
				const data = response.data;
				const { downloadUrls } = data;

				if (downloadUrls.length === 1) {
					await downloadAsImage(
						downloadUrls[0].url,
						downloadUrls[0].originalName,
					);
					return;
				}

				setTotalProgress(downloadUrls.length);
				await downloadAsZip(downloadUrls);
			},
			errorActions: ["toast"],
			context: {
				toast: {
					text: "다운로드에 실패했습니다. 다시 시도해 주세요.",
					type: "error",
				},
			},
			onFinally: () => {
				setTotalProgress(0);
				setCurrentProgress(0);
				setIsDownloading(false);
			},
		});
	};

	const trySingleDownload = async (photoId: number) => {
		await tryFetch({
			task: async () => {
				const response = await photoService.downloadSinglePhoto(
					spaceCode,
					photoId,
				);
				if (!response.data) return;
				const { downloadUrls } = response.data;

				await downloadAsImage(
					downloadUrls[0].url,
					downloadUrls[0].originalName,
				);
			},
			errorActions: ["toast"],
			context: {
				toast: {
					text: "다운로드에 실패했습니다. 다시 시도해 주세요.",
					type: "error",
				},
			},
			onFinally: () => {
				setIsDownloading(false);
			},
		});
	};

	const tryAllDownload = async () => {
		await tryFetch({
			task: async () => {
				setIsDownloading(true);
				const response = await photoService.downloadAll(spaceCode);

				if (!response.data) return;
				const data = response.data;
				const { downloadUrls } = data;

				setTotalProgress(downloadUrls.length);
				await downloadAsZip(downloadUrls);

				onDownloadSuccess?.();
			},
			errorActions: ["toast"],
			context: {
				toast: {
					text: "다운로드에 실패했습니다. 다시 시도해 주세요.",
					type: "error",
				},
			},
			onFinally: () => {
				setTotalProgress(0);
				setCurrentProgress(0);
				setIsDownloading(false);
			},
		});
	};

	return {
		isDownloading,
		tryAllDownload,
		trySingleDownload,
		trySelectedDownload,
		totalProgress,
		currentProgress,
	};
};

export default useDownload;
