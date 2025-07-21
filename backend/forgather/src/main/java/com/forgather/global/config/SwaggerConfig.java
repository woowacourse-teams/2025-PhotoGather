package com.forgather.global.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .info(apiInfo())
            .components(new Components())
            .servers(List.of(
                new Server().url("https://api.forgather.com").description("Production Server")
            ));
    }

    private Info apiInfo() {
        return new Info()
            .title("Forgather API")
            .description("당신을 위한 순간, 흩어지지 않게. Forgather")
            .version("1.0.0");
    }
}
