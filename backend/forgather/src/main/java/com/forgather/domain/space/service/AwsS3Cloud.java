package com.forgather.domain.space.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.global.config.S3Properties;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Component
@RequiredArgsConstructor
public class AwsS3Cloud {

    private static final String CONTENTS_DIRECTORY_NAME = "contents";

    private final S3Client s3Client;
    private final S3Properties s3Properties;

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
        return String.format("/%s/%s/%s/%s.%s", s3Properties.getRootDirectory(), CONTENTS_DIRECTORY_NAME, spaceCode, uploadFileName,
            extension);
    }
}
