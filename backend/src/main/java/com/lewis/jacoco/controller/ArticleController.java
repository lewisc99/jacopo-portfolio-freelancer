package com.lewis.jacoco.controller;

import com.lewis.jacoco.domain.request.ArticleRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/v1")
public class ArticleController {

    @PostMapping("/save-image")
    public void saveImage(@ModelAttribute ArticleRequest article) {
        MultipartFile image = article.getImage();
        String title = article.getTitle();
        String text = article.getText();

        try {
            byte[] imageData = image.getBytes();

            // Save the imageData, title, and text to the database or perform any required operations

            System.out.println("Image saved successfully");
        } catch (IOException e) {
            System.err.println("Failed to save image: " + e.getMessage());
        }
    }

}
