package com.lewis.jacoco.controller;

import com.lewis.jacoco.domain.request.ArticleRequest;
import com.lewis.jacoco.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
public class ArticleController {


    @Autowired
    private ArticleService articleService;

    @PostMapping("/save-image")
    public void saveImage(@ModelAttribute ArticleRequest articleRequest) {
        articleService.create(articleRequest);
    }

}
