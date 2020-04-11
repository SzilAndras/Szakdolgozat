package hu.bme.aut.reservationservice.helper;

import hu.bme.aut.reservationservice.model.Appointment;
import hu.bme.aut.reservationservice.model.AppointmentDto;

public final class AppointmentMapper {

    private AppointmentMapper() {
    }

    public static AppointmentDto mapToDto(Appointment appointment) {
        return AppointmentDto
                .builder()
                .id(appointment.getId())
                .status(appointment.getStatus())
                .date(appointment.getDate())
                .time(appointment.getTime())
                .type(appointment.getType())
                .build();
    }

    public static Appointment mapFromDto(AppointmentDto appointment) {
        return Appointment
                .builder()
                .id(appointment.getId())
                .status(appointment.getStatus())
                .date(appointment.getDate())
                .time(appointment.getTime())
                .type(appointment.getType())
                .build();
    }
}
