package hu.bme.aut.reservationservice;

import hu.bme.aut.reservationservice.shared.repository.UserRepository;
import hu.bme.aut.reservationservice.user.model.User;
import hu.bme.aut.reservationservice.user.model.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class InitData {

    @Autowired
    private UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @EventListener
    public void appReady(ApplicationReadyEvent event) {

        repo.save(User.builder()
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

    }

}
