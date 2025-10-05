package com.forgather.domain.product.controller;

import static org.springframework.http.HttpStatus.CREATED;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.domain.product.dto.ProductResponse;
import com.forgather.domain.product.dto.RegisterProductRequest;
import com.forgather.domain.product.dto.UpdateProductRequest;
import com.forgather.domain.product.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Product: 전시 작품", description = "전시 작품 관련 API")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/spaces/{spaceCode}/products")
@RestController
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "작품 조회")
    @GetMapping
    public ResponseEntity<ProductResponse> get(@PathVariable(value = "spaceCode") String spaceCode) {
        var response = productService.get(spaceCode);
        return ResponseEntity.ok().body(response);
    }

    /**
     * TODO
     * 스페이스-호스트 검증
     * dto단 검증
     * 사진 정렬
     */
    @Operation(summary = "작품 등록")
    @PostMapping
    public ResponseEntity<ProductResponse> register(
        @PathVariable(value = "spaceCode") String spaceCode,
        @RequestBody RegisterProductRequest request
    ) {
        var response = productService.register(spaceCode, request);
        return ResponseEntity.status(CREATED).body(response);
    }

    /**
     * TODO
     * 스페이스-호스트 검증
     * dto단 검증
     */
    @Operation(summary = "작품 수정")
    @PatchMapping
    public ResponseEntity<ProductResponse> update(
        @PathVariable(value = "spaceCode") String spaceCode,
        @RequestBody UpdateProductRequest request
    ) {
        var response = productService.update(spaceCode, request);
        return ResponseEntity.ok().body(response);
    }

    /**
     * TODO
     * 스페이스-호스트 검증
     */
    @Operation(summary = "작품 삭제")
    @DeleteMapping
    public ResponseEntity<Void> delete(@PathVariable(value = "spaceCode") String spaceCode) {
        productService.delete(spaceCode);
        return ResponseEntity.noContent().build();
    }
}
