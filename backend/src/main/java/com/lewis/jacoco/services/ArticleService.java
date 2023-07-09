package com.lewis.jacoco.services;

import com.lewis.jacoco.domain.dto.ArticlesDto;
import com.lewis.jacoco.domain.entities.Article;
import com.lewis.jacoco.domain.request.ArticleRequest;
import com.lewis.jacoco.domain.request.PageModel;

import java.util.UUID;

public interface ArticleService {
    void  create(ArticleRequest articleRequest);
    void update(ArticleRequest user);
    void delete(UUID id);
    ArticlesDto findAll(PageModel pageModel);
    Article getById(UUID id);
}
