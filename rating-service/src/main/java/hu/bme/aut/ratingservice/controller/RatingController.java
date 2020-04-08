package hu.bme.aut.ratingservice.controller;

import hu.bme.aut.ratingservice.model.RatingDto;
import hu.bme.aut.ratingservice.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rating")
public class RatingController {

    @Autowired
    RatingService ratingService;

    @GetMapping
    List<RatingDto> getAll() {
        return ratingService.getAllRating();
    }

    @PutMapping
    void sava(RatingDto rating) {
        ratingService.createRating(rating);
    }



}
