package com.forgather.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@RequiredArgsConstructor
public class S3Config {

    private final S3Properties s3Properties;

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
            .credentialsProvider(this::basicCredentials)
            .region(Region.of(s3Properties.getRegion()))
            .build();
    }

    private AwsCredentials basicCredentials() {
        return AwsBasicCredentials.create(s3Properties.getAccessKey(), s3Properties.getSecretKey());
    }
}
