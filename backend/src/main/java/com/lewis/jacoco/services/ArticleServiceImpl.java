package com.lewis.jacoco.services;

import com.lewis.jacoco.domain.dto.ArticleDto;
import com.lewis.jacoco.domain.entities.Article;
import com.lewis.jacoco.domain.request.ArticleRequest;
import com.lewis.jacoco.repositories.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    public List<ArticleDto> findAll() {
       return  convertEntityToDto(this.articleRepository.findAll());
    }
    private List<ArticleDto> convertEntityToDto(List<Article> articleList) {
        List<ArticleDto> articleDtoList = new ArrayList<>();
        articleList.stream().forEach(item -> {
            ArticleDto articleDto = new ArticleDto();
            articleDto.setId(item.getId());
            articleDto.setText(item.getText());
            articleDto.setTitle(item.getTitle());
            articleDto.setImage(item.getImage());
            articleDto.setArticleLink(item.getArticleLink());
            articleDtoList.add(articleDto);
        });
        return articleDtoList;
    }

    @Override
    public Optional<Article> getById(UUID id) {
        try
        {
            return  articleRepository.findById(id);
        }
        catch (NullPointerException e)
        {
            throw new NullPointerException();
        }
    }

    @Override
    @Transactional
    public void delete(UUID id)
    {
        Optional<Article> article = getById(id);
        if(article.isEmpty())
            throw new NullPointerException();

       articleRepository.delete(article.get());
    }
}
