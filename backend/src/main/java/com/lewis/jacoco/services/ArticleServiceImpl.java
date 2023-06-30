package com.lewis.jacoco.services;

import com.lewis.jacoco.domain.entities.Article;
import com.lewis.jacoco.domain.request.ArticleRequest;
import com.lewis.jacoco.repositories.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.UUID;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Override
    @Transactional
    public void create(ArticleRequest articleRequest) {

        MultipartFile image = articleRequest.getImage();
        try {
            Article article = new Article();
            article.setArticleLink(articleRequest.getArticleLink());
            article.setText(articleRequest.getText());
            article.setTitle(articleRequest.getTitle());
            article.setImage(image.getBytes());
            articleRepository.save(article);
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    @Override
    public void update(Article user) {

    }

    @Override
    public void delete(UUID id) {

    }

    @Override
    public Page<Article> findAll() {
        return null;
    }
}
