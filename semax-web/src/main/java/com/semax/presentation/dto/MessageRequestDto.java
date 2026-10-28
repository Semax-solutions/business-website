package com.semax.presentation.dto;

public record MessageRequestDto(
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String message
) {
}
