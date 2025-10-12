package com.forgather.domain.upload;

import java.io.IOException;
import java.nio.file.Path;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.model.Photo;
import com.forgather.domain.upload.domain.ContentsStorage;
import com.forgather.global.config.S3Properties;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Delete;
import software.amazon.awssdk.services.s3.model.DeleteObjectsRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectsResponse;
import software.amazon.awssdk.services.s3.model.ObjectIdentifier;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Error;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Component
@Slf4j
@RequiredArgsConstructor
public class AwsS3Cloud implements ContentsStorage {

    private static final String CONTENTS_INNER_PATH = "contents";
    private static final String THUMBNAILS_INNER_PATH = "thumbnails";
    private static final String MOBILE_THUMBNAIL_SIZE = "x800";
    private static final String DESKTOP_THUMBNAIL_SIZE = "x1080";
    private static final String THUMBNAIL_EXTENSION = "webp";
    private static final int MAX_DELETE_COUNT = 1_000;

    private final S3Client s3Client;
    private final S3Properties s3Properties;
    private final S3Presigner s3Presigner;

    @Override
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

    @Override
    public void deletePhotos(List<? extends Photo> deletedPhotos) {
        List<String> paths = deletedPhotos.stream()
            .map(Photo::getPath)
            .toList();
        deleteContents(paths);
    }

    @Override
    public void deleteContent(String contentPath) {
        List<String> deletePaths = getPathWithThumbnails(contentPath);
        executeBatchDeletion(deletePaths);
    }

    @Override
    public void deleteContents(List<String> contentPaths) {
        List<String> deletePaths = contentPaths.stream()
            .flatMap(path -> getPathWithThumbnails(path).stream())
            .toList();
        executeBatchDeletion(deletePaths);
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

    private void executeBatchDeletion(List<String> deletePaths) {
        // S3Client#deleteObjects 의 최대 처리 가능 개수 1,000
        for (int i = 0; i < deletePaths.size(); i += MAX_DELETE_COUNT) {
            List<String> batch = deletePaths.subList(i, Math.min(i + MAX_DELETE_COUNT, deletePaths.size()));
            DeleteObjectsResponse response = executeObjectsDeletion(batch);
            if (response.hasErrors()) {
                retryObjectsDeletion(response);
            }
        }
        log.atInfo()
            .addKeyValue("deletedSize", String.valueOf(deletePaths.size()))
            .log("S3 삭제 완료");
    }

    private DeleteObjectsResponse executeObjectsDeletion(List<String> deletePaths) {
        List<ObjectIdentifier> deleteObjects = deletePaths.stream()
            .map(path -> ObjectIdentifier.builder().key(path).build())
            .toList();
        DeleteObjectsRequest deleteRequest = DeleteObjectsRequest.builder()
            .bucket(s3Properties.getBucketName())
            .delete(Delete.builder().objects(deleteObjects).build())
            .build();
        return s3Client.deleteObjects(deleteRequest);
    }

    private void retryObjectsDeletion(DeleteObjectsResponse response) {
        List<String> retryPaths = extractFailedKeys(response);
        DeleteObjectsResponse retryResponse = executeObjectsDeletion(retryPaths);
        if (retryResponse.hasErrors()) {
            log.atWarn()
                .addKeyValue("deleteFailPath", extractFailedKeys(retryResponse).toString())
                .log("S3 삭제 실패");
        }
    }

    private List<String> extractFailedKeys(DeleteObjectsResponse response) {
        return response.errors()
            .stream()
            .map(S3Error::key)
            .toList();
    }

    @Override
    public String issueSignedUrl(String path) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
            .bucket(s3Properties.getBucketName())
            .key(path)
            .tagging(s3Properties.getTagging())
            .build();

        PutObjectPresignRequest preSignRequest = PutObjectPresignRequest.builder()
            .signatureDuration(Duration.ofMinutes(10L)) // 10MBps 에서 5MB 4초 -> 최대 100장 제한, 넉넉히 600초
            .putObjectRequest(objectRequest)
            .build();

        PresignedPutObjectRequest preSignedRequest = s3Presigner.presignPutObject(preSignRequest);
        return preSignedRequest.url().toString();
    }

    @Override
    public String getRootDirectory() {
        return s3Properties.getRootDirectory();
    }
}
