package com.forgather.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@Configuration
public class ValidatorConfig {

    @Bean
    public LocalValidatorFactoryBean defaultValidator() {
        LocalValidatorFactoryBean factory = new LocalValidatorFactoryBean();

        // 시간 비교에서 1시간의 오차를 허용함 (네트워크 지연 고려)
        factory.getValidationPropertyMap().put("hibernate.validator.temporal_validation_tolerance", "3600000");
        return factory;
    }
}
