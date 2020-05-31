package hu.bme.aut.reservationservice.reservation.model;

import hu.bme.aut.reservationservice.reservation.model.enums.Status;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class ReservationDto {

    private Long id;

    private Long userId;

    private String vehicleType;

    private String plateNumber;

    private String vin;

    private Status adminStatus;

    private Status userStatus;

    private Set<AppointmentDto> appointments;

    private Set<WorkDto> works;
}
