package hu.bme.aut.infoservice.model;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class NewsDto {

    private Long id;

    private Long authorId;

    private String authorName;

    private String text;

    private String tags;

    private Date createdDate;

    private Date lastModifiedDate;
}
