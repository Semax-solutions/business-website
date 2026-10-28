package com.semax.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.Instant;

import static com.semax.domain.MailStatus.*;

public class MailDelivery {

    @Enumerated(EnumType.STRING)
    @Column(name = "mail_status", nullable = false)
    private MailStatus mailStatus = PENDING;

    @Column(name = "mail_error", length = 500)
    private String error;

    @Column(name = "mail_sent_at")
    private Instant sentAt;

    protected MailDelivery() {}

    public static MailDelivery pending() {
        return new MailDelivery();
    }

    public void markSent() {
        this.mailStatus = SENT;
        this.sentAt = Instant.now();
    }

    public void markFailed(String error) {
        this.mailStatus = FAILED;
        this.error = error != null && error.length() > 500
                ? error.substring(0, 500)
                : error;
    }

    public boolean isSent() {
        return mailStatus == SENT;
    }

    public MailStatus getMailStatus() {
        return mailStatus;
    }

    public String getError() {
        return error;
    }

    public Instant getSentAt() {
        return sentAt;
    }
}
