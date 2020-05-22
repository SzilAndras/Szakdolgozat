package hu.bme.aut.reservationservice.rating.controller;

import hu.bme.aut.reservationservice.rating.model.RatingDto;
import hu.bme.aut.reservationservice.rating.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rating")
public class RatingController {

    @Autowired
    RatingService ratingService;

    @GetMapping
    public List<RatingDto> getAll() {
        return ratingService.getAllRating();
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping
    public void save(RatingDto rating, @RequestAttribute("user") String user) {
        ratingService.createRating(rating, user);
    }



}
