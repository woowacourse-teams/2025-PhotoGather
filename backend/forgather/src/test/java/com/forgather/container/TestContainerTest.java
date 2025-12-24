package com.forgather.container;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TestContainerTest extends TestOnContainer {

    @DisplayName("MySQL 테스트 컨테이너가 정상적으로 가동된다")
    @Test
    void testContainer() {
        // then
        assertThat(mysql.isRunning()).isTrue();
    }
}
