package com.lewis.jacoco.services;

import com.lewis.jacoco.domain.entities.Article;
import com.lewis.jacoco.domain.request.ArticleRequest;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface ArticleService {
    void  create(ArticleRequest articleRequest);
    void update(Article user);
    void delete(UUID id);
    Page<Article> findAll();
}
