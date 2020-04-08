package hu.bme.aut.ratingservice.service;

import hu.bme.aut.ratingservice.model.Rating;
import hu.bme.aut.ratingservice.model.RatingDto;
import hu.bme.aut.ratingservice.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {

    @Autowired
    RatingRepository ratingRepository;

    public List<RatingDto> getAllRating() {
        return ratingRepository.findAll().stream().map(rating -> RatingDto.builder()
                .id(rating.getId())
                .authorId(rating.getAuthorId())
                .authorName(rating.getAuthorName())
                .score(rating.getScore())
                .comment(rating.getComment())
                .build()).collect(Collectors.toList());
    }

    public void createRating(RatingDto rating) {
        ratingRepository.save(Rating.builder()
                .id(rating.getId())
                .authorId(rating.getAuthorId())
                .authorName(rating.getAuthorName())
                .score(rating.getScore())
                .comment(rating.getComment())
                .build());
    }
}
