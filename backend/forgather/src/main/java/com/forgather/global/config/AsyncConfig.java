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
     * maxPoolSize queueCapacity는 기본 설정 사용한다.
     * 기본 설정 둘 다 Integer.MAX_VALUE 이다.
     * ThreadPoolTaskExecutor는 유휴 스레드가 존재하지 않고 대기큐가 꽉차면 max 아애로 스레드를 추가 생성한다.
     * 이론 상 대기큐를 꽉 채우지 못하므로 maxPoolSize는 의미 없는 설정이라고 볼 수 있따.
     * 추가 생성 없이 지정한 coreThread 수만큼의 스레드가 작업을 처리한다.
     *
     * 해당 스레드풀에 대한 모니터링 추가 후 감소/증가해볼 수 있을 것이다.
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

        taskExecutor.setTaskDecorator(new LoggingTaskDecorator());
        taskExecutor.setThreadNamePrefix("async-task-");
        taskExecutor.setThreadGroupName("async-group");

        return taskExecutor;
    }
}
