package com.forgather.global.config;

import java.util.Set;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "forgather")
public class PublicAccessProperties {

    private final Set<String> publicSpaceCodes;
}
