package com.example.demo;

public class Epigram {
    private Long epigram_id;
    private String epigram_text;
    private String epigram_dateAdded;
    private String epigram_source;

    public Epigram() {
    }

    public Epigram(Long id, String text, String dateAdded) { // Constructor for epigram without source
        this.epigram_id = id;
        this.epigram_text = text;
        this.epigram_dateAdded = dateAdded;
    }

    public Epigram(Long id, String text, String dateAdded, String source) { // Constructor for epigram with source
        this.epigram_id = id;
        this.epigram_text = text;
        this.epigram_dateAdded = dateAdded;
        this.epigram_source = source;
    }

    // Getters and Setters
    public Long getId() {
        return epigram_id;
    }

    public void setId(Long id) {
        this.epigram_id = id;
    }

    public String getText() {
        return epigram_text;
    }

    public void setText(String text) {
        this.epigram_text = text;
    }

    public String getDateAdded() {
        return epigram_dateAdded;
    }

    public void setDateAdded(String dateAdded) {
        this.epigram_dateAdded = dateAdded;
    }

    public String getSource() {
        return epigram_source;
    }

    public void setSource(String source) {
        this.epigram_source = source;
    }
}
