package com.forgather.global.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forgather.global.auth.resolver.LoginHostArgumentResolver;
import com.forgather.global.converter.MultipartJsonConverter;
import com.forgather.global.logging.LoggingInterceptor;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final CorsProperties corsProperties;
    private final LoggingInterceptor loggingInterceptor;
    private final LoginHostArgumentResolver loginHostArgumentResolver;
    private final ObjectMapper objectMapper;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins(corsProperties.getAllowedOrigins().toArray(new String[0]))
            .allowedMethods(corsProperties.getAllowedMethods().toArray(new String[0]))
            .allowedHeaders(corsProperties.getAllowedHeaders().toArray(new String[0]))
            .allowCredentials(corsProperties.isAllowCredentials())
            .maxAge(corsProperties.getMaxAge());
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        PageableHandlerMethodArgumentResolver pageableResolver = new PageableHandlerMethodArgumentResolver();
        pageableResolver.setOneIndexedParameters(true); // 1부터 시작
        resolvers.add(pageableResolver);
        resolvers.add(loginHostArgumentResolver);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loggingInterceptor)
            .excludePathPatterns("/swagger-ui/**", "/v3/api-docs/**");
    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 기본 Jackson 컨버터 바로 앞에 추가하여 우선순위 확보
        int jacksonIndex = -1;
        for (int i = 0; i < converters.size(); i++) {
            if (converters.get(i) instanceof MappingJackson2HttpMessageConverter) {
                jacksonIndex = i;
                break;
            }
        }

        MultipartJsonConverter multipartJsonConverter = new MultipartJsonConverter(objectMapper);

        if (jacksonIndex >= 0) {
            // Jackson 컨버터 바로 앞에 삽입
            converters.add(jacksonIndex, multipartJsonConverter);
        } else {
            // Jackson 컨버터를 못 찾으면 맨 앞에 추가
            converters.add(0, multipartJsonConverter);
        }
    }
}
