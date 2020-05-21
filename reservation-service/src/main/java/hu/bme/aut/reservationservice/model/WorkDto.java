package hu.bme.aut.reservationservice.model;

import hu.bme.aut.reservationservice.model.Enum.Status;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WorkDto {

    private Long id;

    private String work;

    private Integer periodOfTime;

    private Integer price;

    private Status status;
}
