package com.semax.domain;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;

import static com.semax.domain.Status.PENDING;

@Entity
public class MailLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Contact contact;

    @Column(name = "message", nullable = false, updatable = false, length = 1024)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = PENDING;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    protected MailLog() {}

    public MailLog(Contact contact, String message, Status status) {
        this.contact = contact;
        this.message = message;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Contact getContact() {
        return contact;
    }

    public String getMessage() {
        return message;
    }

    public Status getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
