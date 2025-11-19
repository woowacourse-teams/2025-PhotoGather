package com.forgather.back_office.dto;

public record AdminLoginRequest(
    String username,
    String password
) {
}
