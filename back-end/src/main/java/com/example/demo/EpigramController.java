package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/epigrams")
@CrossOrigin(origins = "http://localhost:3000")
public class EpigramController {

    private final EpigramRecord epigramRecord;
    private final Random random = new Random();

    public EpigramController(EpigramRecord record) {
        this.epigramRecord = record;
    }

    @GetMapping
    public List<Epigram> getAllEpigrams() {
        return epigramRecord.EpigramList();
    }

    @GetMapping("/random")
    public Epigram getRandomEpigram() {
        List<Epigram> epigrams = epigramRecord.EpigramList();
        if (epigrams.isEmpty()) {
            throw new IllegalStateException("No epigrams found, please try entering your own!");
        }
        int randomIndex = random.nextInt(epigrams.size());
        return epigrams.get(randomIndex);
    }

    @PostMapping
    public String addEpigram(@RequestBody Epigram epigram) {
        epigramRecord.insertEpigram(epigram.getText(), epigram.getSource());
        return "Epigram has been added successfully!";
    }
}
