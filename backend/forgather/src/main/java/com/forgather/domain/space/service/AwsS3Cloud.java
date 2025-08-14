package com.forgather.domain.space.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.global.config.S3Properties;
import com.forgather.global.util.RandomCodeGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Delete;
import software.amazon.awssdk.services.s3.model.DeleteObjectsRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectsResponse;
import software.amazon.awssdk.services.s3.model.ObjectIdentifier;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Error;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.model.CompletedFileDownload;
import software.amazon.awssdk.transfer.s3.model.DownloadFileRequest;

@Component
@Slf4j
@RequiredArgsConstructor
public class AwsS3Cloud {

    private static final String CONTENTS_INNER_PATH = "contents";
    private static final String THUMBNAILS_INNER_PATH = "thumbnails";
    private static final String MOBILE_THUMBNAIL_SIZE = "x800";
    private static final String DESKTOP_THUMBNAIL_SIZE = "x1080";
    private static final String THUMBNAIL_EXTENSION = "webp";
    private static final int MAX_DELETE_COUNT = 1_000;

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

        log.atDebug()
            .addKeyValue("spaceCode", spaceCode)
            .addKeyValue("originalName", file.getOriginalFilename())
            .addKeyValue("uploadedPath", path)
            .log("S3 업로드 완료");

        return path;
    }

    private String generateFilePath(String spaceCode, MultipartFile file) {
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String uploadFileName = UUID.randomUUID().toString();
        return String.format("%s/%s/%s/%s.%s", s3Properties.getRootDirectory(), CONTENTS_INNER_PATH, spaceCode,
            uploadFileName, extension);
    }

    public InputStream download(String photoPath) {
        GetObjectRequest request = GetObjectRequest.builder()
            .bucket(s3Properties.getBucketName())
            .key(photoPath)
            .build();

        return s3Client.getObject(request);
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
        File localDownloadDirectory = new File(tempPath,
            "images-" + spaceCode + "-" + randomCodeGenerator.generate(10));
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

    public void deleteContent(String contentPath) {
        List<String> deletePaths = getPathWithThumbnails(contentPath);
        deleteCloudContents(deletePaths);
    }

    public void deleteSelectedContents(List<String> contentPaths) {
        List<String> deletePaths = contentPaths.stream()
            .flatMap(path -> getPathWithThumbnails(path).stream())
            .toList();
        deleteCloudContents(deletePaths);
    }

    private List<String> getPathWithThumbnails(String contentPath) {
        List<String> pathWithThumbnails = new ArrayList<>();
        pathWithThumbnails.add(contentPath);
        pathWithThumbnails.add(toThumbnailPath(contentPath, MOBILE_THUMBNAIL_SIZE));
        pathWithThumbnails.add(toThumbnailPath(contentPath, DESKTOP_THUMBNAIL_SIZE));
        return pathWithThumbnails;
    }

    private String toThumbnailPath(String contentPath, String thumbnailSize) {
        String contentDirectory = Path.of(contentPath).getParent().toString();
        String[] tokens = StringUtils.getFilename(contentPath).split("\\.");
        String fileName = tokens[0];

        return String.format("%s/%s/%s_%s.%s", contentDirectory, THUMBNAILS_INNER_PATH, fileName, thumbnailSize,
            THUMBNAIL_EXTENSION);
    }

    private void deleteCloudContents(List<String> deletePaths) {
        // S3Client#deleteObjects 의 최대 처리 가능 개수 1,000
        for (int i = 0; i < deletePaths.size(); i += MAX_DELETE_COUNT) {
            List<String> batch = deletePaths.subList(i, Math.min(i + MAX_DELETE_COUNT, deletePaths.size()));
            DeleteObjectsResponse response = deleteContents(batch);
            if (response.hasErrors()) {
                retryDeleteContents(response);
            }
        }
        logger.log()
            .event("S3 삭제 완료")
            .value("deletedSize", String.valueOf(deletePaths.size()))
            .info();
    }

    private DeleteObjectsResponse deleteContents(List<String> deletePaths) {
        List<ObjectIdentifier> deleteObjects = deletePaths.stream()
            .map(path -> ObjectIdentifier.builder().key(path).build())
            .toList();
        DeleteObjectsRequest deleteRequest = DeleteObjectsRequest.builder()
            .bucket(s3Properties.getBucketName())
            .delete(Delete.builder().objects(deleteObjects).build())
            .build();
        return s3Client.deleteObjects(deleteRequest);
    }

    private void retryDeleteContents(DeleteObjectsResponse response) {
        List<String> retryPaths = extractFailedKeys(response);
        DeleteObjectsResponse retryResponse = deleteContents(retryPaths);
        if (retryResponse.hasErrors()) {
            logger.log()
                .event("S3 삭제 실패")
                .value("deleteFailPath", extractFailedKeys(retryResponse).toString())
                .info();
        }
    }

    private List<String> extractFailedKeys(DeleteObjectsResponse response) {
        return response.errors()
            .stream()
            .map(S3Error::key)
            .toList();
    }
}
