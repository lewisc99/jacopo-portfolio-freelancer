package com.lewis.jacoco.services;

import com.lewis.jacoco.domain.dto.ArticleDto;
import com.lewis.jacoco.domain.entities.Article;
import com.lewis.jacoco.domain.request.ArticleRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArticleService {
    void  create(ArticleRequest articleRequest);
    void update(Article user);
    void delete(UUID id);
    List<ArticleDto> findAll();
    Optional<Article> getById(UUID id);
}
