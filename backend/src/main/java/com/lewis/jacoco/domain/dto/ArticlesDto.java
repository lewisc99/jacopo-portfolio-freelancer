package com.lewis.jacoco.domain.dto;

import java.util.ArrayList;
import java.util.List;

public class ArticlesDto {

    private List<ArticleDto> _embedded = new ArrayList<>();
    private short totalPages;
    private short totalElements;

    public List<ArticleDto> get_embedded() {
        return _embedded;
    }

    public void set_embedded(List<ArticleDto> _embedded) {
        this._embedded = _embedded;
    }

    public short getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(short totalPages) {
        this.totalPages = totalPages;
    }

    public short getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(short totalElements) {
        this.totalElements = totalElements;
    }
}
