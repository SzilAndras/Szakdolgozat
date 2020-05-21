package hu.bme.aut.reservationservice.service;

import hu.bme.aut.reservationservice.helper.AppointmentMapper;
import hu.bme.aut.reservationservice.helper.ReservationMapper;
import hu.bme.aut.reservationservice.model.Appointment;
import hu.bme.aut.reservationservice.model.AppointmentDto;
import hu.bme.aut.reservationservice.model.Enum.AppointmentStatus;
import hu.bme.aut.reservationservice.model.Enum.AppointmentType;
import hu.bme.aut.reservationservice.model.Enum.Status;
import hu.bme.aut.reservationservice.model.Reservation;
import hu.bme.aut.reservationservice.model.ReservationDto;
import hu.bme.aut.reservationservice.repository.ReservationRepository;
import hu.bme.aut.reservationservice.repository.specification.ReservationSpecificationsBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    Long userId = 1l; // TODO

    @Autowired
    private ReservationRepository reservationRepository;

    public ReservationDto save(ReservationDto reservation) {
        reservation.getAppointments().forEach(
                appointmentDto -> appointmentDto.setStatus(AppointmentStatus.SUGGESTED)
        );
        if (reservation.getId() == null) {
            reservation.setUserId(userId);
            reservation.setAdminStatus(Status.PENDING);
            reservation.setUserStatus(Status.PENDING);
            return ReservationMapper.mapToReservationDto(reservationRepository.save(ReservationMapper.mapFromReservationDto(reservation)));
        } else {
            Optional<Reservation> resOpt = this.reservationRepository.findById(reservation.getId());
            if (resOpt.isPresent()) { // and if admin
                reservation.setAdminStatus(Status.ACCEPTED);
                reservation.setUserStatus(Status.PENDING);
                return ReservationMapper.mapToReservationDto(reservationRepository.save(ReservationMapper.mapFromReservationDto(reservation)));
            }
        }
        return null; // TODO error
    }

    public Slice<ReservationDto> getByFilter(String search, int page, int size) {
        ReservationSpecificationsBuilder builder = new ReservationSpecificationsBuilder();
        Pattern pattern = Pattern.compile("(\\w+?)(:|<|>)(\\w+?),", Pattern.UNICODE_CHARACTER_CLASS);
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            if (matcher.group(1).contains("Status")) {
                Status status = Status.valueOf(matcher.group(3).toUpperCase());
                builder.with(matcher.group(1), matcher.group(2), status);
            } else {
                builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
            }
        }

        Specification<Reservation> spec = builder.build();

        Pageable pageable = PageRequest.of(page, size);

        return reservationRepository.findAll(spec, pageable).map(ReservationMapper::mapToReservationDto);
    }

    public ReservationDto selectByUser(Long id, Status status) {
        Optional<Reservation> resOpt = this.reservationRepository.findById(id);
        if (resOpt.isPresent()) {
            Reservation reservation = resOpt.get();
            if (reservation.getAdminStatus() != Status.REJECTED && reservation.getUserStatus() != Status.REJECTED && reservation.getUserId().equals(userId)) {
                reservation.setUserStatus(status);
                if (reservation.getAdminStatus() == Status.ACCEPTED) {
                    reservation.getAppointments().stream().forEach(
                            appointment -> appointment.setStatus(AppointmentStatus.ACCEPTED)
                    );
                }
                return ReservationMapper.mapToReservationDto(reservationRepository.save(reservation));
            }
        }
        return null; // TODO return error
    }

    public ReservationDto userAccept(Long id) {
        Optional<Reservation> resOpt = this.reservationRepository.findById(id);
        if (resOpt.isPresent()) {
            Reservation reservation = resOpt.get();
            if (reservation.getAdminStatus() != Status.REJECTED && reservation.getUserStatus() != Status.REJECTED && reservation.getUserId().equals(userId)) {
                reservation.setUserStatus(Status.ACCEPTED);
                if (reservation.getAdminStatus() == Status.ACCEPTED) {
                    reservation.getAppointments().forEach(
                            appointment -> appointment.setStatus(AppointmentStatus.ACCEPTED)
                    );
                }
                return ReservationMapper.mapToReservationDto(reservationRepository.save(reservation));
            }
        }
        return null; // TODO return error
    }

    public ReservationDto adminAccept(Long id) {
        Optional<Reservation> resOpt = this.reservationRepository.findById(id);
        if (resOpt.isPresent()) {
            Reservation reservation = resOpt.get();
            if (reservation.getAdminStatus() != Status.REJECTED && reservation.getUserStatus() != Status.REJECTED) {
                reservation.setAdminStatus(Status.ACCEPTED);
                if (reservation.getUserStatus() == Status.ACCEPTED) {
                    reservation.getAppointments().forEach(
                            appointment -> appointment.setStatus(AppointmentStatus.ACCEPTED)
                    );
                }
                return ReservationMapper.mapToReservationDto(reservationRepository.save(reservation));
            }
        }
        return null; // TODO return error
    }

    public ReservationDto userReject(Long id) {
        Optional<Reservation> resOpt = this.reservationRepository.findById(id);
        if (resOpt.isPresent()) {
            Reservation reservation = resOpt.get();
            if (reservation.getUserId().equals(userId) &&
                    reservation.getAdminStatus() != Status.REJECTED &&
                    reservation.getUserStatus() != Status.REJECTED &&
                    (reservation.getAdminStatus() != Status.ACCEPTED &&
                            reservation.getUserStatus() != Status.ACCEPTED)) {
                reservation.setUserStatus(Status.REJECTED);
                reservation.getAppointments().forEach(
                        appointment -> appointment.setStatus(AppointmentStatus.REJECTED)
                );
                reservation.getWorks().forEach(
                        work -> work.setStatus(Status.REJECTED)
                );
                return ReservationMapper.mapToReservationDto(reservationRepository.save(reservation));
            }
        }
        return null; // TODO return error
    }

    public ReservationDto adminReject(Long id) {
        Optional<Reservation> resOpt = this.reservationRepository.findById(id);
        if (resOpt.isPresent()) {
            Reservation reservation = resOpt.get();
            if (reservation.getAdminStatus() != Status.REJECTED &&
                    reservation.getUserStatus() != Status.REJECTED &&
                    (reservation.getAdminStatus() != Status.ACCEPTED &&
                            reservation.getUserStatus() != Status.ACCEPTED)) {
                reservation.setAdminStatus(Status.REJECTED);
                reservation.getAppointments().forEach(
                        appointment -> appointment.setStatus(AppointmentStatus.REJECTED)
                );
                reservation.getWorks().forEach(
                        work -> work.setStatus(Status.REJECTED)
                );
                return ReservationMapper.mapToReservationDto(reservationRepository.save(reservation));
            }
        }
        return null; // TODO return error
    }

    public ReservationDto suggest(ReservationDto reservationDto) {
        Optional<Reservation> resOpt = this.reservationRepository.findById(reservationDto.getId());
        if (resOpt.isPresent()) {
            Reservation reservation = resOpt.get();
            AppointmentDto handoverApp = reservationDto.getAppointments().stream().filter(
                    app -> app.getType() == AppointmentType.HANDOVER
            ).findFirst().orElse(null);
            boolean isOwner = reservation.getUserId().equals(userId);
            boolean isAdmin = true; // TODO
            if (handoverApp != null) {
                if (isOwner || isAdmin) {
                    if (isOwner) {
                        reservation.setAdminStatus(Status.PENDING);
                        reservation.setUserStatus(Status.ACCEPTED);
                    } else {
                        reservation.setAdminStatus(Status.ACCEPTED);
                        reservation.setUserStatus(Status.PENDING);
                    }

                    Appointment currentHandoverApp = reservation.getAppointments().stream().filter(
                            app -> app.getType() == AppointmentType.HANDOVER
                    ).findFirst().orElse(null);
                    if (currentHandoverApp != null && currentHandoverApp.getStatus() == AppointmentStatus.SUGGESTED) {
                        currentHandoverApp.setDate(handoverApp.getDate());
                        currentHandoverApp.setTime(handoverApp.getTime());
                    } else {
                        handoverApp.setStatus(AppointmentStatus.SUGGESTED);
                        reservation.getAppointments().add(AppointmentMapper.mapFromDto(handoverApp));
                    }
                    return ReservationMapper.mapToReservationDto(reservationRepository.save(reservation));
                }
            }
        }
        return null; // error some data not exist
    }

}
