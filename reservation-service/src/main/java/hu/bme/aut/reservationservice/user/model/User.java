package hu.bme.aut.reservationservice.user.model;

import hu.bme.aut.reservationservice.user.model.enums.Role;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Setter //(value = AccessLevel.PACKAGE)
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    private String fullName;

    private String email;

    private String phone;

    @Enumerated(EnumType.STRING)
    private Role role;

}
