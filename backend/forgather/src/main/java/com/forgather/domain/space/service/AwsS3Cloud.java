package com.forgather.domain.space.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.util.RandomCodeGenerator;
import com.forgather.global.config.S3Properties;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.model.CompletedFileDownload;
import software.amazon.awssdk.transfer.s3.model.DownloadFileRequest;

@Component
@RequiredArgsConstructor
public class AwsS3Cloud {

    private static final String CONTENTS_INNER_PATH = "contents";
    private static final String THUMBNAILS_INNER_PATH = "thumbnails";

    private final S3Client s3Client;
    private final S3Properties s3Properties;
    private final S3TransferManager transferManager;
    private final RandomCodeGenerator randomCodeGenerator;

    public String upload(String spaceCode, MultipartFile file) throws IOException {
        String path = generateFilePath(spaceCode, file);
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
            .bucket(s3Properties.getBucketName())
            .key(path)
            .tagging(s3Properties.getTagging())
            .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
        return path;
    }

    private String generateFilePath(String spaceCode, MultipartFile file) {
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String uploadFileName = UUID.randomUUID().toString();
        return String.format("%s/%s/%s/%s.%s", s3Properties.getRootDirectory(), CONTENTS_INNER_PATH, spaceCode,
            uploadFileName,
            extension);
    }

    public File downloadSelected(String tempPath, String spaceCode, List<String> photoPaths) {
        File localDownloadDirectory = createLocalDownloadDirectory(tempPath, spaceCode);
        Map<String, Path> paths = getPhotoPathNames(spaceCode, photoPaths, localDownloadDirectory);

        CompletableFuture.allOf(paths.entrySet().stream()
            .map(entry -> downloadFileAsync(entry.getKey(), entry.getValue()))
            .toArray(CompletableFuture[]::new)
        ).join();
        return localDownloadDirectory;
    }

    private File createLocalDownloadDirectory(String tempPath, String spaceCode) {
        File localDownloadDirectory = new File(tempPath, "images-" + spaceCode + "-" + randomCodeGenerator.generate());
        if (!localDownloadDirectory.exists()) {
            boolean created = localDownloadDirectory.mkdirs();
            if (!created) {
                throw new IllegalStateException("다운로드 디렉토리 생성 실패: " + localDownloadDirectory.getAbsolutePath());
            }
        }
        return localDownloadDirectory;
    }

    private Map<String, Path> getPhotoPathNames(String spaceCode, List<String> paths, File localDownloadDirectory) {
        Map<String, Path> photoPaths = new LinkedHashMap<>();
        for (int i = 0; i < paths.size(); i++) {
            String photoPath = paths.get(i);
            String changedName = String.format("%s.%s", spaceCode + "-" + (i + 1),
                StringUtils.getFilenameExtension(photoPath));
            photoPaths.put(photoPath, localDownloadDirectory.toPath().resolve(changedName));
        }
        return photoPaths;
    }

    private CompletableFuture<CompletedFileDownload> downloadFileAsync(String key, Path localPath) {
        DownloadFileRequest request = DownloadFileRequest.builder()
            .getObjectRequest(r -> r.bucket(s3Properties.getBucketName()).key(key))
            .destination(localPath)
            .build();
        return transferManager.downloadFile(request).completionFuture();
    }
}
