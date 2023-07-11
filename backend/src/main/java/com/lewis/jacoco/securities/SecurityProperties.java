package com.lewis.jacoco.securities;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("security-constant")
public class SecurityProperties {

    private String key;
    private String expiration;

    private String header;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Long getExpiration() {
        return Long.valueOf(expiration);
    }

    public void setExpiration(String expiration) {
        this.expiration = expiration;
    }


    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }
}
