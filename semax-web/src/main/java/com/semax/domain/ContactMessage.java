package com.semax.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

import static com.semax.domain.MailStatus.PENDING;

@Entity
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message", nullable = false, updatable = false, columnDefinition = "text")
    private String message;

    @Embedded
    private Contact contact;

    @Embedded
    private MailDelivery mailDelivery;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    protected ContactMessage() {}

    public ContactMessage(String message, Contact contact) {
        this.message = message;
        this.contact = contact;
        this.mailDelivery = MailDelivery.pending();
    }

    public void markMailSent() {
        mailDelivery.markSent();
    }

    public void markMailFailed(String error) {
        mailDelivery.markFailed(error);
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public Contact getContact() {
        return contact;
    }

    public MailDelivery getMailDelivery() {
        return mailDelivery;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
