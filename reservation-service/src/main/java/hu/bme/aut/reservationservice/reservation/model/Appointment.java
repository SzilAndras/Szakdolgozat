package hu.bme.aut.reservationservice.reservation.model;

import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentStatus;
import hu.bme.aut.reservationservice.reservation.model.enums.AppointmentType;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "appointments")
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Setter
@Getter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date date;

    private String time;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AppointmentStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private AppointmentType type;

    @ManyToOne
    @JoinColumn(name = "reservation_id", insertable = false, updatable = false)
    private Reservation reservation;
}
