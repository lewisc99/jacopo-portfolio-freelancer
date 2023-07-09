package com.lewis.jacoco.services;

import com.lewis.jacoco.domain.dto.ArticleDto;
import com.lewis.jacoco.domain.dto.ArticlesDto;
import com.lewis.jacoco.domain.entities.Article;
import com.lewis.jacoco.domain.request.ArticleRequest;
import com.lewis.jacoco.domain.request.PageModel;
import com.lewis.jacoco.repositories.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
    @Transactional
    public void update(ArticleRequest articleRequest) {
        MultipartFile image = articleRequest.getImage();
        try {
            Article article = getById(articleRequest.getId());
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
    public ArticlesDto findAll(PageModel pageModel) {
        short page = pageModel.getPage();
        short size = pageModel.getSize();
        Pageable paging = PageRequest.of(page,size, Sort.by("createdDateTime").descending());
        Page<Article> articlesPage = articleRepository.findAll(paging);
        return convertEntityToDto(articlesPage);
    }
    private ArticlesDto convertEntityToDto(Page<Article> articlesPage) {
        List<Article> articleList = new ArrayList<>();
        articleList = articlesPage.stream().collect(Collectors.toList());
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
        ArticlesDto articlesDto = new ArticlesDto();
        articlesDto.set_embedded(articleDtoList);
        articlesDto.setTotalPages((short) articlesPage.getTotalPages());
        articlesDto.setTotalElements((short) articlesPage.getTotalElements());
        return articlesDto;
    }

    @Override
    public Article getById(UUID id) {
        try
        {
            return  articleRepository.findById(id).get();
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
       Article article = getById(id);
       articleRepository.delete(article);
    }
}
