package com.forgather.back_office.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.forgather.back_office.dto.AdminSpaceFilterRequest;
import com.forgather.back_office.dto.AdminSpaceResponse;
import com.forgather.back_office.dto.SpaceDetailResponse;
import com.forgather.back_office.repository.AdminUserRepository;
import com.forgather.domain.guestbook.model.Guest;
import com.forgather.domain.guestbook.repository.GuestBookCardRepository;
import com.forgather.domain.guestbook.repository.GuestRepository;
import com.forgather.domain.product.repository.ProductRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.fixture.GuestBookCardFixture;
import com.forgather.fixture.GuestFixture;
import com.forgather.fixture.ProductFixture;
import com.forgather.fixture.SpaceFixture;
import com.forgather.container.TestOnContainer;

@Transactional
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class AdminSpaceServiceTest extends TestOnContainer {

    @Autowired
    private AdminSpaceService adminSpaceService;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private GuestBookCardRepository guestBookCardRepository;

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private ProductRepository productRepository;

    @DisplayName("전체 스페이스 목록을 조회한다.")
    @Test
    void getAllSpaces() {
        // given
        spaceRepository.save(SpaceFixture.createSpaceWithCode("1111111111"));
        spaceRepository.save(SpaceFixture.createSpaceWithCode("2222222222"));
        Pageable pageable = PageRequest.of(0, 10);

        // when
        AdminSpaceResponse result = adminSpaceService.getAllSpaces(pageable);

        // then
        assertAll(
            () -> assertThat(result.spaces()).hasSize(2),
            () -> assertThat(result.currentPage()).isEqualTo(1),
            () -> assertThat(result.pageSize()).isEqualTo(10),
            () -> assertThat(result.totalCount()).isEqualTo(2),
            () -> assertThat(result.totalPages()).isEqualTo(1)
        );
    }

    @DisplayName("스페이스 상세 정보를 조회한다.")
    @Test
    void getSpaceDetail() {
        // given
        Space space = spaceRepository.save(SpaceFixture.createSpaceWithCode("1234567890"));
        productRepository.save(ProductFixture.createProductWithSpace(space));
        Guest guest = guestRepository.save(GuestFixture.createGuest());
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCard(space, guest, "메시지1"));
        guestBookCardRepository.save(GuestBookCardFixture.createGuestBookCard(space, guest, "메시지2"));

        // when
        SpaceDetailResponse result = adminSpaceService.getSpaceDetail("1234567890");

        // then
        assertAll(
            () -> assertThat(result.space().code()).isEqualTo("1234567890"),
            () -> assertThat(result.hasProduct()).isTrue(),
            () -> assertThat(result.guestBookCount()).isEqualTo(2)
        );
    }

    @DisplayName("작품 소개가 등록된 스페이스 목록을 조회한다.")
    @Test
    void getSpacesHasProduct() {
        // given
        Space space1 = spaceRepository.save(SpaceFixture.createSpaceWithCode("3333333333"));
        Space space2 = spaceRepository.save(SpaceFixture.createSpaceWithCode("4444444444"));
        Space space3 = spaceRepository.save(SpaceFixture.createSpaceWithCode("5555555555"));
        productRepository.save(ProductFixture.createProductWithSpace(space1));
        productRepository.save(ProductFixture.createProductWithSpace(space2));
        AdminSpaceFilterRequest request = new AdminSpaceFilterRequest(true);

        // when
        AdminSpaceResponse result = adminSpaceService.getSpacesByFilters(request, PageRequest.of(0, 10));

        // then
        assertAll(
            () -> assertThat(result.spaces()).hasSize(2),
            () -> assertThat(result.spaces().get(0).code()).isEqualTo(space2.getCode()),
            () -> assertThat(result.spaces().get(1).code()).isEqualTo(space1.getCode())
        );
    }

    @DisplayName("작품 소개가 등록되지 않은 스페이스 목록을 조회한다.")
    @Test
    void getSpacesHasNoProduct() {
        // given
        Space space1 = spaceRepository.save(SpaceFixture.createSpaceWithCode("6666666666"));
        Space space2 = spaceRepository.save(SpaceFixture.createSpaceWithCode("7777777777"));
        productRepository.save(ProductFixture.createProductWithSpace(space1));
        AdminSpaceFilterRequest request = new AdminSpaceFilterRequest(false);

        // when
        AdminSpaceResponse result = adminSpaceService.getSpacesByFilters(request, PageRequest.of(0, 10));

        // then
        assertAll(
            () -> assertThat(result.spaces()).hasSize(1),
            () -> assertThat(result.spaces().get(0).code()).isEqualTo(space2.getCode())
        );
    }
}
