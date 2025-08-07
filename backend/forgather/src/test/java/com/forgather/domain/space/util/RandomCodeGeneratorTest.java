package com.forgather.domain.space.util;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.forgather.global.util.RandomCodeGenerator;

class RandomCodeGeneratorTest {

    @Test
    @DisplayName("랜덤으로 생성된 코드의 길이가 10이어야 한다.")
    void generate() {
        // given
        RandomCodeGenerator generator = new RandomCodeGenerator();

        // when
        String code = generator.generate(10);

        // then
        assertThat(code).hasSize(10);
    }
}
