package hu.bme.aut.ratingservice.model;

import lombok.Builder;
import lombok.Data;;

@Data
@Builder
public class RatingDto {
    private Long id;
    private Long authorId;
    private String authorName;
    private int score;
    private String comment;
}
