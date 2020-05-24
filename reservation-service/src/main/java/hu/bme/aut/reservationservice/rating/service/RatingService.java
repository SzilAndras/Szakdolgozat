package hu.bme.aut.reservationservice.rating.service;

import hu.bme.aut.reservationservice.rating.model.Rating;
import hu.bme.aut.reservationservice.rating.model.RatingDto;
import hu.bme.aut.reservationservice.rating.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {

    @Autowired
    RatingRepository ratingRepository;

    public List<RatingDto> getAllRating() {
        return ratingRepository.findAll().stream().map(rating -> RatingDto.builder()
                .id(rating.getId())
                .authorName(rating.getAuthorName())
                .score(rating.getScore())
                .comment(rating.getComment())
                .createdDate(rating.getCreatedDate())
                .build()).collect(Collectors.toList());
    }

    public void createRating(RatingDto rating, String user) {
        ratingRepository.save(Rating.builder()
                .authorName(user)
                .score(rating.getScore())
                .comment(rating.getComment())
                .createdDate(new Date())
                .build());
    }
}
