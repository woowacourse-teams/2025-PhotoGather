package com.forgather.domain.space.service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.global.config.S3Properties;
import com.forgather.global.util.RandomCodeGenerator;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.config.DownloadFilter;
import software.amazon.awssdk.transfer.s3.model.DirectoryDownload;
import software.amazon.awssdk.transfer.s3.model.DownloadDirectoryRequest;

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

    public File downloadAll(String tempPath, String spaceCode) {
        File localDownloadDirectory = new File(tempPath,
            "images-" + spaceCode + "-" + randomCodeGenerator.generate(10));
        createLocalDownloadDirectory(localDownloadDirectory);
        String s3Prefix = String.format("%s/%s/%s", s3Properties.getRootDirectory(), CONTENTS_INNER_PATH, spaceCode);

        DownloadDirectoryRequest request = DownloadDirectoryRequest.builder()
            .bucket(s3Properties.getBucketName())
            .listObjectsV2RequestTransformer(builder -> builder.prefix(s3Prefix))
            .filter(excludeThumbnails())
            .destination(localDownloadDirectory.toPath())
            .build();

        DirectoryDownload directoryDownload = transferManager.downloadDirectory(request);
        directoryDownload.completionFuture().join();
        return localDownloadDirectory;
    }

    private void createLocalDownloadDirectory(File localDownloadDirectory) {
        if (!localDownloadDirectory.exists()) {
            boolean created = localDownloadDirectory.mkdirs();
            if (!created) {
                throw new IllegalStateException("다운로드 디렉토리 생성 실패: " + localDownloadDirectory.getAbsolutePath());
            }
        }
    }

    private DownloadFilter excludeThumbnails() {
        return object -> !object.key().contains(THUMBNAILS_INNER_PATH);
    }
}
