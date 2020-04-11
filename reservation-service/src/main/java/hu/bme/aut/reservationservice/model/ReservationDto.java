package hu.bme.aut.reservationservice.model;

import hu.bme.aut.reservationservice.model.Enum.Status;
import hu.bme.aut.reservationservice.model.Enum.VehicleType;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class ReservationDto {

    private Long id;

    private Long userId; // TODO manytoone??

    private VehicleType vehicleType;

    private String plateNumber;

    private String vin;

    private Status adminStatus;

    private Status userStatus;

    private Set<AppointmentDto> appointments;

    private Set<WorkDto> works;
}
