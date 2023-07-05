package com.lewis.jacoco.controller;

import com.lewis.jacoco.domain.dto.ArticleDto;
import com.lewis.jacoco.domain.request.ArticleRequest;
import com.lewis.jacoco.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1")
public class ArticleController {


    @Autowired
    private ArticleService articleService;

    @PostMapping("/save-image")
    public ResponseEntity<Void> saveImage(@ModelAttribute ArticleRequest articleRequest) {
        articleService.create(articleRequest);
       return ResponseEntity.status(200).build();
    }

    @GetMapping
    public ResponseEntity<List<ArticleDto>> get() {
       return ResponseEntity.ok().body(articleService.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@Valid @PathVariable UUID id)
    {
        articleService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
