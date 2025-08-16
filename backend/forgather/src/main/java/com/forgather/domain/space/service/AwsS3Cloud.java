package com.forgather.domain.space.service;

import static com.forgather.domain.space.service.FilePathGenerator.generateContentsFilePath;

import java.io.File;
import java.io.IOException;
import java.time.Duration;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.forgather.domain.space.util.RandomCodeGenerator;
import com.forgather.global.config.S3Properties;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.config.DownloadFilter;
import software.amazon.awssdk.transfer.s3.model.DirectoryDownload;
import software.amazon.awssdk.transfer.s3.model.DownloadDirectoryRequest;

@Component
@RequiredArgsConstructor
public class AwsS3Cloud implements ContentsStorage {

    private static final String CONTENTS_INNER_PATH = "contents";
    private static final String THUMBNAILS_INNER_PATH = "thumbnails";

    private final S3Client s3Client;
    private final S3Properties s3Properties;
    private final S3TransferManager transferManager;
    private final S3Presigner s3Presigner;
    private final RandomCodeGenerator randomCodeGenerator;

    @Override
    public String upload(String filePath, MultipartFile file) throws IOException {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
            .bucket(s3Properties.getBucketName())
            .key(filePath)
            .tagging(s3Properties.getTagging())
            .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
        return filePath;
    }

    @Override
    public File downloadAll(String tempPath, String spaceCode) {
        File localDownloadDirectory = new File(tempPath, "images-" + spaceCode + "-" + randomCodeGenerator.generate());
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

    @Override
    public String issueSignedUrl(String spaceCode, String extension) {
        String filePath = generateContentsFilePath(s3Properties.getRootDirectory(), spaceCode, extension);

        PutObjectRequest objectRequest = PutObjectRequest.builder()
            .bucket(s3Properties.getBucketName())
            .key(filePath)
            .tagging(s3Properties.getTagging())
            .build();

        PutObjectPresignRequest preSignRequest = PutObjectPresignRequest.builder()
            .signatureDuration(Duration.ofMinutes(10L)) // 10MBps 에서 5MB 4초 -> 최대 100장 제한, 넉넉히 600초
            .putObjectRequest(objectRequest)
            .build();

        PresignedPutObjectRequest preSignedRequest = s3Presigner.presignPutObject(preSignRequest);
        return preSignedRequest.url().toString();
    }
}
