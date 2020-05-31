package hu.bme.aut.reservationservice.reservation.service;

import hu.bme.aut.reservationservice.reservation.helper.AppointmentMapper;
import hu.bme.aut.reservationservice.reservation.helper.ReservationMapper;
import hu.bme.aut.reservationservice.reservation.model.Appointment;
import hu.bme.aut.reservationservice.reservation.model.AppointmentDto;
import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentStatus;
import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentType;
import hu.bme.aut.reservationservice.reservation.model.enums.Status;
import hu.bme.aut.reservationservice.reservation.model.Reservation;
import hu.bme.aut.reservationservice.reservation.model.ReservationDto;
import hu.bme.aut.reservationservice.reservation.repository.ReservationRepository;
import hu.bme.aut.reservationservice.shared.filter.SpecificationBuilder;
import hu.bme.aut.reservationservice.user.model.User;
import hu.bme.aut.reservationservice.user.model.enums.Role;
import hu.bme.aut.reservationservice.shared.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class ReservationService {


    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    private User findUser(String name) {
        return userRepository.findByUsername(name);
    }

    public ReservationDto save(ReservationDto reservation, String name, Role role) {

        User user = findUser(name);

        if (user == null) {
            return null;
        }

        reservation.getAppointments().forEach(
                appointmentDto -> appointmentDto.setStatus(AppointmentStatus.SUGGESTED)
        );
        if (reservation.getId() == null) {
            reservation.setUserId(user.getId());
            reservation.setAdminStatus(Status.PENDING);
            reservation.setUserStatus(Status.PENDING);
            return ReservationMapper.mapToReservationDto(
                    reservationRepository.save(
                            ReservationMapper.mapFromReservationDto(reservation)));
        } else {
            Optional<Reservation> resOpt = this.reservationRepository.findById(reservation.getId());
            if (resOpt.isPresent() && role == Role.ADMIN) {
                reservation.setAdminStatus(Status.ACCEPTED);
                reservation.setUserStatus(Status.PENDING);
                return ReservationMapper.mapToReservationDto(reservationRepository.save(ReservationMapper.mapFromReservationDto(reservation)));
            }
        }
        return null;
    }

    public Slice<ReservationDto> getByFilter(String search, int page, int size, String name, Role role) {
        User user = findUser(name);

        Specification<Reservation> spec;

        if (user != null) {
             spec = SpecificationBuilder.<Reservation>build(search, user.getId(), role);
        } else {
            spec = SpecificationBuilder.<Reservation>build(search, null, null);

        }
        Pageable pageable = PageRequest.of(page, size);

        return reservationRepository.findAll(spec, pageable).map(ReservationMapper::mapToReservationDto);
    }

    public ReservationDto suggest(ReservationDto reservationDto, String userName, Role role) {
        Optional<Reservation> resOpt = this.reservationRepository.findById(reservationDto.getId());

        User user = this.userRepository.findByUsername(userName);

        if (resOpt.isPresent() && user != null) {
            Reservation reservation = resOpt.get();
            AppointmentDto handoverApp = reservationDto.getAppointments().stream().filter(
                    app -> app.getType() == AppointmentType.HANDOVER
            ).findFirst().orElse(null);
            boolean isOwner = reservation.getUserId().equals(user.getId());
            boolean isAdmin = role.equals(Role.ADMIN);
            if (handoverApp != null) {
                if (isOwner || isAdmin) {
                    if (isOwner) {
                        reservation.setAdminStatus(Status.PENDING);
                        reservation.setUserStatus(Status.ACCEPTED);
                    } else if (isAdmin) {
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
        return null;
    }

    public ReservationDto accept(String userName, Role role, Long resId) {
        return role.equals(Role.ADMIN) ? adminAccept(resId) : userAccept(userName, resId);
    }

    public ReservationDto reject(String userName, Role role, Long resId) {
        return role.equals(Role.ADMIN) ? adminReject(resId) : userReject(userName, resId);
    }

    private ReservationDto userAccept(String userName, Long id) {
        Optional<Reservation> resOpt = this.reservationRepository.findById(id);
        User user = this.userRepository.findByUsername(userName);
        if (resOpt.isPresent() && user != null) {
            Reservation reservation = resOpt.get();
            if (reservation.getAdminStatus() != Status.REJECTED &&
                    reservation.getUserStatus() != Status.REJECTED &&
                    reservation.getUserId().equals(user.getId())) {
                reservation.setUserStatus(Status.ACCEPTED);
                if (reservation.getAdminStatus() == Status.ACCEPTED) {
                    reservation.getAppointments().forEach(
                            appointment -> appointment.setStatus(AppointmentStatus.ACCEPTED)
                    );
                }
                return ReservationMapper.mapToReservationDto(reservationRepository.save(reservation));
            }
        }
        return null;
    }

    private ReservationDto adminAccept(Long id) {
        Optional<Reservation> resOpt = this.reservationRepository.findById(id);
        if (resOpt.isPresent()) {
            Reservation reservation = resOpt.get();
            if (reservation.getAdminStatus() != Status.REJECTED &&
                    reservation.getUserStatus() != Status.REJECTED) {
                reservation.setAdminStatus(Status.ACCEPTED);
                if (reservation.getUserStatus() == Status.ACCEPTED) {
                    reservation.getAppointments().forEach(
                            appointment -> appointment.setStatus(AppointmentStatus.ACCEPTED)
                    );
                }
                return ReservationMapper.mapToReservationDto(reservationRepository.save(reservation));
            }
        }
        return null;
    }

    private ReservationDto userReject(String userName, Long id) {
        Optional<Reservation> resOpt = this.reservationRepository.findById(id);
        User user = this.userRepository.findByUsername(userName);

        if (resOpt.isPresent() && user != null) {
            Reservation reservation = resOpt.get();
            if (reservation.getUserId().equals(user.getId()) &&
                    reservation.getAdminStatus() != Status.REJECTED &&
                    reservation.getUserStatus() != Status.REJECTED &&
                    !(reservation.getAdminStatus() == Status.ACCEPTED &&
                            reservation.getUserStatus() == Status.ACCEPTED)) {
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
        return null;
    }

    private ReservationDto adminReject(Long id) {
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
        return null;
    }

}
