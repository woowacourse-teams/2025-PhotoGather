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
import com.forgather.domain.product.dto.ProductsResponse;
import com.forgather.domain.product.dto.RegisterProductRequest;
import com.forgather.domain.product.dto.UpdateProductRequest;
import com.forgather.domain.product.service.ProductService;
import com.forgather.global.auth.annotation.LoginHost;
import com.forgather.global.auth.model.Host;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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

    @Operation(summary = "작품 목록 조회", description = "작품 목록 조회가 반영된 api는 version 3으로 호출")
    @GetMapping(headers = "X-API-Version=3")
    public ResponseEntity<ProductsResponse> getV3(@PathVariable(value = "spaceCode") String spaceCode) {
        var response = productService.getAll(spaceCode);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "작품 상세 조회")
    @GetMapping(value = "/{productId}", headers = "X-API-Version=1")
    public ResponseEntity<ProductResponse> get(
        @PathVariable(value = "spaceCode") String spaceCode,
        @PathVariable(value = "productId") Long productId
    ) {
        var response = productService.get(spaceCode, productId);
        return ResponseEntity.ok().body(response);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "작품 등록", description = "복수 작품 등록이 반영된 api는 version 3으로 호출")
    @PostMapping(headers = "X-API-Version=3")
    public ResponseEntity<ProductResponse> registerV3(
        @PathVariable(value = "spaceCode") String spaceCode,
        @RequestBody RegisterProductRequest request,
        @LoginHost(required = true) Host host
    ) {
        var response = productService.registerV3(host, spaceCode, request);
        return ResponseEntity.status(CREATED).body(response);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "작품 수정",
        description = "변경 사항이 없는 데이터는 json에 포함하지 않거나 null로 요청한다.  복수 작품 등록이 반영된 api는 version 1로 호출")
    @PatchMapping(value = "/{productId}", headers = "X-API-Version=1")
    public ResponseEntity<ProductResponse> updateV3(
        @PathVariable(value = "spaceCode") String spaceCode,
        @PathVariable(value = "productId") Long productId,
        @RequestBody UpdateProductRequest request,
        @LoginHost(required = true) Host host
    ) {
        var response = productService.updateV3(host, spaceCode, productId, request);
        return ResponseEntity.ok().body(response);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "작품 삭제", description = "복수 작품 등록이 반영된 api는 version 1로 호출")
    @DeleteMapping(value = "/{productId}", headers = "X-API-Version=1")
    public ResponseEntity<Void> deleteV2(
        @PathVariable(value = "spaceCode") String spaceCode,
        @PathVariable(value = "productId") Long productId,
        @LoginHost(required = true) Host host
    ) {
        productService.deleteV2(host, spaceCode, productId);
        return ResponseEntity.noContent().build();
    }
}
