package com.semax.application.listener;

import com.semax.application.MailSenderService;
import com.semax.data.ContactMessageRepository;
import com.semax.domain.ContactMessage;
import com.semax.domain.event.MessageEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class MessageEventListener {
    private static final Logger log = LoggerFactory.getLogger(MessageEventListener.class);
    private final MailSenderService mailSenderService;
    private final ContactMessageRepository contactMessageRepository;

    public MessageEventListener(MailSenderService mailSenderService, ContactMessageRepository contactMessageRepository) {
        this.mailSenderService = mailSenderService;
        this.contactMessageRepository = contactMessageRepository;
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleMessage(MessageEvent event) {
        ContactMessage message  = contactMessageRepository.findById(event.id())
                .orElseThrow(() -> new IllegalArgumentException("Not found"));
        try {
            mailSenderService.sendEmail(event);
            message.markMailSent();
        } catch (MailException ex) {
            log.error("Mail for contact message {} could not be sent", message.getId(), ex);
            message.markMailFailed(ex.getMessage());
        }
    }
}
