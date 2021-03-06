package hu.bme.aut.reservationservice.reservation.helper;

import hu.bme.aut.reservationservice.reservation.model.Reservation;
import hu.bme.aut.reservationservice.reservation.model.ReservationDto;
import hu.bme.aut.reservationservice.reservation.model.Work;
import hu.bme.aut.reservationservice.reservation.model.WorkDto;

import java.util.stream.Collectors;

public final class ReservationMapper {

    private ReservationMapper() {
    }

    public static ReservationDto mapToReservationDto(Reservation reservation) {
        return ReservationDto.builder()
                .id(reservation.getId())
                .adminStatus(reservation.getAdminStatus())
                .userStatus(reservation.getUserStatus())
                .userId(reservation.getUserId())
                .vehicleType(reservation.getVehicleType())
                .plateNumber(reservation.getPlateNumber())
                .vin(reservation.getVin())
                .works(reservation.getWorks().stream().map(work ->
                        WorkDto.builder().id(work.getId())
                                .periodOfTime(work.getPeriodOfTime())
                                .price(work.getPrice())
                                .status(work.getStatus())
                                .work(work.getWork())
                                .build()).collect(Collectors.toSet()))
                .appointments(reservation.getAppointments().stream().map(AppointmentMapper::mapToDto).collect(Collectors.toSet()))
                .build();

    }

    public static Reservation mapFromReservationDto(ReservationDto reservation) {
        return Reservation.builder()
                .id(reservation.getId())
                .adminStatus(reservation.getAdminStatus())
                .userStatus(reservation.getUserStatus())
                .userId(reservation.getUserId())
                .vehicleType(reservation.getVehicleType())
                .plateNumber(reservation.getPlateNumber())
                .vin(reservation.getVin())
                .works(reservation.getWorks().stream().map(work ->
                        Work.builder().id(work.getId())
                                .periodOfTime(work.getPeriodOfTime())
                                .price(work.getPrice())
                                .status(work.getStatus())
                                .work(work.getWork())
                                .build()).collect(Collectors.toSet()))
                .appointments(reservation.getAppointments().stream().map(AppointmentMapper::mapFromDto).collect(Collectors.toSet()))
                .build();
    }
}
