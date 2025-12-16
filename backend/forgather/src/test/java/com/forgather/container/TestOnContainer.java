package com.forgather.container;

import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.mysql.MySQLContainer;

public class TestOnContainer {

    protected static final MySQLContainer mysql = new MySQLContainer("mysql:8.0.42")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");

    static {
        mysql.start();
        Runtime.getRuntime().addShutdownHook(new Thread(mysql::stop)); // jvm 종료 시 컨테이너 종료 명시
    }

    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mysql::getJdbcUrl);
        registry.add("spring.datasource.username", mysql::getUsername);
        registry.add("spring.datasource.password", mysql::getPassword);
        registry.add("spring.datasource.driverClassName", mysql::getDriverClassName);

        registry.add("spring.jpa.hibernate.ddl-auto", () -> "none");

        registry.add("spring.flyway.enabled", () -> true);
        registry.add("spring.flyway.baseline-on-migrate", () -> true);
        registry.add("spring.flyway.validate-on-migrate", () -> true);
        registry.add("spring.flyway.location", () -> "classpath:db/migration");
    }
}
