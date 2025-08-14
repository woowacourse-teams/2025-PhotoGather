package com.forgather.domain.space.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.global.config.S3Properties;
import com.forgather.global.logging.Logger;
import com.forgather.global.util.RandomCodeGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Delete;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectsRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ObjectIdentifier;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.model.CompletedFileDownload;
import software.amazon.awssdk.transfer.s3.model.DownloadFileRequest;

@Component
@Slf4j
@RequiredArgsConstructor
public class AwsS3Cloud {

    private static final String CONTENTS_INNER_PATH = "contents";
    private static final String THUMBNAILS_INNER_PATH = "thumbnails";

    private final S3Client s3Client;
    private final S3Properties s3Properties;
    private final S3TransferManager transferManager;
    private final RandomCodeGenerator randomCodeGenerator;
    private final Logger logger;

    public String upload(String spaceCode, MultipartFile file) throws IOException {
        String path = generateFilePath(spaceCode, file);
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
            .bucket(s3Properties.getBucketName())
            .key(path)
            .tagging(s3Properties.getTagging())
            .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

        logger.log()
            .event("S3 업로드 완료")
            .spaceCode(spaceCode)
            .value("originalName", file.getOriginalFilename())
            .value("uploadedPath", path)
            .info();

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

    private String getPrefix(String spaceCode) {
        return String.format("%s/%s/%s", s3Properties.getRootDirectory(), CONTENTS_INNER_PATH, spaceCode);
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

    public void deleteContent(String path) {
        DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
            .bucket(s3Properties.getBucketName())
            .key(path)
            .build();
        s3Client.deleteObject(deleteRequest);
    }

    public void deleteSelectedContents(List<String> paths) {
        List<ObjectIdentifier> deleteObjects = paths.stream()
            .map(path -> ObjectIdentifier.builder().key(path).build())
            .toList();
        DeleteObjectsRequest deleteRequest = DeleteObjectsRequest.builder()
            .bucket(s3Properties.getBucketName())
            .delete(Delete.builder().objects(deleteObjects).build())
            .build();
        s3Client.deleteObjects(deleteRequest);
    }

    public void deleteAllContents(String spaceCode) {
        List<ObjectIdentifier> objectIdentifiers = getObjectIdentifiers(spaceCode);

        if (!objectIdentifiers.isEmpty()) {
            DeleteObjectsRequest deleteObjectsRequest = DeleteObjectsRequest.builder()
                .bucket(s3Properties.getBucketName())
                .delete(Delete.builder().objects(objectIdentifiers).build())
                .build();
            s3Client.deleteObjects(deleteObjectsRequest);
        }
    }

    private List<ObjectIdentifier> getObjectIdentifiers(String spaceCode) {
        return s3Client.listObjectsV2Paginator(createObjectPagesRequest(spaceCode))
            .stream()
            .flatMap(response -> response.contents().stream()
                .map(object -> ObjectIdentifier.builder()
                    .key(object.key())
                    .build())
            ).toList();
    }

    private ListObjectsV2Request createObjectPagesRequest(String spaceCode) {
        String s3Prefix = getPrefix(spaceCode);
        return ListObjectsV2Request.builder()
            .bucket(s3Properties.getBucketName())
            .prefix(s3Prefix)
            .build();
    }
}
