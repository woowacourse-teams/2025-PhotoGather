package com.forgather.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.transfer.s3.S3TransferManager;

@Configuration
@RequiredArgsConstructor
public class S3Config {

    private final S3Properties s3Properties;

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
            .region(Region.of(s3Properties.getRegion()))
            .build();
    }

    @Bean
    public S3AsyncClient s3AsyncClient() {
        return S3AsyncClient.builder()
            .region(Region.of(s3Properties.getRegion()))
            .build();
    }

    @Bean
    public S3TransferManager s3TransferManager() {
        return S3TransferManager.builder()
            .s3Client(s3AsyncClient())
            .build();
    }

    @Bean
    public S3Presigner s3Presigner() {
        return S3Presigner.create();
    }
}
