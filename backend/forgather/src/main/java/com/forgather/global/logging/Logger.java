package com.forgather.global.logging;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class Logger {

    private final LogFormatter logFormatter;

    public LogBuilder log() {
        return new LogBuilder(logFormatter);
    }

    @RequiredArgsConstructor
    public class LogBuilder {

        private final List<String> segments = new ArrayList<>();
        private final LogFormatter logFormatter;

        public LogBuilder event(String value) {
            segments.add(logFormatter.formatWithBrackets("event", value));
            return this;
        }

        public LogBuilder spaceCode(String spaceCode) {
            segments.add(logFormatter.formatWithBrackets("spaceCode", spaceCode));
            return this;
        }

        public LogBuilder message(String message) {
            segments.add(logFormatter.formatWithBrackets("message", message));
            return this;
        }

        public LogBuilder value(String key, String value) {
            segments.add(logFormatter.formatWithBrackets(key, value));
            return this;
        }

        public void info() {
            addRequestInformation();
            log.info(logFormatter.formatSegments(segments));
        }

        public void warn() {
            addRequestInformation();
            log.warn(logFormatter.formatSegments(segments));
        }

        public void debug() {
            addRequestInformation();
            log.debug(logFormatter.formatSegments(segments));
        }

        public void error() {
            addRequestInformation();
            log.error(logFormatter.formatSegments(segments));
        }

        private void addRequestInformation() {
            segments.add(logFormatter.formatRequestInformation());
        }
    }
}
