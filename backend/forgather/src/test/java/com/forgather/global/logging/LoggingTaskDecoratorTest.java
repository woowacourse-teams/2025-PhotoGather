package com.forgather.global.logging;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.task.TaskExecutor;

@SpringBootTest
class LoggingTaskDecoratorTest {

    @Autowired
    private TaskExecutor taskExecutor;

    @DisplayName("")
    @Test
    void decorate() throws ExecutionException, InterruptedException, TimeoutException {
        // given
        MDC.put("key", "value123");

        // when
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            return MDC.get("key");
        }, taskExecutor);

        // then
        String result = future.get(3, TimeUnit.SECONDS);  // 최대 5초 대기
        assertThat(result).isEqualTo("value123");
    }
}
