package com.semax.presentation.controller;

import com.semax.application.ContactMessageService;
import com.semax.presentation.dto.MessageRequestDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sent-message")
public class ContactMessageController {
    private final ContactMessageService contactMessageService;

    public ContactMessageController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void sentMessage(@RequestBody MessageRequestDto messageRequestDto) {
        this.contactMessageService.sentMessage(messageRequestDto);
    }
}
