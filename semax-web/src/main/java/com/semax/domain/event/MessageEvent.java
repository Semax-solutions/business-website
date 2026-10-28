package com.semax.domain.event;

import com.semax.domain.ContactMessage;

public record MessageEvent(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String message
) {
    public static MessageEvent fromEntity(ContactMessage contactMessage) {
        return new MessageEvent(
                contactMessage.getId(),
                contactMessage.getContact().getFirstName(),
                contactMessage.getContact().getLastName(),
                contactMessage.getContact().getEmail(),
                contactMessage.getContact().getPhoneNumber(),
                contactMessage.getMessage()
        );
    }
}
