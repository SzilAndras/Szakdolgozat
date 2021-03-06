package hu.bme.aut.reservationservice.info.model;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class NewsDto {

    private Long id;

    private String authorName;

    private String text;

    private String title;

    private String tags;
}
