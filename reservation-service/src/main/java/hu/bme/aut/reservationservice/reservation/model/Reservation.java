package hu.bme.aut.reservationservice.reservation.model;

import hu.bme.aut.reservationservice.reservation.model.enums.Status;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "reservations")
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Setter
@Getter
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String vehicleType;

    private String plateNumber;

    private String vin;

    @Enumerated(EnumType.STRING)
    private Status adminStatus;

    @Enumerated(EnumType.STRING)
    private Status userStatus;

    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "reservation_id")
    private Set<Appointment> appointments;

    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "reservation_id")
    private Set<Work> works;
}
