package com.semax.application.listener;

import com.semax.application.MailSenderService;
import com.semax.domain.event.MessageEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class MessageEventListener {
    private final MailSenderService mailSenderService;

    public MessageEventListener(MailSenderService mailSenderService) {
        this.mailSenderService = mailSenderService;
    }

    @Async
    @EventListener
    public void handleMessage(MessageEvent event) {
        mailSenderService.sendEmail(event);
    }
}
