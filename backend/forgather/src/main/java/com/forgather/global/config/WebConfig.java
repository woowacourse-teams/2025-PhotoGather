package com.forgather.global.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forgather.back_office.interceptor.AdminAuthInterceptor;
import com.forgather.back_office.resolver.LoginAdminUserArgumentResolver;
import com.forgather.global.auth.resolver.LoginHostArgumentResolver;
import com.forgather.global.converter.MultipartJsonConverter;
import com.forgather.global.logging.LoggingInterceptor;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final CorsProperties corsProperties;
    private final LoggingInterceptor loggingInterceptor;
    private final AdminAuthInterceptor adminAuthInterceptor;
    private final LoginHostArgumentResolver loginHostArgumentResolver;
    private final LoginAdminUserArgumentResolver loginAdminUserArgumentResolver;
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
        resolvers.add(loginAdminUserArgumentResolver);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loggingInterceptor)
            .order(1)
            .excludePathPatterns("/swagger-ui/**", "/v3/api-docs/**");

        registry.addInterceptor(adminAuthInterceptor)
            .order(2)
            .addPathPatterns("/view/admin/**", "/admin/**")
            .excludePathPatterns(
                "/view/admin/login",
                "/view/admin/spaces",
                "/view/admin/hosts",
                "/admin/login",
                "/admin/refresh"
            );
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/view/admin/login")
            .setViewName("admin/login");
        registry.addViewController("/view/admin/spaces")
            .setViewName("admin/spaces/list");
        registry.addViewController("/view/admin/hosts")
            .setViewName("admin/hosts/list");
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
