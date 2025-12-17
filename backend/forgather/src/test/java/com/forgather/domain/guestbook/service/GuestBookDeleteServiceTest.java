package com.forgather.domain.guestbook.service;

import static com.forgather.fixture.GuestBookCardPhotoFixture.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import com.forgather.domain.guestbook.model.Guest;
import com.forgather.domain.guestbook.model.GuestBookCard;
import com.forgather.domain.guestbook.model.GuestBookCardPhoto;
import com.forgather.domain.guestbook.repository.GuestBookCardPhotoRepository;
import com.forgather.domain.guestbook.repository.GuestBookCardRepository;
import com.forgather.domain.guestbook.repository.GuestRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.fake.FakeContentStorage;
import com.forgather.fixture.GuestFixture;
import com.forgather.fixture.HostFixture;
import com.forgather.fixture.SpaceFixture;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.auth.repository.SpaceHostMapRepository;

@Import({GuestBookService.class, FakeContentStorage.class})
@DataJpaTest
public class GuestBookDeleteServiceTest {

    @Autowired
    private GuestBookService guestBookService;

    @Autowired
    GuestBookCardRepository guestBookCardRepository;

    @Autowired
    GuestBookCardPhotoRepository guestBookCardPhotoRepository;

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private HostRepository hostRepository;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private SpaceHostMapRepository spaceHostMapRepository;

    private Host host;
    private Space space;
    private Guest guest;

    @BeforeEach
    void setUp() {
        space = SpaceFixture.createSpace();
        spaceRepository.save(space);

        host = HostFixture.createHost();
        hostRepository.save(host);

        spaceHostMapRepository.save(new SpaceHostMap(space, host));

        guest = GuestFixture.createGuest();
        guestRepository.save(guest);
    }

    @DisplayName("지정한 방명록을 논리 삭제한다")
    @Test
    void softDeleteGuestBookCard() {
        // given
        GuestBookCard guestBookCard1 = guestBookCardRepository.save(new GuestBookCard(space, guest, "test1"));
        GuestBookCard guestBookCard2 = guestBookCardRepository.save(new GuestBookCard(space, guest, "test2"));
        GuestBookCard guestBookCard3 = guestBookCardRepository.save(new GuestBookCard(space, guest, "test3"));
        GuestBookCardPhoto guestBookCardPhoto1 = createGuestBookCardPhotoWithGuestBookCard(guestBookCard1);
        GuestBookCardPhoto guestBookCardPhoto2 = createGuestBookCardPhotoWithGuestBookCard(guestBookCard1);
        guestBookCardPhotoRepository.saveAll(List.of(guestBookCardPhoto1, guestBookCardPhoto2));

        // when
        guestBookService.deleteCard(host, space.getCode(), guestBookCard1.getId());
        guestBookService.deleteCard(host, space.getCode(), guestBookCard3.getId());

        // then
        assertAll(
            () -> assertThat(guestBookCardRepository.count()).isEqualTo(3),
            () -> assertThat(guestBookCard1.getDeletedAt()).isNotNull(),
            () -> assertThat(guestBookCard2.getDeletedAt()).isNull(),
            () -> assertThat(guestBookCard3.getDeletedAt()).isNotNull(),

            () -> assertThat(guestBookCardPhoto1.getDeletedAt()).isNotNull(),
            () -> assertThat(guestBookCardPhoto2.getDeletedAt()).isNotNull(),

            () -> assertThat(guestBookCardRepository.findAllBySpaceAndDeletedAtIsNull(space))
                .extracting(GuestBookCard::getId)
                .containsExactly(guestBookCard2.getId())
        );
    }

    @DisplayName("주어진 스페이스에 속하는 모든 방명록을 논리 삭제한다")
    @Test
    void softDeleteGuestBookBySpace() {
        // given
        GuestBookCard guestBookCard1 = guestBookCardRepository.save(new GuestBookCard(space, guest, "test1"));
        GuestBookCard guestBookCard2 = guestBookCardRepository.save(new GuestBookCard(space, guest, "test2"));
        GuestBookCard guestBookCard3 = guestBookCardRepository.save(new GuestBookCard(space, guest, "test3"));

        // when
        guestBookService.deleteAllCardsBySpace(host, space);

        // then
        assertAll(
            () -> assertThat(guestBookCardRepository.count()).isEqualTo(3),
            () -> assertThat(guestBookCard1.getDeletedAt()).isNotNull(),
            () -> assertThat(guestBookCard2.getDeletedAt()).isNotNull(),
            () -> assertThat(guestBookCard3.getDeletedAt()).isNotNull(),

            () -> assertThat(guestBookCardRepository.findAllBySpaceAndDeletedAtIsNull(space)).isEmpty()
        );
    }
}
