package com.forgather.global.logging;

import ch.qos.logback.classic.pattern.ClassicConverter;
import ch.qos.logback.classic.spi.ILoggingEvent;

public class LogMessageConverter extends ClassicConverter {
    @Override
    public String convert(ILoggingEvent event) {
        String message = event.getFormattedMessage();
        return (message == null) ? "" : message; // null 문자가 출력되지 않도록 empty 문자열 반환
    }
}
