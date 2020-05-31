package hu.bme.aut.reservationservice.reservation.model;


import hu.bme.aut.reservationservice.reservation.model.enums.Status;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "works")
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Setter
@Getter
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String work;

    private Integer periodOfTime;

    private Integer price;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

}
