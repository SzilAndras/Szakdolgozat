package hu.bme.aut.reservationservice.rating.model;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class RatingDto {
    private Long id;
    private String authorName;
    private Integer score;
    private String comment;

}
