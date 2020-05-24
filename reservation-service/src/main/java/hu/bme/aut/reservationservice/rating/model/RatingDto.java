package hu.bme.aut.reservationservice.rating.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
public class RatingDto {
    private Long id;
    private String authorName;
    private Integer score;
    private String comment;
    private Date createdDate;

}
