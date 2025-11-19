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
import com.forgather.domain.product.dto.ProductResponseV2;
import com.forgather.domain.product.dto.RegisterProductRequest;
import com.forgather.domain.product.dto.RegisterProductRequestV2;
import com.forgather.domain.product.dto.UpdateProductRequest;
import com.forgather.domain.product.dto.UpdateProductRequestV2;
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

    /**
     * TODO 영상 임베드 버전으로 마이그레이션 이후 제거
     */
    @GetMapping
    public ResponseEntity<ProductResponse> get(@PathVariable(value = "spaceCode") String spaceCode) {
        var response = productService.get(spaceCode);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "작품 조회", description = "임베드 영상이 반영된 api는 version 2로 호출")
    @GetMapping(headers = "X-API-Version=2")
    public ResponseEntity<ProductResponseV2> getV2(@PathVariable(value = "spaceCode") String spaceCode) {
        var response = productService.getV2(spaceCode);
        return ResponseEntity.ok().body(response);
    }

    /**
     * TODO 영상 임베드 버전으로 마이그레이션 이후 제거
     */
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping
    public ResponseEntity<ProductResponse> register(
        @PathVariable(value = "spaceCode") String spaceCode,
        @RequestBody RegisterProductRequest request,
        @LoginHost(required = true) Host host
    ) {
        var response = productService.register(host, spaceCode, request);
        return ResponseEntity.status(CREATED).body(response);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "작품 등록", description = "임베드 영상이 반영된 api는 version 2로 호출")
    @PostMapping(headers = "X-API-Version=2")
    public ResponseEntity<ProductResponseV2> registerV2(
        @PathVariable(value = "spaceCode") String spaceCode,
        @RequestBody RegisterProductRequestV2 request,
        @LoginHost(required = true) Host host
    ) {
        var response = productService.register(host, spaceCode, request);
        return ResponseEntity.status(CREATED).body(response);
    }

    /**
     * TODO 영상 임베드 버전으로 마이그레이션 이후 제거
     */
    @SecurityRequirement(name = "bearerAuth")
    @PatchMapping
    public ResponseEntity<ProductResponse> update(
        @PathVariable(value = "spaceCode") String spaceCode,
        @RequestBody UpdateProductRequest request,
        @LoginHost(required = true) Host host
    ) {
        var response = productService.update(host, spaceCode, request);
        return ResponseEntity.ok().body(response);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "작품 수정",
        description = "변경 사항이 없는 데이터는 json에 포함하지 않거나 null로 요청한다.  임베드 영상이 반영된 api는 version 2로 호출")
    @PatchMapping(headers = "X-API-Version=2")
    public ResponseEntity<ProductResponseV2> updateV2(
        @PathVariable(value = "spaceCode") String spaceCode,
        @RequestBody UpdateProductRequestV2 request,
        @LoginHost(required = true) Host host
    ) {
        var response = productService.update(host, spaceCode, request);
        return ResponseEntity.ok().body(response);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "작품 삭제")
    @DeleteMapping
    public ResponseEntity<Void> delete(
        @PathVariable(value = "spaceCode") String spaceCode,
        @LoginHost(required = true) Host host
    ) {
        productService.delete(host, spaceCode);
        return ResponseEntity.noContent().build();
    }
}
