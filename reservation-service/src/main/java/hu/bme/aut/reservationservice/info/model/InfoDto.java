package hu.bme.aut.reservationservice.info.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InfoDto {
    private Long id;
    private String label;
    private String type;
    private String value;
}
