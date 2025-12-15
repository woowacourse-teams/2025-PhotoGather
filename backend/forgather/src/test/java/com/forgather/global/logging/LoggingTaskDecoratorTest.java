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

    @DisplayName("비동기 스레드 작업 전에 MDC 컨텍스트를 복사한다")
    @Test
    void decorate() throws ExecutionException, InterruptedException, TimeoutException {
        // given
        MDC.put("key", "value123");

        // when
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            return MDC.get("key");
        }, taskExecutor);

        // then
        String result = future.get(6, TimeUnit.SECONDS);
        assertThat(result).isEqualTo("value123");
    }
}
