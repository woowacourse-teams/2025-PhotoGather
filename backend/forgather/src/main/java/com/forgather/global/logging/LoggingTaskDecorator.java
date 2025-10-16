package com.forgather.global.logging;

import java.util.Map;

import org.slf4j.MDC;
import org.springframework.core.task.TaskDecorator;

/**
 * 비동기 스레드에 MDC가 전파되지 않는 문제로 인해 작업 전 MDC를 명시적으로 복사한다.
 * AsyncConfig에서 TaskExecutor에 등록한다.
 */
public class LoggingTaskDecorator implements TaskDecorator {

    @Override
    public Runnable decorate(Runnable runnable) {
        Map<String, String> copyOfContextMap = MDC.getCopyOfContextMap();
        if (copyOfContextMap != null) {
            return () -> {
                try {
                    MDC.setContextMap(copyOfContextMap);
                    runnable.run();
                } finally {
                    MDC.clear();
                }
            };
        }
        return runnable;
    }
}
