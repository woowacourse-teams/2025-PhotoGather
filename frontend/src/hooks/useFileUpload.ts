import { useState } from "react";
import { photoService } from "../apis/services/photo.service";
import { FAILED_GUEST_ID } from "../constants/errors";
import type { LocalFile, UploadFile } from "../types/file.type";
import useError from "./@common/useError";

interface Batch {
	id: number;
	total: number;
	success: number;
	failed: number;
	uploadFiles: UploadFile[];
}

interface Session {
	total: number;
	success: number;
	failed: number;
	batches: Batch[];
}

// TODO: progress를 따로 관리하도록 설계
// TODO: reducer로 상태값 변경하도록 리팩토링

interface UseFileUploadProps {
	spaceCode: string;
	localFiles: LocalFile[];
	onUploadSuccess: () => void;
	clearFiles: () => void;
	nickName: string;
	guestId: number;
	tryCreateNickName: () => Promise<number>;
}
const useFileUpload = ({
	spaceCode,
	localFiles,
	onUploadSuccess,
	clearFiles,
	nickName,
	guestId,
	tryCreateNickName,
}: UseFileUploadProps) => {
	const [, setUploadFiles] = useState<UploadFile[]>([]);
	const [, setBatches] = useState<Batch[]>();
	const [session, setSession] = useState<Session>();
	const [isUploading, setIsUploading] = useState(false);
	const { tryFetch } = useError();
	const [progress, setProgress] = useState(0);

	//TODO: 진행률 확인하고 제거
	// useEffect(() => {
	//   console.log(session);
	// }, [session]);

	const ensureGuestId = async () => {
		if (guestId && guestId !== FAILED_GUEST_ID) return guestId;

		const newGuestId = await tryCreateNickName();
		if (!newGuestId) return FAILED_GUEST_ID;

		return newGuestId;
	};

	const createUploadFiles = (localFiles: LocalFile[]) => {
		const newUploadFiles: UploadFile[] = localFiles.map((file) => {
			const extension = file.originFile.name.split(".").pop();
			const objectKey = `${crypto.randomUUID()}.${extension}`;

			return {
				id: file.id,
				originFile: file.originFile,
				objectKey,
				capturedAt: file.capturedAt,
				capacityValue: file.capacityValue,
				presignedUrl: "",
				state: "idle",
			};
		});

		setUploadFiles(newUploadFiles);
		return newUploadFiles;
	};

	const createBatches = (uploadFiles: UploadFile[]) => {
		// 100개 단위로 나누어 배치 생성
		const chunkSize = 100;
		const newBatches = Array.from(
			{ length: Math.ceil(uploadFiles.length / chunkSize) },
			(_, i) => {
				const chunk = uploadFiles.slice(i * chunkSize, (i + 1) * chunkSize);
				return {
					id: i * chunkSize,
					total: chunk.length,
					success: 0,
					failed: 0,
					uploadFiles: chunk,
				};
			},
		);

		setBatches(newBatches);
		return newBatches;
	};

	// uploadFiles, batches, session 초기화
	const createSession = (localFiles: LocalFile[]) => {
		const newFiles = createUploadFiles(localFiles);
		const newBatches = createBatches(newFiles);

		const newSession: Session = {
			total: localFiles.length,
			success: 0,
			failed: 0,
			batches: newBatches,
		};
		setSession(newSession);
		return newSession;
	};

	const fetchPresignedUrls = async (uploadFiles: UploadFile[]) => {
		const objectKeys = uploadFiles.map((f) => f.objectKey);
		const res = await photoService.getPresignedUrls(spaceCode, objectKeys);
		if (!res || !res.data?.signedUrls)
			throw new Error("presignedUrl 발급 실패");
		return res.data.signedUrls as Record<string, string>;
	};

	const addPresignedUrls = (
		presignedUrls: Record<string, string>,
		targetFiles: UploadFile[],
	) => {
		const updated = targetFiles.map(
			(file): UploadFile => ({
				...file,
				presignedUrl: presignedUrls[file.objectKey] ?? "",
				state: "signed" as const,
			}),
		);

		setUploadFiles((prev) =>
			prev.map((f) => {
				const found = updated.find((u) => u.id === f.id);
				return found ?? f;
			}),
		);

		return updated;
	};

	const notifySuccessFiles = async (
		successFiles: UploadFile[],
		validGuestId: number,
		nickName: string,
	) => {
		if (successFiles.length !== localFiles.length) {
			throw new Error("성공한 파일이 없습니다.");
		}

		const uploadedPhotos = successFiles.map((file) => ({
			uploadFileName: file.objectKey,
			originalName: file.originFile.name,
			capturedAt: file.capturedAt,
			capacityValue: file.capacityValue,
		}));

		const response = await tryFetch({
			task: async () =>
				await photoService.notifyUploadComplete(
					spaceCode,
					uploadedPhotos,
					validGuestId,
					nickName,
				),
			errorActions: ["console"],
		});

		if (!response.success) {
			throw new Error("서버에게 성공 알림에 실패했습니다.");
		}
	};

	const uploadToS3 = async (updatedBatchFiles: UploadFile[]) => {
		await Promise.allSettled(
			updatedBatchFiles.map(async (file) => {
				try {
					await photoService.uploadPhotosToS3(
						file.presignedUrl,
						file.originFile,
					);
					file.state = "uploaded";
					setProgress((prev) => prev + 1);
				} catch {
					file.state = "failed";
					throw new Error("S3에 업로드하는데 실패했습니다.");
				}
			}),
		);
	};

	const uploadSingleBatch = async (
		batch: Batch,
		validGuestId: number,
		nickName: string,
	) => {
		const presignedUrls = await tryFetch({
			task: async () => await fetchPresignedUrls(batch.uploadFiles),
			errorActions: ["console"],
		});

		const updatedBatchFiles = addPresignedUrls(
			presignedUrls.data ?? {},
			batch.uploadFiles,
		);

		await uploadToS3(updatedBatchFiles);

		setUploadFiles((prev) =>
			prev.map((file) => {
				const target = updatedBatchFiles.find((u) => u.id === file.id);
				return target ? { ...file, state: target.state } : file;
			}),
		);

		calculateSuccessFiles(batch, updatedBatchFiles);

		const successFiles = updatedBatchFiles.filter(
			(f) => f.state === "uploaded",
		);
		await notifySuccessFiles(successFiles, validGuestId, nickName);
	};

	const calculateSuccessFiles = (
		batch: Batch,
		updatedBatchFiles: UploadFile[],
	) => {
		const uploadedCount = updatedBatchFiles.filter(
			(f) => f.state === "uploaded",
		).length;
		const failedCount = updatedBatchFiles.filter(
			(f) => f.state === "failed",
		).length;

		const updatedBatch: Batch = {
			...batch,
			success: uploadedCount,
			failed: failedCount,
			uploadFiles: updatedBatchFiles,
		};

		setBatches((prev) =>
			prev?.map((b) => (b.id === batch.id ? updatedBatch : b)),
		);

		// 단일 기준이고
		setSession((prev) => {
			if (!prev) return prev;

			const newBatches = prev.batches.map((b) =>
				b.id === batch.id ? updatedBatch : b,
			);

			const totalSuccess = newBatches.reduce((acc, b) => acc + b.success, 0);
			const totalFailed = newBatches.reduce((acc, b) => acc + b.failed, 0);

			return {
				...prev,
				total: newBatches.reduce((acc, b) => acc + b.total, 0),
				success: totalSuccess,
				failed: totalFailed,
				batches: newBatches,
			};
		});
	};

	const uploadBatches = async (
		currentSession: Session,
		validGuestId: number,
		nickName: string,
	) => {
		const response = await tryFetch({
			task: async () => {
				for (const batch of currentSession.batches) {
					const response = await tryFetch({
						task: async () => {
							await uploadSingleBatch(batch, validGuestId, nickName);
						},
						errorActions: ["console"],
					});
					if (!response.success) {
						throw new Error("배치 업로드 중 오류 발생");
					}
				}
			},
			errorActions: ["console"],
		});
		if (!response.success) {
			throw new Error("배치 업로드 실패");
		}
	};

	// "진짜" 업로드
	const submitFileUpload = async () => {
		const currentSession = session ?? createSession(localFiles);

		setIsUploading(true);
		const response = await tryFetch({
			task: async () => {
				const validGuestId = await ensureGuestId();
				await uploadBatches(currentSession, validGuestId, nickName);
			},
			errorActions: ["toast", "console"],
			context: {
				toast: {
					text: "업로드에 실패했습니다. 다시 시도해주세요.",
					type: "error",
				},
			},
			onFinally: () => {
				setIsUploading(false);
			},
		});

		if (response.success) {
			onUploadSuccess();
			clearFiles();
		}
	};

	return {
		submitFileUpload,
		total: session?.total,
		success: progress,
		isUploading,
	};
};

export default useFileUpload;
