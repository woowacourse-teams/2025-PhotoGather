package com.forgather.domain.space.service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.global.config.S3Properties;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.model.DirectoryDownload;
import software.amazon.awssdk.transfer.s3.model.DownloadDirectoryRequest;

@Slf4j
@Component
@RequiredArgsConstructor
public class AwsS3Cloud {

    private static final String CONTENTS_DIRECTORY = "contents";

    private final S3Client s3Client;
    private final S3Properties s3Properties;
    private final S3TransferManager transferManager;

    public void upload(String spaceCode, MultipartFile file) throws IOException {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
            .bucket(s3Properties.getBucketName())
            .key(generateFilePath(spaceCode, file))
            .tagging(s3Properties.getTagging())
            .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
    }

    private String generateFilePath(String spaceCode, MultipartFile file) {
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String uuid = UUID.randomUUID().toString();
        return String.format("/%s/%s/%s/%s.%s", s3Properties.getRootDirectory(), CONTENTS_DIRECTORY, spaceCode, uuid,
            extension);
    }

    public File downloadAll(String spaceCode) {
        File localDownloadDirectory = new File("images-" + spaceCode);
        String s3Prefix = String.format("%s/%s/%s", s3Properties.getRootDirectory(), CONTENTS_DIRECTORY, spaceCode);

        DownloadDirectoryRequest request = DownloadDirectoryRequest.builder()
            .bucket(s3Properties.getBucketName())
            .listObjectsV2RequestTransformer(builder -> builder.prefix(s3Prefix))
            .destination(localDownloadDirectory.toPath())
            .build();

        DirectoryDownload directoryDownload = transferManager.downloadDirectory(request);
        directoryDownload.completionFuture().join();
        return localDownloadDirectory;
    }
}
