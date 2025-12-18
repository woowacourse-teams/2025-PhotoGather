package com.forgather.domain.product.service;

import static com.forgather.fixture.ProductFixture.createProductWithSpace;
import static com.forgather.fixture.ProductPhotoFixture.createProductPhotoWithProduct;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import com.forgather.domain.product.model.Product;
import com.forgather.domain.product.model.ProductPhoto;
import com.forgather.domain.product.repository.ProductPhotoRepository;
import com.forgather.domain.product.repository.ProductRepository;
import com.forgather.domain.space.model.Space;
import com.forgather.domain.space.repository.HostRepository;
import com.forgather.domain.space.repository.SpaceRepository;
import com.forgather.fake.FakeContentStorage;
import com.forgather.fixture.HostFixture;
import com.forgather.fixture.SpaceFixture;
import com.forgather.global.auth.model.Host;
import com.forgather.global.auth.model.SpaceHostMap;
import com.forgather.global.auth.repository.SpaceHostMapRepository;

@Import({ProductService.class, FakeContentStorage.class})
@DataJpaTest
public class ProductDeleteServiceTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductPhotoRepository productPhotoRepository;

    @Autowired
    private HostRepository hostRepository;

    @Autowired
    private SpaceRepository spaceRepository;

    @Autowired
    private SpaceHostMapRepository spaceHostMapRepository;

    private Host host;
    private Space space;

    @BeforeEach
    void setUp() {
        space = SpaceFixture.createSpace();
        spaceRepository.save(space);

        host = HostFixture.createHost();
        hostRepository.save(host);

        spaceHostMapRepository.save(new SpaceHostMap(space, host));
    }

    @DisplayName("특정 작품을 논리 삭제한다")
    @Test
    void softDeleteProduct() {
        // given
        Product product1 = productRepository.save(createProductWithSpace(space));
        Product product2 = productRepository.save(createProductWithSpace(space));
        Product product3 = productRepository.save(createProductWithSpace(space));
        ProductPhoto productPhoto1 = createProductPhotoWithProduct(product2);
        ProductPhoto productPhoto2 = createProductPhotoWithProduct(product2);
        productPhotoRepository.saveAll(List.of(productPhoto1, productPhoto2));

        // when
        productService.delete(host, space.getCode(), product2.getId());

        // then
        assertAll(
            () -> assertThat(productRepository.findAllBySpaceAndDeletedAtIsNull(space)).containsExactly(product1, product3),
            () -> assertThat(product1.getDeletedAt()).isNull(),
            () -> assertThat(product2.getDeletedAt()).isNotNull(),
            () -> assertThat(product3.getDeletedAt()).isNull(),

            () -> assertThat(productPhoto1.getDeletedAt()).isNotNull(),
            () -> assertThat(productPhoto2.getDeletedAt()).isNotNull()
        );
    }

    @DisplayName("주어진 스페이스에 속하는 모든 작품을 논리 삭제한다")
    @Test
    void softDeleteProductBySpace() {
        // given
        Product product1 = productRepository.save(createProductWithSpace(space));
        Product product2 = productRepository.save(createProductWithSpace(space));
        Product product3 = productRepository.save(createProductWithSpace(space));
        ProductPhoto productPhoto1 = createProductPhotoWithProduct(product2);
        ProductPhoto productPhoto2 = createProductPhotoWithProduct(product2);
        productPhotoRepository.saveAll(List.of(productPhoto1, productPhoto2));

        // when
        productService.deleteIfExists(host, space);

        // then
        assertAll(
            () -> assertThat(productRepository.findAllBySpaceAndDeletedAtIsNull(space)).isEmpty(),
            () -> assertThat(product1.getDeletedAt()).isNotNull(),
            () -> assertThat(product2.getDeletedAt()).isNotNull(),
            () -> assertThat(product3.getDeletedAt()).isNotNull(),

            () -> assertThat(productPhoto1.getDeletedAt()).isNotNull(),
            () -> assertThat(productPhoto2.getDeletedAt()).isNotNull()
        );
    }
}
