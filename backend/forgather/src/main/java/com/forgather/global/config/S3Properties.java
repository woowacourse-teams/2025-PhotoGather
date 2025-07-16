package com.forgather.global.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "aws.s3")
public class S3Properties {
    private final String secretKey;
    private final String accessKey;
    private final String region;

    private final String bucketName;
    private final String rootDirectory;
    private final String tagging;
}
