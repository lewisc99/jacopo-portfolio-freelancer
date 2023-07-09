package com.lewis.jacoco.domain.entities;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.Length;
import javax.persistence.*;
import java.util.Date;
import java.util.UUID;


@Entity
@Table(name= "tb_article")
public class Article {

    @Id
    @Column(columnDefinition = "uuid",nullable = false)
    @ColumnDefault("random_uuid()")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    @Length(max = 100)
    private String title;

    @Length(max = 300)
    private String text;
    @Length(max = 200)
    private String articleLink;

    private final Date createdDateTime = new Date();

    @Lob
    private byte[] image;

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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Date getCreatedDateTime() {
        return createdDateTime;
    }
}
