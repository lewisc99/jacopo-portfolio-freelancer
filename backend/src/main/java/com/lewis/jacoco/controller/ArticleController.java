package com.lewis.jacoco.controller;

import com.lewis.jacoco.domain.dto.ArticleDto;
import com.lewis.jacoco.domain.dto.ArticlesDto;
import com.lewis.jacoco.domain.entities.Article;
import com.lewis.jacoco.domain.request.ArticleRequest;
import com.lewis.jacoco.domain.request.PageModel;
import com.lewis.jacoco.repositories.ArticleRepository;
import com.lewis.jacoco.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("api/v1")
@CrossOrigin("*")
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    @Autowired
    private ArticleRepository articleRepository;

    @PostMapping("/save-image")
    public ResponseEntity<Void> saveImage(@ModelAttribute ArticleRequest articleRequest) {
        articleService.create(articleRequest);
        return ResponseEntity.status(200).build();
    }

    @GetMapping
    public ResponseEntity<ArticlesDto> get(@ModelAttribute PageModel pageModel) {
       return ResponseEntity.ok().body(articleService.findAll(pageModel));
    }

    @GetMapping("ola")
    public ResponseEntity<String> get() {
        return ResponseEntity.ok().body("Ola Mundo");
    }


    @GetMapping("{id}")
    public ResponseEntity<ArticleDto> getById(@PathVariable UUID id) {
        Article article = articleService.getById(id);
        return ResponseEntity.ok().body(convertArticleToArticleDto(article));
    }

    private ArticleDto convertArticleToArticleDto(Article article) {
        ArticleDto articleDto = new ArticleDto();
        articleDto.setText(article.getText());
        articleDto.setTitle(article.getTitle());
        articleDto.setId(article.getId());
        articleDto.setArticleLink(article.getArticleLink());
        return articleDto;
    }

    @PutMapping
    public ResponseEntity<Void> update(@ModelAttribute ArticleRequest articleRequest)
    {
        articleService.update(articleRequest);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id)
    {
        articleService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
