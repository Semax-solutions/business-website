package com.semax.application.listener;

import com.semax.application.MailSenderService;
import com.semax.domain.event.MessageEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class MessageEventListener {
    private final MailSenderService mailSenderService;

    public MessageEventListener(MailSenderService mailSenderService) {
        this.mailSenderService = mailSenderService;
    }

    @EventListener
    public void handleMessage(MessageEvent event) {
        System.out.println(event);
    }
}
