package com.lewis.jacoco.domain.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public class ArticleRequest {

    private UUID id;
    private String title;
    private String text;
    private String articleLink;
    private MultipartFile image;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getArticleLink() {
        return articleLink;
    }

    public void setArticleLink(String articleLink) {
        this.articleLink = articleLink;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
