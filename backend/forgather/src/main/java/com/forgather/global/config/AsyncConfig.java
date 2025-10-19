package com.forgather.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import com.forgather.global.logging.LoggingTaskDecorator;

@Configuration
@EnableAsync
public class AsyncConfig {
    /**
     * 해당 스레드풀에 대한 모니터링 추가 후 설정 값들을 조정해볼 수 있다.
     */
    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();

        /**
         * 권장 corePoolSize = Number of Available Cores * Target CPU utilization * (1 + Wait time / Service time)
         * ec2 타입인 t4g.small의 cpu 코어 수 = 2
         * 현재 비동기 작업은 s3 삭제 요청 위주 -> io 대기시간이 길다.
         * 우선 2 * 2 = 4로 설정함.
         */
        taskExecutor.setCorePoolSize(4);
        taskExecutor.setQueueCapacity(1000); // OOM 방지용

        taskExecutor.setTaskDecorator(new LoggingTaskDecorator());
        taskExecutor.setThreadNamePrefix("async-task-");
        taskExecutor.setThreadGroupName("async-group");
        taskExecutor.initialize();

        return taskExecutor;
    }
}
