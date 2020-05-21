package hu.bme.aut.reservationservice.reservation.model;

import hu.bme.aut.reservationservice.reservation.model.enums.Status;
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
