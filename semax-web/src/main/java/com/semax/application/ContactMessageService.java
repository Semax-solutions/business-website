package com.semax.application;

import com.semax.data.ContactMessageRepository;
import com.semax.domain.Contact;
import com.semax.domain.ContactMessage;
import com.semax.domain.event.MessageEvent;
import com.semax.presentation.dto.MessageRequestDto;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactMessageService {
    private final ContactMessageRepository contactMessageRepository;
    private final ApplicationEventPublisher publisher;

    public ContactMessageService(ContactMessageRepository contactMessageRepository, ApplicationEventPublisher publisher) {
        this.contactMessageRepository = contactMessageRepository;
        this.publisher = publisher;
    }

    @Transactional
    public void sentMessage(MessageRequestDto request) {
        ContactMessage contactMessage = new ContactMessage(
                request.message(),
                new Contact(
                        request.firstName(),
                        request.lastName(),
                        request.email(),
                        request.phoneNumber()
                )
        );

        contactMessage = this.contactMessageRepository.saveAndFlush(contactMessage);

        this.publisher.publishEvent(MessageEvent.fromEntity(contactMessage));
    }
}
