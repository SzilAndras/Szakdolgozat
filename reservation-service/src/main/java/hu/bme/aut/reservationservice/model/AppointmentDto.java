package hu.bme.aut.reservationservice.model;


import hu.bme.aut.reservationservice.model.Enum.AppointmentStatus;
import hu.bme.aut.reservationservice.model.Enum.AppointmentType;
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
