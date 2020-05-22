package hu.bme.aut.reservationservice.rating.model;

import lombok.Builder;
import lombok.Data;
import java.util.Date;

@Data
@Builder
public class RatingDto {
    private Long id;
    private Long authorId;
    private String authorName;
    private int score;
    private String comment;
    private Date createdDate;

}
