package hu.bme.aut.reservationservice;

import hu.bme.aut.reservationservice.reservation.model.Appointment;
import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentStatus;
import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentType;
import hu.bme.aut.reservationservice.reservation.repository.AppointmentRepository;
import hu.bme.aut.reservationservice.shared.repository.UserRepository;
import hu.bme.aut.reservationservice.user.model.User;
import hu.bme.aut.reservationservice.user.model.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class InitData {

    @Autowired
    private UserRepository repo;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @EventListener
    public void appReady(ApplicationReadyEvent event) {

        User admin = repo.save(User.builder()
                .password(bCryptPasswordEncoder.encode("admin"))
                .username("admin")
                .role(Role.ADMIN)
                .phone("12345678")
                .email("admin@admin.admin")
                .fullName("Admin Admin")
                .build()
        );

        repo.save(User.builder()
                .password(bCryptPasswordEncoder.encode("user"))
                .username("user")
                .role(Role.USER)
                .phone("12345678")
                .email("user@user.user")
                .fullName("User User")
                .build()
        );

        appointmentRepository.save(Appointment.builder()
                .date(new Date())
                .status(AppointmentStatus.ACCEPTED)
                .time("8:00")
                .type(AppointmentType.CLOSED)
                .reservation(null)
                .build());

    }

}
