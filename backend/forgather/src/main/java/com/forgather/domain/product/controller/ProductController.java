package com.forgather.domain.product.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forgather.domain.product.dto.RegisterProductRequest;
import com.forgather.domain.product.dto.RegisterProductResponse;
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

    /**
     * TODO
     * 스페이스-호스트 검증
     * dto단 검증
     */
    @Operation(summary = "작품 등록")
    @PostMapping
    public ResponseEntity<RegisterProductResponse> register(
        @PathVariable(value = "spaceCode") String spaceCode,
        @RequestBody RegisterProductRequest request
    ) {
        var createProductResponse = productService.register(spaceCode, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createProductResponse);
    }
}
