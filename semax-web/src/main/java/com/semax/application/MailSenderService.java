package com.semax.application;

import com.semax.domain.Contact;
import com.semax.domain.ContactMessage;
import com.semax.domain.event.MessageEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSenderService {

    private static final Logger log = LoggerFactory.getLogger(MailSenderService.class);
    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String from;

    @Value("${app.mail.send-to}")
    private String to;

    public MailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(ContactMessage contactMessage) throws MailException {
        Contact contact = contactMessage.getContact();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setReplyTo(contact.getEmail());
        message.setSubject("Contact form: " + contact.getFirstName() + " " + contact.getLastName());
        message.setText("""
            Name: %s %s
            Email: %s
            Phone: %s

            %s
            """.formatted(
                contact.getFirstName(), contact.getLastName(),
                contact.getEmail(), contact.getPhoneNumber(),
                contactMessage.getMessage()));
        mailSender.send(message);
    }
}
