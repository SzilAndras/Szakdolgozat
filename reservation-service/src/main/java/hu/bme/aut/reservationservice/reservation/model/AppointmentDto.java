package hu.bme.aut.reservationservice.reservation.model;


import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentStatus;
import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentType;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class AppointmentDto {

    private Long id;

    private Date date;

    private String time; // TODO

    private AppointmentStatus status;

    private AppointmentType type;
}
