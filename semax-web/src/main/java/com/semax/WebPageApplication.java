package com.semax;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class WebPageApplication {
    public static void main(String[] args) {
        SpringApplication.run(WebPageApplication.class, args);
    }
}
